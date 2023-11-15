
import { MdLocationOn } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { ListCardModel } from '../helper/types';
import 'moment-timezone';
import Moment from 'react-moment';
import { useNavigate } from 'react-router';
import { LISTING_PATH } from '../helper/enum/navigationPath';





function ListHouseCard({address,baths,beds,description,imgUrl,regularPrice,timeStamp,id,
     onDeleteHandler, onEditHandler}:ListCardModel) {
        const navigate = useNavigate()
  return (
    <div className='w-[100%] h-[100%] max-h-[320px] hover:shadow-2xl rounded-xl transition 
    ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-200
     hover:ease-in cursor-pointer   bg-white'>
        <div className=' w-[100%] h-[100%] flex flex-col ease-out  duration-300'  onClick={()=>navigate(LISTING_PATH+`/${id}`)}>
        <img src={imgUrl} className='w-[100%] h-[180px] rounded-t-xl overflow-hidden' alt=''/>
        <div className=' relative text-white rounded-lg flex justify-center text-center items-center
         bg-blue-500 h-[30px] w-fit px-2 bottom-[165px] mx-3 text-xs font-medium uppercase'>
            <Moment fromNow >
                { new Date(timeStamp)}
           </Moment> 

  

        </div>
        </div>
        <div className=' flex justify-start items-start p-3 relative bottom-[140px] flex-col'  >
            <div className='flex justify-between gap-2 flex-row overflow-hidden  ' onClick={()=>navigate(LISTING_PATH+`/${id}`)}>
                <span> <MdLocationOn color="green"  size="1.5rem"/></span>
                <span className='line-clamp-1 w-[100%] text-gray-500'>{address}</span>
            </div>

            <div className='line-clamp-1 w-[100%]  text-[25px] font-medium text-blue-900 py-1 ' onClick={()=>navigate(LISTING_PATH+`/${id}`)}>
                {description}
            </div>

            <div className='line-clamp-1 w-[100%]  text-[18px] font-normal text-sky-600  ' onClick={()=>navigate(LISTING_PATH+`/${id}`)}>
                ${regularPrice}/Month
            </div>

            <div className=' flex flex-row justify-between px-2 w-[100%]'>
            <div className=' flex flex-row gap-x-3 font-bold justify-between '>
             <span>{beds} Beds</span>
             <span>{baths} Baths</span>

            </div>
            { onDeleteHandler && onEditHandler &&
                <div className=' flex flex-row  gap-2 z-10'>
                    <span className=' cursor-pointer z-10  hover:text-amber-400' onClick={onEditHandler}>
                        <FaEdit size="1.1rem"/>
                    </span>
                    <span className=' cursor-pointer z-10' onClick={onDeleteHandler}>
                        <RiDeleteBin5Fill  size="1.1rem" color="red"/>
                    </span>
                </div>
            }

            </div>



        </div>
    </div>
  )
}

export default ListHouseCard
