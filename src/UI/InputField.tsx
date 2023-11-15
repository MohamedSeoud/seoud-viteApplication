import { ErrorMessage, Field } from 'formik'


interface Props{
    name:string
    placeholder?:string
    className?:string
    disabled?:string,
    label?:string
}
function InputField({name,placeholder,className,disabled,label}:Props) {
  return (
    <div className=' flex flex-col gap-3 w-[100%]'>
   { label !==undefined ?
    <div className='w-[100%]  uppercase text-xl font-bold  flex flex-row justify-start items-center'>
        {label}
    </div>
    : null
    }
          
    { disabled !==undefined?
    <Field disabled type='text' name={`${name}`} placeholder={`${placeholder!==undefined?placeholder:""}`}
     className={`${className !==undefined? className : 'w-[100%] text-2xl px-3 h-14'}`}/>
     :
     <Field type='text' name={`${name}`} placeholder={`${placeholder!==undefined?placeholder:""}`}
     className={`${className !==undefined? className : 'w-[100%] text-2xl px-3 h-14'}`}/>
      }
    <div className=' text-red-600 text-xl'>
    <ErrorMessage name={`${name}`}/>
    </div>
    </div>
  )
}

export default InputField
