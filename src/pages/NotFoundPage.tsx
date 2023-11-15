import { HiDocumentSearch } from 'react-icons/hi'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { HOME_PATH } from '../helper/enum/navigationPath'



function NotFoundPage() {
  return (
    <div className='w-screen h-screen flex flex-col fixed bg-green-100  z-50  justify-center items-center text-center'>
      <HiDocumentSearch size="8rem" color="gray"/>
      <div className=' text-[50px] text-gray-500 font-bold'>Page Not Found</div>
      <Link to={HOME_PATH} className=' text-[30px] text-white gap-2 font-bold px-14 py-4 my-7 rounded-2xl
       bg-blue-400 border-blue-400 border-2 flex flex-row  justify-center items-center hover:bg-transparent hover:text-blue-400 cursor-pointer'>Back to Home Page
       <span className=' relative top-1'><AiOutlineArrowRight size="2.5rem" /></span>
       </Link>
    </div>
  )
}

export default NotFoundPage
