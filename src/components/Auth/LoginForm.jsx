import { useEffect, useState } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { emailValidation, passwordValidation } from "../../utils/FormValidation";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc} from "firebase/firestore";
import { db } from "../../firebase";

const LoginForm = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [userFirebase, setUserFirebase] = useState({})
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [isEmailValid, setEmailValid] = useState(true);
    const [isPasswordValid, setPasswordValid] = useState(true);

    const handleEmailChange = (value) => {
        setEmailValue(value);
    }

    const handlePasswordChange = (value) => {
        setPasswordValue(value);
    }
    const handleFormValidate = () => {
        setEmailValid(emailValidation(emailValue))
        setPasswordValid(passwordValidation(passwordValue))
    }

    const handleLogin = async () => {
        const auth = getAuth();
        handleFormValidate()

        if (isEmailValid === false || isPasswordValid === false) {
            return
        }

        signInWithEmailAndPassword (auth, emailValue, passwordValue)
        .then(({ user }) => {
            setUserFirebase({...user})
        })
        .catch((error) => {
            console.log(error)
        });
    }

    const signInUser = async (user) => {
        try {
            const docSnap = await getDoc(doc(db, 'users', user.uid));

            dispatch(setUser({
                userImg: docSnap.data().userImg,
                name: docSnap.data().name,
                email: user.email,
                id: user.uid,
                password: passwordValue,
                token: user.accessToken
            }))

            navigate("/clients")
        }catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (userFirebase.email) {
            signInUser(userFirebase)
        }

    }, [userFirebase])

    return (
        <div className="w-full">
            <div className="pt-5 space-y-6">
                <div>
                    <h1 className="mx-auto text-center text-xl items-center justify-center font-medium">
                        Авторизация
                    </h1>
                </div>

                <Input
                label='Почта'
                placeholder='example@gmail.com'
                type='text'
                onChange={handleEmailChange}
                >
                </Input>

                <div className={isEmailValid === true ? 'hidden' : 'block'}>
                    <p className="text-red-500 text-sm">Почта введена некорректно</p>
                </div>

                <Input
                label='Пароль'
                placeholder='*********'
                type='password'
                onChange={handlePasswordChange}
                >
                </Input>

                <div className={isPasswordValid === true ? 'hidden' : 'block'}>
                    <p className="text-red-500 text-sm">Введен неправльный пароль</p>
                </div>

                <Button 
                textSize='text-md'
                onClick={handleLogin}>
                    Вход
                </Button>

                <div className="text-center">
                    или
                </div>

                <Button 
                textSize='text-md'
                onClick={props.toggleForm}  
                >
                        Регистрация
                </Button>

                <div>
                    <h2>Для теста используйте:</h2>
                    <p>Почта: test2@gmail.com</p>
                    <p>Пароль: 123456</p>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;