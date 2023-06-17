import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const checkUniqueClient = async (name, email) => {
    let flag = false
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "clients"));
        querySnapshot.forEach((doc) => {
            if(doc.data().name === name || doc.data().email === email) {
                flag = true
            }
        });
        return flag
      } catch (err) {
        console.log(err);
      }
    };

    return fetchData()
}

export const checkUniqueOrder = async (number) => {
  let flag = false
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "orders"));
        querySnapshot.forEach((doc) => {
            if(doc.data().number === number) {
                flag = true
            }
        });
        return flag
      } catch (err) {
        console.log(err);
      }
    };

    return fetchData()
}

export const checkClientActivity = async (clientId, orderId) => {
  let flag = false
  const fetchData = async () => {
    try {
      const q = query(collection(db, "orders"), where("clientId", "==", clientId))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
          if (doc.id !== orderId && doc.data().status === "Активный") {
              flag = true
          }
      });
      return flag
    } catch (err) {
        console.log(err);
    }
  }
  return await fetchData()
}