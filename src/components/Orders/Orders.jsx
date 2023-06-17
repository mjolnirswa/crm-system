import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import StatBar from '../UI/StatBar';
import { BsFilter } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import OrderForm from './OrderForm';
import OrderList from './OrderList';
import FilterModal from '../UI/FilterModal';
import { getActiveOrdersCount, getNewOrdersCount, getOrderCount } from '../../utils/getClientInfo';

const Orders = () => {
    const [isFormActive, setFormActive] = useState(false);
    const [popupActive, setPopupActive] = useState(false);
    const [filter, setFilter] = useState(null);
    const [query, setQuery] = useState("");

    const [allOrdersStat, setAllOrdersStat] = useState(null)
    const [newOrdersStat, setNewOrdersStat] = useState(null)
    const [activeOrdersStat, setActiveOrdersStat] = useState(null)
    const [loading, setLoading] = useState(true)

    const handleButtonForm = () => setFormActive(!isFormActive);
    const handlePopup = () => setPopupActive(!popupActive);
    const handleFilterDelete = () => setFilter(null);

    useEffect(() => {
        const fetchData = async () => {
            const allOrderParam = await getOrderCount()
            const newOrderParam = await getNewOrdersCount()
            const activeOrderParam = await getActiveOrdersCount()

            setAllOrdersStat(allOrderParam)
            setNewOrdersStat(newOrderParam)
            setActiveOrdersStat(activeOrderParam)
            setLoading(false)
        }

        return () => fetchData()
    }, [])

    return (
        <>
            <div className="m-4 h-screen" hidden={isFormActive === true}>
            <div className="flex w-full">
                <h1 className="text-left text-3xl text-bold">Заказы</h1>

                <button className="text-center text-white bg-purple-400 
                hover:bg-purple-500 rounded-full ml-auto py-2 px-3
                flex justify-center"
                onClick={handleButtonForm}
                >
                    <div className='my-auto'>
                        <AiOutlinePlus style={{color: 'white'}}/>
                    </div>
                    <span className="text-sm ml-2">
                        Добавить заказ
                    </span>
                </button>
            </div>


            <div className='flex items-center mt-10 gap-6 flex-nowrap overflow-x-auto'>
                <div>
                    <StatBar 
                    text='Все заказы' 
                    count={allOrdersStat === null ? '' : allOrdersStat.count} 
                    percent={allOrdersStat === null ? '' : allOrdersStat.percent}
                    loading={loading === true ? true : false}/>
                </div>

                <div>
                    <StatBar 
                    text='Новых заказов' 
                    count={newOrdersStat === null ? '' : newOrdersStat.count}  
                    percent={newOrdersStat === null ? '' : newOrdersStat.percent}  
                    loading={loading === true ? true : false}/>
                </div>

                <div>
                    <StatBar 
                    text='Активных заказов' 
                    count={activeOrdersStat === null ? '' : activeOrdersStat.count}
                    percent={activeOrdersStat === null ? '' : activeOrdersStat.percent}
                    loading={loading === true ? true : false}/>
                </div>
            </div>


            <div className='flex w-full mt-6'>
                <button className='rounded-xl py-2 px-3 border-2 border-inherit bg-white'
                onClick={handlePopup}>
                    <div className='flex items-center justify-center'>
                        <div className='my-auto'>
                            <BsFilter style={{color: 'black'}}/>
                        </div>
                        <span className='text-center text-sm ml-2'>
                            Фильтр
                        </span>
                    </div>
                </button>

                <button 
                className='rounded-xl py-2 px-3 border-2 border-inherit bg-white'
                onClick={handleFilterDelete}
                hidden={filter===null}
                >
                    <div className='flex items-center justify-center'>
                        <span className='text-center text-sm'>
                            Сбросить
                        </span>
                    </div>
                </button>

                <div className='relative ml-auto mr-5'>

                    <div className='absolute flex items-center h-full pl-4 text-gray-600 cursor-pointer justify-center'>
                        <div className='w-6 h-6 my-auto'>
                            <AiOutlineSearch style={{color: 'inherit', fontSize: '1.5em'}}/>
                        </div>
                    </div>

                    <input 
                    className='flex items-center w-full pl-12 text-sm font-normal text-black bg-gray-200 border border-gray-200 rounded-xl shadow dark:text-gray-100 dark:bg-dim-400 dark:border-dim-400 focus:bg-gray-100 dark:focus:bg-dim-900 focus:outline-none focus:border focus:border-violet-200 h-9'
                    placeholder='Поиск'
                    type='text'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    >
                    </input>

                </div>
            </div>



            <div className='mt-10 w-full flex flex-col mr-5'>
                    
                    <div className='bg-gray-100 p-4 items-center rounded-t-xl pr-20 flex'>
                        <div className='grid grid-cols-12 w-full'>
                            <p className='text-sm text-bold col-span-3 mx-auto font-medium'>Заказ</p>
                            <p className='text-sm text-bold col-span-3 mx-auto font-medium'>Статус</p>
                            <p className='text-sm text-bold col-span-3 mx-auto font-medium'>Краткая справка</p>
                            <p className='text-sm text-bold col-span-3 mx-auto font-medium'>Договор</p>
                        </div>
                    </div>


                    <OrderList
                    filter={filter === null ? null : filter.value }
                    searchQuery={query}
                    />

                    <div className='flex p-3 border-2 border-inherit rounded-b-xl items-center justify-between bg-gray-100'>
                        
                    </div>
            </div>
        </div>

            <div className='m-4' hidden={isFormActive === false}>
                <OrderForm
                onClick={handleButtonForm}
                />
            </div>

            <div hidden={popupActive === false}>
                <FilterModal 
                onClick={handlePopup}
                value={filter}
                onChange={setFilter}
                onClose={handlePopup}
                />
            </div>
        </>
    )
}

export default Orders;