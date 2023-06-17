import { useState } from "react";

const Input = (props) => {
    const [ inputValue, setInputValue ] = useState(props.value);

    const inputHandler = (value) => {
        setInputValue(value)
        props.onChange(value);
    } 

    const style = props.size === "small" ? 
    'block px-4 border-gray-300 rounded-xl shadow-sm focus:ring-violet-400 focus:border-violet-400 sm:text-sm' 
    : 
    'block px-4 w-full border-gray-300 rounded-xl shadow-sm focus:ring-violet-400 focus:border-violet-400 sm:text-sm'



    return (
        <div>
            <label 
            className="block pl-3 ml-px text-sm font-medium text-gray-700"
            >
                { props.label }
            </label>

            <div className="mt-1">
                <input 
                value={props.type === 'file' ? '' : inputValue}
                onChange={(e) => inputHandler(
                    props.type === 'file' ? e.target.files[0] : e.target.value
                )} 
                className={style}
                placeholder={props.placeholder}
                type={props.type}
                ref={props.ref}
                />
            </div>
        </div>
    )
}

export default Input;