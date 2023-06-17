import { useEffect, useLayoutEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Input from "../../UI/Input";
import SelectActive from "../../UI/Select";
import Textarea from "../../UI/Textarea";
import Button from "../../UI/Button";
import { getClientInfo, getOrderInfo } from "../../../utils/getClientInfo";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../../firebase";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { checkClientActivity } from "../../../utils/checkUnique";

const OrdersPage = () => {
    const {orderId} = useParams();
    const [order, setOrder] = useState({})
    const [per, setPerc] = useState(null);
    const [document, setDocument] = useState(null)
    const [clientName, setClientName] = useState('')
    const [data, setData] = useState({});

    const navigate = useNavigate();
    
    const handleCommentChange = (value) => setOrder((prev) => {
        console.log(value)
        return {...prev, comment: value};
    });

    const setSelectedOption = (value) => setOrder((prev) => {
        return {...prev, status: value.value};
    })

    const handleDocChange = (value) => setDocument(value)

    useLayoutEffect(() => {
        const getClient = async () => {
            const orderInfo = await getOrderInfo(orderId)
            const client = await getClientInfo(orderInfo.clientId)

            setClientName(client.name)
            setOrder(orderInfo)
        }

        if (orderId) {
            getClient()
        }
    }, [])

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

    async function handleClick() {
        try {
            const orderInfo = await getOrderInfo(orderId)
            console.log(await checkClientActivity(orderInfo.clientId , orderId))
            await updateDoc(doc(db, 'orders', orderId), {
                orderDoc: data.orderDoc ? data.orderDoc : order.orderDoc,
                comment: order.comment,
                status: order.status,
                updatedAt: serverTimestamp()
            })
            if(order.status === "Активный") {
                await updateDoc(doc(db, 'clients', orderInfo.clientId), {
                    status: 'Активный'
                })
            } else if(order.status === "Неактивный" &&  await checkClientActivity(orderInfo.clientId , orderId) === false) {
                await updateDoc(doc(db, 'clients', orderInfo.clientId), {
                    status: 'Неактивный'
                })
            }
            navigate("/orders")
        }catch(err){
            console.log(err)
        }
    }

    return order.number ? (
        <>
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl bold-medium'>Страница заказа</h1>
            </div>


            <div className='flex flex-col mt-10 gap-5'>
                    <div>
                        <h2 className="text-lg">Номер заказа: {order.number}</h2>
                    </div>

                    <div>
                        <h2 className="text-lg">Клиент: {clientName}</h2>
                    </div>

                    <Input
                    label="Договор"
                    type='file'
                    size='small'
                    onChange={handleDocChange}
                    ></Input>

                    <SelectActive
                    value={order.status}
                    onChange={setSelectedOption}
                    />

                    <Textarea
                    label="Краткая справка"
                    value={order.comment}
                    type="text"
                    onChange={handleCommentChange}
                    ></Textarea>

                    <Button
                    textSize="text-md"
                    onClick={handleClick}
                    size="small"
                    disabled={per !== null && per < 100}
                    >
                        Редактировать
                    </Button>

                    <NavLink to={`/clients/${order.clientId}`}>Перейти на страницу клиента</NavLink>

                </div>
        </>
    ) : (
        <p>Loading...</p>
    )
}

export default OrdersPage;
