import { BiDotsVerticalRounded } from 'react-icons/bi';
import { BsArrowUpShort } from 'react-icons/bs';
import { ClipLoader } from "react-spinners";

const StatBar = (props) => {
    return (
        <div className='flex p-5 border-2 border-inherit rounded-lg h-full w-64'>
                    <div>
                        <p className='text-sm text-inherit whitespace-nowrap'>{props.text}</p>
                        <div className="mx-auto mt-2" hidden={props.loading===false}>
                        <ClipLoader
                            color="#D962C7"
                            loading
                        />
                        </div>
                        <h1 className='text-3xl font-semibold mt-2' hidden={props.loading===true}>{props.count}</h1>
                    </div>
                    <div className='ml-auto relative'>
                        <div className='cursor-pointer right-0 absolute'>
                            <BiDotsVerticalRounded style={{color: 'inherit' ,fontSize: '1.5em'}}/>
                        </div>
                        <div className='bg-green-200 p-1 rounded-full w-full mt-10'>
                            <div className='flex'>
                                <div className='my-auto'>
                                    <BsArrowUpShort style={{color: 'green'}}/>
                                </div>
                                <p className='text-green-700 text-sm text-center'>{props.percent}%</p>
                            </div>
                        </div>
                    </div>
                </div>
    )
}

export default StatBar;