import { ErrorMessage, Field } from 'formik'


interface Props{
    name:string
    placeholder?:string
    className?:string,
    label?:string


}
function TextAreaInput({name,placeholder,className,label}:Props) {
  return (
    <div className=' flex flex-col gap-3 w-[100%]'>
   { label !==undefined ?
    <div className='w-[100%]  uppercase text-xl font-bold  flex flex-row justify-start items-center'>
        {label}
    </div>
    : null
    }     <Field as='textarea' rows="5"  name={`${name}`} placeholder={`${placeholder!==undefined?placeholder:""}`}
     className={`${className !==undefined? className : 'w-[100%] text-2xl py-2 px-3 '}`}/>
    <div className=' text-red-600 text-xl'>
    <ErrorMessage name={`${name}`}/>
    </div>
    </div>
  )
}

export default TextAreaInput
