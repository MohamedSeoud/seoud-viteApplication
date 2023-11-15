import { ErrorMessage } from "formik";
import { ChangeEvent, useState } from "react";
import { PiCloudArrowUpBold } from "react-icons/pi";

function ImageInput({setFieldValue,name,src}:{setFieldValue:(name:string, file:object )=>void,name:string,src?:string}) {

  const [imagePreview,setImagePreview] =  useState(`${src===undefined?"":src}`) ;

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {target} = event;
    const{files} =target
    if (files) {setImagePreview(URL.createObjectURL(files[0]));}
  };
  return (
    <>
    <div className=' sm:w-[500px] w-[100%] mx-8 h-[300px]   text-center flex flex-col cursor-pointer
    justify-center items-center border-[3px]  border-blue-600  rounded-[30px]
    bg-white'>
   <input type='file' name={name} className='text-center sm:w-[500px] sm:h-[300px]  h-[300px] w-[100%] mx-12 
    bg-black placeholder:"fff"  cursor-pointer flex flex-col 
    justify-center items-center border-[3px] opacity-0 z-50 absolute ' accept="image/*"
    onChange={(event: React.ChangeEvent<HTMLInputElement> )=>{
       const { target } = event
       const{files} =   target
       if (!event?.target?.files) return;
        files?.length && setFieldValue(`${name}`, files[0] );
        handleImageChange(event)
    }}
    
    />
       <div className='relative text-blue-600 font-bold text-2xl  overflow-hidden    flex flex-col items-center justify-center'>
      Upload Image
      <span>
       <PiCloudArrowUpBold  size="5rem"/>
      </span>
      <span className=' w-[175px] h-[175px] flex justify-center items-center  overflow-hidden' >
       {imagePreview !=="" && <img className="w-[175px] h-[175px]" width="175px" height="175px" src={imagePreview}/>}
      </span>
      
      </div>
    
 </div>

    <div className=' text-red-600 text-xl'>
      <ErrorMessage name={`${name}`}/>
    </div>
</>
  )
}

export default ImageInput
