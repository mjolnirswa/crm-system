import { AiOutlinePlus } from "react-icons/ai";
import LineGraph from "./LineGraph";
import BarGraph from "./BarGraph";

const Document = () => {
    return (
        <div className="m-4">
            <div className="flex w-full">
                <h1 className="text-left text-3xl text-bold">Отчеты</h1>

                <button className="text-center text-white bg-purple-400 
                hover:bg-purple-500 rounded-full ml-auto py-2 px-3
                flex justify-center">
                    <div className='my-auto'>
                        <AiOutlinePlus style={{color: 'white'}}/>
                    </div>
                    <span className="text-sm ml-2">
                        Добавить отчет
                    </span>
                </button>
            </div>

            <div className="mt-6 flex flex-col">
                
                <div>
                    <h2 className="text-lg">Статистика продаж за 6 месяцев</h2>

                    <div className="mt-4">
                        <LineGraph />
                    </div>
                </div>

                {/* <div>
                    <h2 className="text-lg">Статистика клиентов за период</h2>

                    <div className="mt-4">
                        <BarGraph />
                    </div>
                </div> */}

            </div>
        </div>
    )
}

export default Document;