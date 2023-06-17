import { useLayoutEffect, useState } from "react";
import { getClientInfo } from "../../../utils/getClientInfo";
import { useParams } from "react-router-dom";
import Input from "../../UI/Input";
import Textarea from "../../UI/Textarea";
import Button from "../../UI/Button";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { emailValidation } from "../../../utils/FormValidation";
import { db } from "../../../firebase";
import ClientOrders from './ClientOrders';

const ClientPage = () => {
    const {clientId} = useParams();
    const [client, setClient] = useState({})

    // const [notUnique, setNotUnique] = useState(false)

    const handleNameChange = (value) => setClient((prev) => {
        return {...prev, name: value};
    });
    const handleEmailChange = (value) => setClient((prev) => {
        return {...prev, email: value}
    })
    const handleTelChange = (value) => setClient((prev) => {
        return {...prev, tel: value}
    })
    const handleCommentChange = (value) => setClient((prev) => {
        return {...prev, comment: value}
    })

    useLayoutEffect(() => {
        const getClient = async () => {
            const clientInfo = await getClientInfo(clientId)

            setClient(clientInfo)
        }

        if (clientId) {
            getClient()
        }
    }, [])

    const handleClick = async () => {
        if (emailValidation(client.email)===false || client.name.length < 3) {
            return
        }

        // if(await checkUniqueClient(client.name, client.email)) {
        //     setNotUnique(true)
        //     console.log(await checkUniqueClient(client.name, client.email))
        //     return
        // }else {
        //     setNotUnique(false)
        //     console.log(await checkUniqueClient(client.name, client.email))
        //     try {
        //         await setDoc(doc(db, 'clients', clientId), {
        //             name: client.name,
        //             email: client.email,
        //             tel: client.tel,
        //             comment: client.comment,
        //             updatedAt: serverTimestamp()
        //         })
        //     }catch(err) {
        //         console.log(err)
        //     }
        // }

        try {
            await updateDoc(doc(db, 'clients', clientId), {
                name: client.name,
                email: client.email,
                tel: client.tel,
                comment: client.comment,
                updatedAt: serverTimestamp()
                })
        }catch(err) {
            console.log(err)                
        }
    }
    return client.name ? (
        <>
            <div className='flex items-center justify-between'>
                    <h1 className='text-3xl bold-medium'>Страница клиента</h1>
            </div>

            <div className='flex flex-col mt-10 gap-5'>
                    <Input
                    label="Имя клиента"
                    value={client.name}
                    type="text"
                    size="small"
                    onChange={handleNameChange}
                    ></Input>

                    <Input
                    label="Email клиента"
                    value={client.email}
                    type="email"
                    size="small"
                    onChange={handleEmailChange}
                    ></Input>

                    <Input
                    label="Номер телефона"
                    value={client.tel}
                    type='tel'
                    size='small'
                    onChange={handleTelChange}
                    ></Input>

                    <Textarea
                    label="Краткая справка"
                    value={client.comment}
                    type="text"
                    onChange={handleCommentChange}
                    ></Textarea>

                    <Button
                    textSize="text-md"
                    onClick={handleClick}
                    size="small"
                    >
                        Редактировать
                    </Button>
                </div>

                {/* <div className={notUnique === false ? 'hidden' : 'block'}>
                    <p className="text-red-500 text-sm">Имя или почта должны быть уникальны</p>
                </div> */}

                <div className='mt-10 w-full flex flex-col mr-5'>
                    
                    <div className='bg-gray-100 p-4 items-center rounded-t-xl pr-20 flex'>
                        <div className='grid grid-cols-12 w-full'>
                            <p className='text-sm text-bold col-span-3 mx-auto font-medium'>Заказ</p>
                            <p className='text-sm text-bold col-span-3 mx-auto font-medium'>Статус</p>
                            <p className='text-sm text-bold col-span-3 mx-auto font-medium'>Краткая справка</p>
                            <p className='text-sm text-bold col-span-3 mx-auto font-medium'>Договор</p>
                        </div>
                    </div>

                    <ClientOrders clientId={clientId}/>

                    <div className='flex p-3 border-2 border-inherit rounded-b-xl items-center justify-between bg-gray-100'>
        
                    </div>
            </div>
        </>
    ) : (
        <h1>Loading...</h1>
    )
}

export default ClientPage;