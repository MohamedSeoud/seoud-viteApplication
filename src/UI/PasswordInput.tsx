import { ErrorMessage, Field } from 'formik'
import { useState } from 'react'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'

function PasswordInput() {

    const[eyeShow,setEyeShow] =useState(true);

  return (
    <div>
    <div className=' flex flex-col'>
    <div className='w-[100%] h-fit flex flex-col justify-end items-end'>
    <Field name='password' type={`${eyeShow?"password":"text"}`} placeholder='Password' className='w-[100%] text-2xl px-3 h-14'/>
    <div className=' relative bottom-11  px-3 cursor-pointer' onClick={()=>setEyeShow(!eyeShow)}>
      { eyeShow?
    <BsFillEyeFill size="2rem" />
    :
    <BsFillEyeSlashFill size="2rem"/>
      }
    </div>
    </div>
    <div className=' relative bottom-7 text-red-600 text-xl'>
    <ErrorMessage name='password'/>
    </div>
    </div>
  </div>
  )
}

export default PasswordInput
