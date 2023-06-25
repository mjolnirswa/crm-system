import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { BsFilter } from 'react-icons/bs';
import StatBar from '../UI/StatBar';
import { useEffect, useState } from 'react';
import ClientForm from './ClientForm';
import ClientsList from './ClientsList';
import FilterModal from '../UI/FilterModal';
import { getActiveClientCount, getClientCount, getNewClientsCount } from '../../utils/getClientInfo';

const Clients = () => {
    const [isFormActive, setFormActive] = useState(false);
    const [popupActive, setPopupActive] = useState(false);
    const [filter, setFilter] = useState(null);
    const [query, setQuery] = useState("");

    const [allClientsStat, setAllClientsStat] = useState(null)
    const [newClientsStat, setNewClientsStat] = useState(null)
    const [activeClientStat, setActiveClientStat] = useState(null)

    const handleButtonForm = () => setFormActive(!isFormActive);
    const handlePopup = () => setPopupActive(!popupActive);
    const handleFilterDelete = () => setFilter(null);

    useEffect(() => {
        const fetchData = async () => {
            const allClientParam = await getClientCount()
            const newClientParam = await getNewClientsCount()
            const activeClientParam = await getActiveClientCount()

            setAllClientsStat(allClientParam)
            setNewClientsStat(newClientParam)
            setActiveClientStat(activeClientParam)
        }

        fetchData();
    }, [])

    return (
        <div className='relative w-[100%]'>
            <div className="m-4 h-screen" hidden={isFormActive === true}>
            <div className="flex w-full">
                <h1 className="text-left text-3xl text-bold">Клиенты</h1>

                <button className="text-center text-white bg-purple-400 
                hover:bg-purple-500 rounded-full ml-auto py-2 px-3
                flex justify-center"
                onClick={handleButtonForm}
                >
                    <div className='my-auto'>
                        <AiOutlinePlus style={{color: 'white'}}/>
                    </div>
                    <span className="text-sm ml-2">
                        Добавить клиента
                    </span>
                </button>
            </div>

            <div className='flex items-center mt-10 gap-6 flex-nowrap overflow-x-auto'>

                <div>
                    <StatBar 
                    text='Все клиенты' 
                    count={allClientsStat === null ? '' : allClientsStat.count} 
                    percent={allClientsStat === null ? '' : allClientsStat.percent}
                    loading={allClientsStat === null ? true : false}
                    />
                </div>

                <div>
                    <StatBar 
                    text='Новых клиентов' 
                    count={newClientsStat === null ? '' : newClientsStat.count} 
                    percent={newClientsStat === null ? '' : newClientsStat.percent}
                    loading={newClientsStat === null ? true : false}/>
                </div>

                <div>
                    <StatBar 
                    text='Активных клиентов' 
                    count={activeClientStat === null ? '' : activeClientStat.count} 
                    percent={activeClientStat === null ? '' : activeClientStat.percent} 
                    loading={activeClientStat === null ? true : false}/>
                </div>
            </div>

            <div className='flex w-full mt-6'>
                <button 
                className='rounded-xl py-2 px-3 border-2 border-inherit bg-white'
                onClick={handlePopup}
                >
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
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    type='text'>
                    </input>

                </div>
            </div>
            

            <div className='mt-10 flex flex-col mr-5 flex-nowrap overflow-x-auto w-full'>
                    
                    <div className='bg-gray-100 p-4 items-center rounded-t-xl pr-20 flex md:w-[700px] sm:w-[700px] lg:w-full'>
                        <div className='grid grid-cols-12 w-full'>
                            <p className='text-sm text-bold col-span-3 mx-auto font-medium'>Клиент</p>
                            <p className='text-sm text-bold col-span-3 mx-auto font-medium'>Статус</p>
                            <p className='text-sm text-bold col-span-3 mx-auto font-medium'>Телефон</p>
                            <p className='text-sm text-bold col-span-3 mx-auto font-medium'>Email</p>
                        </div>
                    </div>

                    <ClientsList
                    filter={filter === null ? null : filter.value }
                    searchQuery={query}
                    />

                    <div className='flex p-3 border-2 border-inherit rounded-b-xl items-center justify-between bg-gray-100 
                    md:w-[700px] sm:w-[700px] lg:w-full'>
                        
                    </div>
            </div>
        </div>


            <div className='m-4' hidden={isFormActive === false}>
                <ClientForm
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
        </div>
    )
}

export default Clients;