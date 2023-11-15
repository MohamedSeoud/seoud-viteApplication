import  {  useEffect, useState } from 'react';
import { BsList } from 'react-icons/bs';

import image from '../../assets/icon-close.png';
import { NavLink, useLocation } from 'react-router-dom';
import { HOME_PATH, OFFER_PATH, PROFILE_PATH, SING_IN_PATH } from '../../helper/enum/navigationPath';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Spinner from '../Spinner';

function Header() {
  const location =useLocation();
  const[navName,setNavName]=useState("Signin")
  const[isLoading,setIsLoading] = useState(false);
  const checkLocation =(path:string)=>{
  
    if(location.pathname===path)return true;
    return false;
  }
  const auth =getAuth()
  useEffect(()=>{
    setIsLoading(false)
    onAuthStateChanged(auth,(user)=>{

      if(user) {setNavName(user.displayName!);
      }
      else{setNavName("Signin")}

    })
    setIsLoading(true);

  },[auth])

const[showNav, setShowNav] = useState(false);
  return (
    <>
    { isLoading ?
    <div className=' flex flex-col fixed  z-50  w-screen overflow-hidden '>
    <div className='  py-2 bg-blue-500  px-9  flex flex-row items-center py-auto justify-between w-[100%]'>
      <NavLink to={HOME_PATH} className=''> <img src={image} className="max-h-[35px] my-3 w-auto" alt="" /> </NavLink>
      <div className='bg-blue-500   max-sm:hidden flex     z-50 text-white  flex-row gap-2'>
        <NavLink to={HOME_PATH} className={`hover:bg-blue-600 cursor-pointer mx-3 p-4 rounded-3xl uppercase ${checkLocation(HOME_PATH) || checkLocation("/")?"bg-blue-600":""}`}>
          home
        </NavLink>
        
        <NavLink to={OFFER_PATH} className={`hover:bg-blue-600 cursor-pointer mx-3 p-4 rounded-3xl uppercase ${checkLocation(OFFER_PATH)?"bg-blue-600":""}`}>
          offers
        </NavLink>

        <NavLink to={checkLocation(SING_IN_PATH) ? SING_IN_PATH : PROFILE_PATH} className={`hover:bg-blue-600 cursor-pointer mx-3 p-4 rounded-3xl uppercase
         ${checkLocation(SING_IN_PATH) || checkLocation(PROFILE_PATH) ?"bg-blue-600":""}`}>
          {navName}
        </NavLink>



    </div>
      
      <div className=' cursor-pointer max-sm:flex  hidden my-2' onClick={()=>setShowNav(!showNav)}> <BsList color="white" size="3rem"/> </div>
    </div>
    { showNav&&
    <div className='bg-blue-500 w-[100%]  max-sm:flex hidden   pb-5 text-white  flex-col gap-5 '>
        <NavLink to={HOME_PATH} className={`hover:bg-blue-600 cursor-pointer mx-3 p-4 rounded-3xl uppercase ${checkLocation(HOME_PATH)?"bg-blue-600":""}`}>
          home
        </NavLink>
        
        <NavLink to={OFFER_PATH} className={`hover:bg-blue-600 cursor-pointer mx-3 p-4 rounded-3xl uppercase ${checkLocation(OFFER_PATH)?"bg-blue-600":""}`}>
          offers
        </NavLink>


        <NavLink to={checkLocation(SING_IN_PATH)? SING_IN_PATH : PROFILE_PATH} className={`hover:bg-blue-600 cursor-pointer mx-3 z-10 p-4 rounded-3xl uppercase 
        ${checkLocation(SING_IN_PATH) || checkLocation(PROFILE_PATH) ?"bg-blue-600":""}`}>
          {navName}
        </NavLink>

 

    </div>

     }
    </div>
    :
    <Spinner/>
     }
    </>
  )
}

export default Header
