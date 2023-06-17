import {
    collection,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import OrderBar from "./OrderBar";
import { ClipLoader } from "react-spinners";

const getFilteredItems = (query, items) => {
  if (!query) {
    return items;
  }
  return items.filter((song) => song.orderNumber.includes(query));
};

const OrderList = (props) => {
    const [list, setList] = useState([])

    useEffect(() => {
      let q
        if (props.filter === null) {
          q = query(collection(db, "orders"))
        } else if(props.filter === "Активный") {
          q = query(collection(db, "orders"),  where("status", "==", "Активный"))
        } else if(props.filter === "Неактивный") {
          q = query(collection(db, "orders"),  where("status", "==", "Неактивный"))
        }

        const unsub = onSnapshot(
          q,
          (snapShot) => {
            let newList = [];
            snapShot.docs.forEach((doc) => {
              newList.push({
                id: doc.id,
                orderNumber: doc.data().number,
                orderStatus: doc.data().status,
                clientName: doc.data().name,
                orderDoc: doc.data().orderDoc,
                orderDesc: doc.data().comment
              });
            });
            setList(newList);
          },
          (error) => {
            console.log(error);
          }
        );
      
        return () => {
          unsub();
        };
      }, [props.filter]);

      const filteredList = getFilteredItems(props.searchQuery, list); 

    return list.length === 0 ? (
      <div className="mx-auto p-6">
       <ClipLoader
         color="#D962C7"
         loading
       />
      </div>
     ) : (
        <div>
          {filteredList.map((item) => (
            <div key={item.id}>
              <OrderBar
                orderNumber={item.orderNumber}
                orderStatus={item.orderStatus}
                orderDesc={item.orderDesc}
                orderDoc={item.orderDoc}
                id={item.id}
              />
            </div>
          ))}
        </div>
    )
}

export default OrderList;