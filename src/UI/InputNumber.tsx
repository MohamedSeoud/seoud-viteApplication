import { ErrorMessage, Field } from 'formik'


interface Props{
    name1:string,
    name2?:string,
    title1:string,
    title2?:string,
    option?:boolean,
    min?:number,
    max?:number,
    min2?:number,
    max2?:number
}

function InputNumber({name1,name2,title1,title2,option,min,max,min2,max2}:Props)
    {
  return (
    <div className='w-[100%] flex flex-row justify-between items-center max-w-[500px]'>
        <div className=' flex flex-col gap-3'>

            <div className='w-[100%]  uppercase text-xl font-bold  flex flex-row justify-start items-center'>
                {title1}
            </div>
            <div className='w-[100%] h-[100%] justify-center items-center text-center flex flex-row gap-7'>

            <div className='  '>
            <Field min={`${min===undefined?"1":min}`} max={`${max===undefined?"1000000":max}`} className="w-[180px] text-xl  rounded-md px-7 h-[60px]" 
                name={name1}   type="number" />
            </div>
            { option===true  ? <div className=' uppercase text-xl font-medium'>$ per month</div> :null}
            </div>
            
            <div className=' text-red-600 text-xl'>
                <ErrorMessage name={`${name1}`}/>
           </div>

        </div>
        { option===true ?
        null
        :
        <div className=' flex flex-col gap-3'>

            <div className='w-[100%]  uppercase text-xl font-bold  flex flex-row justify-start items-center'>
                {title2}
            </div>

            <div className='  '>
            <Field  min={`${min2===undefined?"1":min2}`} max={`${max2===undefined?"1000000":max2}`} className="w-[180px] text-xl  rounded-md px-7 h-[60px]" 
                name={name2}   type="number" />
            </div>

            <div className=' text-red-600 text-xl'>
                <ErrorMessage name={`${name2}`}/>
           </div>

        </div>
        }
    </div>
  )
}

export default InputNumber
