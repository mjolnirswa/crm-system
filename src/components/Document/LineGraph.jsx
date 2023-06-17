import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";
import { fetchDataForMonths } from "../../utils/getClientInfo";
  
// const data = [
//     {
//       name: "Декабрь",
//       "Все": 4000,
//       "Активные": 2400
//     },
//     {
//       name: "Январь",
//       "Все": 3000,
//       "Активные": 1398
//     },
//     {
//       name: "Февраль",
//       "Все": 2000,
//       "Активные": 9800
//     },
//     {
//       name: "Март",
//       "Все": 2780,
//       "Активные": 3908
//     },
//     {
//       name: "Апрель",
//       "Все": 1890,
//       "Активные": 4800
//     },
//     {
//       name: "Май",
//       "Все": 2390,
//       "Активные": 3800
//     },
//     {
//       name: "Июнь",
//       "Все": 3490,
//       "Активные": 4300
//     }
//   ];
  
const LineGraph = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const collectionName = 'orders';
      const startMonth = '2022-12-01';  // Начальный месяц (формат: ГГГГ-ММ-ДД)
      const endMonth = '2023-06-01'; 

      const dataStat = await fetchDataForMonths(collectionName, startMonth, endMonth)

      setData(dataStat)
    }

    return () => fetchData()
  }, []) 

    return (
      <LineChart
        width={900}
        height={500}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Активные"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="Все" stroke="#82ca9d" />
      </LineChart>
    );
}
  
export default LineGraph;