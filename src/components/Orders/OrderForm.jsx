import { RxCross1 } from "react-icons/rx";
import Input from "../UI/Input";
import Textarea from "../UI/Textarea";
import Button from "../UI/Button";
import { useEffect, useState } from "react";
import { getClientByName } from "../../utils/getClientInfo";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore"; 
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import { checkUniqueOrder } from "../../utils/checkUnique";
import SelectActive from "../UI/Select";


const OrderForm = (props) => {
    const [orderNumber, setOrderNumber] = useState('')
    const [clientName, setClientName] = useState('')
    const [orderComment, setOrderComment] = useState('')
    const [undefinedClient, setUndefinedClient] = useState(false)
    const [document, setDocument] = useState(null)
    const [data, setData] = useState({});
    const [per, setPerc] = useState(null);
    const [uniqueNumber, setUniqueNumber] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null)

    const handleNumberChange = (value) => setOrderNumber(value)
    const handleClient = (value) => setClientName(value)
    const handleCommentChange = (value) => setOrderComment(value)
    const handleDocChange = (value) => {setDocument(value)}

    useEffect(() => {
        const uploadDoc = () => {
            const name = new Date().getTime() + document.name
            console.log(name)
            const storageRef = ref(storage, document.name);
            const uploadTask = uploadBytesResumable(storageRef, document);

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
                    setData((prev) => ({ ...prev, orderDoc: downloadURL }) )
                });
            }
            );
        }
        document && uploadDoc()
    }, [document])

    const handleClick = async () => {
        const clientId = await getClientByName(clientName)

        if(clientId === '') {
            console.log('ошибка')
            return
        } 

        if(orderNumber.length === 0 || clientName === 0) {
            return
        }

        if (await checkUniqueOrder(orderNumber)) {
            setUniqueNumber(true)
            return
        }
        
        if (await getClientByName(clientName) === null || await getClientByName(clientName) === undefined) {
            setUndefinedClient(true)
            return
        }else {
            setUndefinedClient(false)
            setUniqueNumber(false)
            try {
                await setDoc(doc(db, 'orders', new Date().getTime().toString()), {
                    number: orderNumber,
                    comment: orderComment,
                    ...data,
                    status: selectedOption.value,
                    createdAt: serverTimestamp(),
                    clientId: clientId 
                })
                if(selectedOption.value === "Активный") {
                    await updateDoc(doc(db, 'clients', clientId), {
                        status: 'Активный'
                    })
                }
                props.onClick()
            }catch(err) {
                console.log(err)
            }
        }
    }


    return (
        <>
             <div className='flex items-center justify-between'>
                    <h1 className='text-3xl bold-medium'>Добавление заказа</h1>

                    <button 
                    className='my-auto mr-5'
                    onClick={props.onClick}
                    >
                        <RxCross1 style={{color: 'inherit', fontSize: "2em"}}
                        />
                    </button>
                </div>

                <div className='flex flex-col mt-10 gap-5'>
                    <Input
                    label="Номер заказа"
                    placeholder='№ 000'
                    type="text"
                    size="small"
                    onChange={handleNumberChange}
                    ></Input>

                    <div className={uniqueNumber === false ? 'hidden' : 'block'}>
                        <p className="text-red-500 text-sm">Номер заказа должен быть уникальным</p>
                    </div>

                    <Input
                    label="Клиент"
                    placeholder='имя'
                    type="text"
                    size="small"
                    onChange={handleClient}
                    ></Input>

                    <Input
                    label="Договор"
                    type='file'
                    size='small'
                    onChange={handleDocChange}
                    ></Input>

                    <SelectActive
                    value={selectedOption}
                    onChange={setSelectedOption}
                    />

                    <Textarea
                    label="Краткая справка"
                    placeholder="комментарии..."
                    type="text"
                    onChange={handleCommentChange}
                    ></Textarea>

                    <Button
                    textSize="text-md"
                    onClick={handleClick}
                    size="small"
                    disabled={per !== null && per < 100}
                    >
                        Создать
                    </Button>

                    <div className={undefinedClient === false ? 'hidden' : 'block'}>
                        <p className="text-red-500 text-sm">Клиент с таким именем не существует</p>
                    </div>
                </div>
        </>
    )
}

export default OrderForm;