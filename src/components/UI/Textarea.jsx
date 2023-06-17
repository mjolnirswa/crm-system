import { useState } from "react";

const Textarea = (props) => {
    const [ inputValue, setInputValue ] = useState('');

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
                <textarea
                value={props.value ? props.value : inputValue}
                onChange={(e) => inputHandler(e.target.value)} 
                className={style}
                placeholder={props.placeholder}
                type={props.type}
                />
            </div>
        </div>
    )
}

export default Textarea;