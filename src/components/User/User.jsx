import { useEffect, useState } from "react"
import Input from "../UI/Input"
import Button from "../UI/Button"
import { useDispatch, useSelector } from "react-redux"
import { doc, serverTimestamp, setDoc } from "firebase/firestore"; 
import { db, storage } from "../../firebase";
import { emailValidation } from "../../utils/FormValidation";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth, signInWithEmailAndPassword, updateEmail, updatePassword } from "firebase/auth";
import { setUser } from "../../store/slices/userSlice";


const User = () => {
        const user = useSelector((state) => state.user)
        const dispatch = useDispatch()

        const [userName, setUserName] = useState('')
        const [userEmail, setUserEmail] = useState('')
        const [passwordValue, setPasswordValue] = useState('');
        const [userImg, setUserImg] = useState(null)
        const [data, setData] = useState({});
        const [per, setPerc] = useState(null);

        useEffect(() => {
            const uploadImg = () => {
                const name = new Date().getTime() + userImg.name
                console.log(name)
                const storageRef = ref(storage, userImg.name);
                const uploadTask = uploadBytesResumable(storageRef, userImg);

                uploadTask.on('state_changed', 
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setPerc(progress);
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                            break;
                    }
                }, 
                (error) => {
                    console.log(error);
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setData((prev) => ({ ...prev, userImg: downloadURL }) )
                    });
                }
                );
            }
            userImg && uploadImg()
        }, [userImg])
    
        const handleNameChange = (value) => setUserName(value)
        const handleEmailChange = (value) => setUserEmail(value)
        const handleImgChange = (value) => setUserImg(value)
        const handlePasswordChange = (value) => setPasswordValue(value)
    
        const handleClick = async () => {
            if (userName.length < 4 || emailValidation(userEmail) === false || passwordValue < 6) {
                return
            }
            try {
                const auth = getAuth();

                await setDoc(doc(db, "users", user.id), {
                    name: userName,
                    email: userEmail,
                    password: passwordValue,
                    ...data,
                    updatedAt: serverTimestamp()
                })
                signInWithEmailAndPassword(auth, user.email, user.password)
                .then((cred) => {
                    updateEmail(cred.user, userEmail)
                    updatePassword(cred.user, passwordValue)
                })
                .then(() => {
                    console.log("Successfully credintials updated")
                    dispatch(setUser({
                        email: userEmail,
                        password: passwordValue,
                        ...data,
                        name: userName,

                    }))
                })
                .catch((err) => console.log(err))
            }catch(err) {
                console.log(err)
            }
        }

        return (
            <>
                 <div className='flex'>
                    <h1 className='text-3xl bold-medium'>Страница пользователя</h1>
                </div>
    
                    <div className='flex flex-col mt-10 gap-5'>
                        <img src={
                            user.userImg ?
                            user.userImg
                            : "https://shkolasam.gosuslugi.ru/netcat_files/9/164/avatar_scaled_15.jpeg"
                        } 
                        alt="user" 
                        className="rounded-full w-20 h-20"/>

                        <Input
                        label="Имя пользователя"
                        type="text"
                        size="small"
                        onChange={handleNameChange}
                        value={user.name ? user.name : 'name'}
                        ></Input>
    
                        <Input
                        label="Email пользователя"
                        value={user.email ? user.email : 'email'}
                        type="email"
                        size="small"
                        onChange={handleEmailChange}
                        ></Input>

                        <Input
                        label='Пароль'
                        placeholder='*********'
                        type='password'
                        size="small"
                        onChange={handlePasswordChange}
                        >
                        </Input>
    
                        <Input
                        label="Аватар пользователя"
                        type='file'
                        size='small'
                        onChange={handleImgChange}
                        ></Input>
    
                        <Button
                        textSize="text-md"
                        onClick={handleClick}
                        size="small"
                        disabled={per !== null && per < 100}
                        >
                            Редактировать
                        </Button>
                    </div>
            </>
        )
}

export default User;