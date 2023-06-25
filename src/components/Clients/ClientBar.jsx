import { deleteDoc, doc } from 'firebase/firestore';
import { BsTrash, BsPen } from 'react-icons/bs';
import { db } from '../../firebase';
import { NavLink } from 'react-router-dom';

const ClientBar = (props) => {
    const styleActive = props.clientStatus==="Активный" ?
    'text-sm text-bold col-span-3 mx-auto text-green-500' 
    : 'text-sm text-bold col-span-3 mx-auto'

    const handleDelete = async () => {
        try {
          await deleteDoc(doc(db, "clients", props.id));
          props.setData(props.data.filter((item) => item.id !== props.id));
        } catch (err) {
          console.log(err);
        }
    };

    return (
        <div 
        className="p-3 border-2 border-inherit flex items-center relative justify-around pr-20
        hover:bg-gray-100 md:w-[700px] sm:w-[700px] lg:w-full">
            <div className='grid grid-cols-12 w-full '>
                <p className='text-sm text-bold col-span-3 mx-auto'>{props.clientName}</p>
                <p className={styleActive}>{props.clientStatus}</p>
                <p className='text-sm text-bold col-span-3 mx-auto'>{props.clientTel}</p>
                <p className='text-sm text-bold col-span-3 mx-auto truncate md:w-[130px] sm:w-[130px]'>{props.clientEmail}</p>
            </div>

            <button className='my-auto right-16 absolute cursor-pointer' onClick={handleDelete}>
                <BsTrash style={{color: 'inherit'}}/>
            </button>
            <NavLink to={props.id} className='my-auto right-6 absolute cursor-pointer'>
                <BsPen style={{color: 'inherit'}}/>
            </NavLink>
        </div>
    )
}

export default ClientBar;