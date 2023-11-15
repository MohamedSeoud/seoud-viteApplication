import { ErrorMessage, Field } from 'formik'

function RadioButton({name,value1,value2,title,name2,name3}:{name:string,value1:string|boolean,title:string,value2:string|boolean,name2:string,name3:string}) {


  return (
    <div className='w-[100%] flex flex-row justify-between items-center max-w-[500px]'>
        <div className=' flex flex-col gap-3'>

            <div className='w-[100%]  uppercase text-xl font-bold  flex flex-row justify-start items-center'>
                {title}
            </div>

            <div>
        <label className=' w-[100%] flex flex-row justify-start items-center'  >
            <Field   
                name={name} value={value1} className="hidden peer " type="radio" />
                <span  className={` w-6 h-6 rounded-full bg-slate-200 peer-checked:bg-sky-500 text-transparent relative z-10  `} />
            <span 
            className='flex flex-row  justify-start   text-end items-center rounded-lg cursor-pointer hover:shadow-2xl transition
                duration-500 px-16 w-[180px] h-[60px] bg-white relative right-8 peer-checked:text-black text-gray-500
                    peer-checked:bg-sky-200 font-bold'>
                <span className="text-sm uppercase ">{name2}</span>
            </span>
        </label>
        </div>
        <div className=' text-red-600 text-xl relative right-3'>
                <ErrorMessage name={`${name}`}/>
                
           </div>

        </div>


        <div className=' relative top-5'>
        <label className=' w-[100%] flex flex-row justify-center items-center'  >
            <Field  
                name={name} value={value2} className="hidden peer " type="radio" />
                <span  className={` w-6 h-6 rounded-full bg-slate-200 peer-checked:bg-sky-500 text-transparent relative z-10 left-8  `} />
            <span 
            className='flex flex-row  justify-start   text-end items-center rounded-lg cursor-pointer hover:shadow-2xl transition
                duration-500 px-16 w-[180px] h-[60px]   bg-white peer-checked:text-black text-gray-500
                    peer-checked:bg-sky-200 font-bold'>
                <span className="text-sm uppercase ">{name3}</span>
            </span>
        </label>
        <div className=' text-red-600 text-xl relative py-2'>
                <ErrorMessage name={`${name}`}/>
           </div>

        </div>
        
    </div>
  )
}

export default RadioButton
