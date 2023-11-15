

import { FcHome } from 'react-icons/fc';

function ButtonSubmit({name,className,onClick,icon}:{name:string,className?:string,onClick?:()=>void,icon?:boolean}) {
  return (
    <div className='w-[100%] '>
    <button type={`${onClick!==undefined?"button":"submit"}`} onClick={onClick} className={`${className !==undefined? `${className}` :
    `uppercase text-2xl px-3 h-14 hover:bg-blue-400 ${icon?"flex flex-row justify-center items-center gap-x-3":""}
     bg-blue-600 w-[100%] text-center text-white my-2 `}`}>
      {name} {icon?<span><FcHome size="2.5rem"/></span>:null}
    </button>
    
   </div>
  )
}

export default ButtonSubmit;
