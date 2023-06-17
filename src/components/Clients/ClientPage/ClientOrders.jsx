import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import OrderBar from "../../Orders/OrderBar";
import { db } from "../../../firebase";
import { ClipLoader } from "react-spinners";

const ClientOrders = (props) => {
    const [list, setList] = useState([])
    const [noData, setNoData] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
        let list = [];
        try {
            const querySnapshot = await getDocs(collection(db, "orders"));
            querySnapshot.forEach((doc) => {
                if (props.clientId === doc.data().clientId) {
                    list.push({ id: doc.id, ...doc.data() });
                }
            });
            
            if (list.length === 0) {
                setNoData(true)
            }

            setList(list);
            setLoading(false)
        } catch (err) {
            console.log(err);
        }
        };
        fetchData();
    }, []);

    if(loading===true) {
        return (
            <div className="mx-auto p-6">
                <ClipLoader
                color="#D962C7"
                loading
                />
            </div>
        )
    } else if(noData === true) {
        return (
            <div hidden={noData===false} className="mx-auto">
                <h2 className="text-xl p-2 mx-auto my-auto">
                    Нет заказов
                </h2>
            </div>
        )
    } else {
        return (
            <div>
            {list.map((item) => (
                <div key={item.id}>
                <OrderBar
                    orderNumber={item.number}
                    orderStatus={item.status}
                    orderDesc={item.comment}
                    orderDoc={item.orderDoc}
                    id={item.id}
                />
                </div>
            ))}
            </div>
        )
    }
}

export default ClientOrders;