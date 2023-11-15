import { Link, useNavigate } from 'react-router-dom'
import { HOME_PATH } from '../helper/enum/navigationPath';

interface Props{
    name1:string,
    option1:string,
    path1:string,
    name2:string,
    path2?:string,
    func?:()=>void
    onClick?:()=>void
}
function OptionPart({name1,path1,option1,name2,path2,func,onClick}:Props) {
   const navigate = useNavigate();

   const onclickHandler =()=> {
        func && func();
        navigate(HOME_PATH);
      }

  return (
  <div className='flex flex-row justify-between w-[100%]'>
        <div>
        <p className=' text-2xl'>{name1} 
        { onClick ===undefined?
        <Link to={path1} className=' text-red-600 cursor-pointer
        hover:border-b-2
        border-red-600 border-spacing-2'> {option1} </Link>
        :
        <span onClick={onClick} className=' text-red-600 cursor-pointer
        hover:border-b-2
        border-red-600 border-spacing-2 w-fit'> {option1} </span>
         }
        </p>
        </div>
        { path2 ?<Link to={path2} className=' text-2xl max-h-[31px] text-blue-600 cursor-pointer   
            '>
           <span className='hover:border-b-2 border-spacing-2 border-blue-600'>
              {name2}
           </span>
        </Link>:
        <div onClick={onclickHandler} className=' text-2xl max-h-[31px] text-blue-600 cursor-pointer   
        '>
       <span className='hover:border-b-2 border-spacing-2 border-blue-600'>
          {name2}
       </span>
       </div>
        }
   </div>
  )
}

export default OptionPart
