import {
    collection,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import ClientBar from "./ClientBar";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const getFilteredItems = (query, items) => {
  if (!query) {
    return items;
  }
  return items.filter((song) => song.clientName.includes(query));
};

const ClientsList = (props) => {
    const [list, setList] = useState([])

    useEffect(() => {
      let q
        if (props.filter === null) {
          q = query(collection(db, "clients"))
        } else if(props.filter === "Активный") {
          q = query(collection(db, "clients"),  where("status", "==", "Активный"))
        } else if(props.filter === "Неактивный") {
          q = query(collection(db, "clients"),  where("status", "==", "Неактивный"))
        }

        const unsub = onSnapshot(
          q,
          (snapShot) => {
            let newList = [];
            snapShot.docs.forEach((doc) => {
              newList.push({
                id: doc.id,
                clientName: doc.data().name,
                clientEmail: doc.data().email,
                clientTel: doc.data().tel,
                clientStatus: doc.data().status
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
              <ClientBar
                clientName={item.clientName}
                clientStatus={item.clientStatus}
                clientEmail={item.clientEmail}
                clientTel={item.clientTel}
                id={item.id}
              />
            </div>
          ))}
        </div>
      );
}

export default ClientsList;