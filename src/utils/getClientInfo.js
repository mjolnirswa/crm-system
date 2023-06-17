import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const getClientInfo = async (id) => {
    try {
        const docSnap = await getDoc(doc(db, "clients", id));
        return docSnap.data()
    } catch (err) {
        console.log(err);
    }
}

export const getOrderInfo = async (id) => {
    try {
        const docSnap = await getDoc(doc(db, "orders", id));
        return docSnap.data()
    } catch (err) {
        console.log(err);
    }
}

export const getClientByName = async (name) => {
    try {
        let id = ''
        const clientsCollection = await getDocs(collection(db, 'clients'))
        clientsCollection.forEach((doc) => {
            if (doc.data().name === name) {
                id = doc.id
            }
        })

        return id
    } catch(err) {
        console.log(err)
    }
}

export const getClientCountPage = async () => {
    try {
        let count = 0
        const clientsCollection = await getDocs(collection(db, 'clients'))
        clientsCollection.forEach(() => {
            count+=1
        })

        return Math.ceil(count/6)
    } catch(err) {
        console.log(err)
    }
}

export const getClientCount = async () => {
    try {
        const today = new Date();
        const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
        const prevMonthQuery = query(collection(db, 'clients'), where("createdAt", ">", lastMonth))

        const clientsCollection = await getDocs(collection(db, 'clients'))
        
        const prevClientsCollection = await getDocs(prevMonthQuery)

        const percent = prevClientsCollection.docs.length === 0 ?
        0 : 
        Math.ceil(((clientsCollection.docs.length - prevClientsCollection.docs.length) / prevClientsCollection.docs.length) * 100 )   

        return {
            count: clientsCollection.docs.length,
            percent
        }
    } catch(err) {
        console.log(err)
    }
}

export const getNewClientsCount = async () => {
    try {
        const today = new Date();
        const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
        const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));

        const lastMonthQuery = query(
            collection(db, 'clients'), 
            where("createdAt", "<=", today), 
            where("createdAt", ">", lastMonth)
        )

        const prevMonthQuery = query(
            collection(db, 'clients'), 
            where("createdAt", "<=", lastMonth), 
            where("createdAt", ">", prevMonth)
        )

        const lastMonthData = await getDocs(lastMonthQuery)
        const prevMonthData = await getDocs(prevMonthQuery)
        
        const count = lastMonthData.docs.length - prevMonthData.docs.length
        const percent = prevMonthData.docs.length === 0 ? 
        0 :
        Math.ceil(((lastMonthData.docs.length - prevMonthData.docs.length) / prevMonthData.docs.length) * 100)
        
        return {
            count,
            percent
        }
    } catch(err) {
        console.log(err)
    }
}

export const getActiveClientCount = async () => {
    try {
        const today = new Date();
        const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
        const prevMonthQuery = query(
            collection(db, "clients"), 
            where("createdAt", ">", lastMonth),
            where("status", "==", "Активный")
        )


        const q = query(collection(db, "clients"), where("status", "==", "Активный"))
        const clientsCollection = await getDocs(q)
        const prevClientsCollection = await getDocs(prevMonthQuery)

        const percent = prevClientsCollection.docs.length === 0 ? 
        0 :
        Math.ceil(((clientsCollection.docs.length - prevClientsCollection.docs.length) / prevClientsCollection.docs.length) * 100)

        return {
            count: clientsCollection.docs.length,
            percent
        }
    } catch(err) {
        console.log(err)
    }
}


export const getOrderCount = async () => {
    try {
        const today = new Date();
        const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
        const prevMonthQuery = query(
            collection(db, 'orders'), 
            where("createdAt", ">", lastMonth)
        )

        const ordersCollection = await getDocs(collection(db, 'orders'))
        
        const prevOrdersCollection = await getDocs(prevMonthQuery)

        const percent = prevOrdersCollection.docs.length === 0 ?
        0 : 
        Math.ceil(((ordersCollection.docs.length - prevOrdersCollection.docs.length) / prevOrdersCollection.docs.length) * 100 )   

        return {
            count: ordersCollection.docs.length,
            percent
        }
    } catch(err) {
        console.log(err)
    }
}

export const getNewOrdersCount = async () => {
    try {
        const today = new Date();
        const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
        const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));

        const lastMonthQuery = query(
            collection(db, 'orders'), 
            where("createdAt", "<=", today), 
            where("createdAt", ">", lastMonth)
        )

        const prevMonthQuery = query(
            collection(db, 'orders'), 
            where("createdAt", "<=", lastMonth), 
            where("createdAt", ">", prevMonth)
        )

        const lastMonthData = await getDocs(lastMonthQuery)
        const prevMonthData = await getDocs(prevMonthQuery)
        
        const count = lastMonthData.docs.length - prevMonthData.docs.length
        const percent = prevMonthData.docs.length === 0 ? 
        0 :
        Math.ceil(((lastMonthData.docs.length - prevMonthData.docs.length) / prevMonthData.docs.length) * 100)
        
        return {
            count,
            percent
        }
    } catch(err) {
        console.log(err)
    }
}

export const getActiveOrdersCount = async () => {
    try {
        const today = new Date();
        const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
        const prevMonthQuery = query(
            collection(db, "orders"), 
            where("createdAt", ">", lastMonth),
            where("status", "==", "Активный")
        )


        const q = query(collection(db, "orders"), where("status", "==", "Активный"))
        const clientsCollection = await getDocs(q)
        const prevClientsCollection = await getDocs(prevMonthQuery)

        const percent = prevClientsCollection.docs.length === 0 ? 
        0 :
        Math.ceil(((clientsCollection.docs.length - prevClientsCollection.docs.length) / prevClientsCollection.docs.length) * 100)

        return {
            count: clientsCollection.docs.length,
            percent
        }
    } catch(err) {
        console.log(err)
    }
}

export async function fetchDataForMonths(collectionName, startMonth, endMonth) {
    const data = [];
  
    const start = new Date(startMonth);  // Начальный месяц
    const end = new Date(endMonth);  // Конечный месяц
  
    // Получаем данные за каждый месяц в указанном диапазоне
    while (start <= end) {
      const month = start.toLocaleString('default', { month: 'long' });  // Получаем название месяца
  
      const startOfMonth = new Date(start.getFullYear(), start.getMonth(), 1);  // Начало текущего месяца
      const endOfMonth = new Date(start.getFullYear(), start.getMonth() + 1, 1);  // Начало следующего месяца
  
      const querySnapshot = await getDocs(query(
        collection(db, collectionName),
        where("createdAt", ">=", startOfMonth),
        where("createdAt", "<", endOfMonth)
      ));
  
      let allCount = 0;
      let activeCount = 0;
  
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        console.log(docData)
        allCount += 1;
        if (docData.status === "Активный") {
            activeCount += 1;
        }
      });
  
      // Создаем объект с данными за текущий месяц и добавляем его в массив данных
      data.push({
        name: month,
        "Все": allCount,
        "Активные": activeCount
      });
  
      start.setMonth(start.getMonth() + 1);  // Переходим к следующему месяцу
    }
  
    return data;
  }
  