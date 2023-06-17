const Button = (props) => {
    const style = props.size === "small" ? 
    'w-52 flex justify-center text-white bg-purple-400 rounded-full hover:bg-purple-500 font-sm disabled:bg-purple-300 disabled:cursor-not-allowed py-2 px-3' 
    : 
    'flex justify-center text-white bg-purple-400 rounded-full hover:bg-purple-500 font-sm disabled:bg-purple-300 disabled:cursor-not-allowed w-full py-2 px-3'

    return (
        <button
        className={style}
        onClick={props.onClick}
        disabled={props.disabled}
        >
            <span className={props.textSize}>
                { props.children }
            </span>
        </button>
    )
}

export default Button;

