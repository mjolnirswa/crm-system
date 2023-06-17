import { AiFillFire } from "react-icons/ai";
import { BsPeople, BsBasket, BsClipboardData } from "react-icons/bs";
import { BiLogOut } from 'react-icons/bi';
import Tab from "./Tab";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../store/slices/userSlice";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)

    const [activeButton, setActiveButton] = useState('clients')

    const handleActiveButtonChange = (name) => {
        setActiveButton(name)
    }

    return (
        <div className="flex flex-col h-screen border-r-2 border-r-inherit">
            
            <div className="flex flex-row p-2 my-2 rounded-full hover:bg-violet-50 w-min items-center justify-center cursor-pointer mx-auto">
                <AiFillFire style={{color: 'purple', fontSize: '3em'}}/>
                <h1 className="ml-4 text-xl hidden lg:block whitespace-nowrap text-left font-medium">Company Logo</h1>
            </div>
            
            <div className="mt-8 space-y-4 mx-auto">
                <Tab
                text="Клиенты"
                toggleButton={() => handleActiveButtonChange('clients')}
                active={activeButton === 'clients' ? true : false}
                to="clients"
                >
                    <BsPeople style={{fontSize: "2em"}}/>
                </Tab>

                <Tab
                text="Заказы"
                toggleButton={() => handleActiveButtonChange('orders')}
                active={activeButton === 'orders' ? true : false}
                to='orders'
                >
                    <BsBasket style={{fontSize: "2em"}}/>
                </Tab>

                <Tab
                text="Отчеты"
                toggleButton={() => handleActiveButtonChange('document')}
                active={activeButton === 'document' ? true : false}
                to='document'
                >
                    <BsClipboardData style={{fontSize: "2em"}}/>
                </Tab>
            </div>

            <div className="mt-auto space-y-4 mx-auto mb-6">
                <Tab
                text="Выйти"
                toggleButton={() => dispatch(removeUser())}>
                    <BiLogOut style={{fontSize: "2em"}}/>
                </Tab>

                <NavLink
                to="user" 
                className="border-2 border-inherit w-full rounded-full px-2 py-2 cursor-pointer flex"
                >
                    <div className="flex items-center">
                        <img src={
                            user.userImg ? 
                            user.userImg
                            : "https://shkolasam.gosuslugi.ru/netcat_files/9/164/avatar_scaled_15.jpeg"
                        } 
                        alt="user" 
                        className="rounded-full w-10 h-10"/>

                        <div className="flex-col hidden ml-2 lg:block">
                            <h1 className="text-sm font-bold text-gray-800">
                                {user.name}
                            </h1>
                            <p className="text-sm text-gray-400">
                                Менеджер
                            </p>
                        </div>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar;