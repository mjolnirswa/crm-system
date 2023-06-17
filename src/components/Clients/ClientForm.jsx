import { RxCross1 } from 'react-icons/rx';
import Input from '../UI/Input';
import { useState } from 'react';
import Button from '../UI/Button';
import Textarea from '../UI/Textarea';
import { doc, serverTimestamp, setDoc } from "firebase/firestore"; 
import { db } from "../../firebase";
import { emailValidation } from '../../utils/FormValidation';
import { checkUniqueClient } from '../../utils/checkUnique';

const ClientForm = (props) => {
    const [clientName, setClientName] = useState('')
    const [clientEmail, setClientEmail] = useState('')
    const [clientTel, setClientTel] = useState('-')
    const [clientComment, setClientComment] = useState('')
    const [notUnique, setNotUnique] = useState(false)

    const handleNameChange = (value) => setClientName(value)
    const handleEmailChange = (value) => setClientEmail(value)
    const handleTelChange = (value) => setClientTel(value)
    const handleCommentChange = (value) => setClientComment(value)

    const handleClick = async () => {
        if (emailValidation(clientEmail)===false || clientName.length < 3) {
            return
        }

        if(await checkUniqueClient(clientName, clientEmail)) {
            setNotUnique(true)
            console.log(await checkUniqueClient(clientName, clientEmail))
            return
        }else {
            setNotUnique(false)
            console.log(await checkUniqueClient(clientName, clientEmail))
            try {
                await setDoc(doc(db, 'clients', new Date().getTime().toString()), {
                    name: clientName,
                    email: clientEmail,
                    tel: clientTel,
                    status: "Неактивный",
                    comment: clientComment,
                    createdAt: serverTimestamp()
                })
                props.onClick()
            }catch(err) {
                console.log(err)
            }
        }
    }

    return (
        <>
             <div className='flex items-center justify-between'>
                    <h1 className='text-3xl bold-medium'>Добавление клиента</h1>

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
                    label="Имя клиента"
                    placeholder='ООО Пример'
                    type="text"
                    size="small"
                    onChange={handleNameChange}
                    ></Input>

                    <Input
                    label="Email клиента"
                    placeholder='example@gmail.com'
                    type="email"
                    size="small"
                    onChange={handleEmailChange}
                    ></Input>

                    <Input
                    label="Номер телефона"
                    placeholder='+7(***)-***-**-**'
                    type='tel'
                    size='small'
                    onChange={handleTelChange}
                    ></Input>

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
                    >
                        Создать
                    </Button>

                    <div className={notUnique === false ? 'hidden' : 'block'}>
                        <p className="text-red-500 text-sm">Имя или почта должны быть уникальны</p>
                    </div>
                </div>
        </>
    )
}

export default ClientForm;