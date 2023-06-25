import { deleteDoc, doc } from "firebase/firestore";
import { BsPen, BsTrash } from "react-icons/bs";
import { db } from "../../firebase";
import { NavLink } from "react-router-dom";

const OrderBar = (props) => {
    const styleActive = props.orderStatus==="Активный" ?
    'text-sm text-bold col-span-3 mx-auto text-green-500' 
    : 'text-sm text-bold col-span-3 mx-auto'

    const handleDelete = async () => {
        try {
          await deleteDoc(doc(db, "orders", props.id));
          props.setData(props.data.filter((item) => item.id !== props.id));
        } catch (err) {
          console.log(err);
        }
    };

    return (
        <div className="p-3 border-2 border-inherit flex items-center relative justify-around pr-20
        hover:bg-gray-100 md:w-[700px] sm:w-[700px] lg:w-full">
            <div className='grid grid-cols-12 w-full'>
                <p className='text-sm text-bold col-span-3 mx-auto'>{props.orderNumber}</p>
                <p className={styleActive}>{props.orderStatus}</p>
                <p className='text-sm text-bold col-span-3 mx-auto'>{props.orderDesc.length !== 0 ? props.orderDesc : '-'}</p>
                <a className='text-sm text-bold col-span-3 mx-auto text-purple-500 underline' href={props.orderDoc}>перейти</a>
            </div>

            <div className='my-auto right-16 absolute cursor-pointer' onClick={handleDelete}>
                <BsTrash style={{color: 'inherit'}}/>
            </div>
            <NavLink to={`/orders/${props.id}`} className='my-auto right-6 absolute cursor-pointer'>
                <BsPen style={{color: 'inherit'}}/>
            </NavLink>
        </div>
    )
}

export default OrderBar;