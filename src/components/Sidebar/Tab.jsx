import { NavLink } from "react-router-dom";

const Tab = (props) => {
    const buttonStyle = props.active===true ? 
    'flex flex-row p-3 w-min hover:bg-gray-200 rounded-full text-black bg-violet-50' : 
    'flex flex-row p-3 w-min hover:bg-gray-200 rounded-full text-black hover:bg-violet-50'
    const textStyle = props.active===true ? 
    'font-medium ml-4 text-xl hidden lg:block whitespace-nowrap text-left hidden lg:block' : 
    'ml-4 text-xl hidden lg:block whitespace-nowrap text-left hidden lg:block'

    return (
        <NavLink className={buttonStyle} onClick={props.toggleButton} to={props.to}>
            {props.children}
            <h2 className={textStyle}>
                {props.text}
            </h2>
        </NavLink>
    )
}

export default Tab;