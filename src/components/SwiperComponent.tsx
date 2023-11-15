import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper'
import { EffectFade,Autoplay,Navigation,Pagination } from "swiper/modules";
import 'swiper/css/bundle';
import {  FaShare } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { FirebaseFetchAllData } from '../firebase/Firebase';
import { DocumentData } from 'firebase/firestore';
import { useNavigate } from 'react-router';
import { LISTING_PATH } from '../helper/enum/navigationPath';

function SwiperComponent() {
    const [isLoading,setIsLoaging] = useState(false);
    const navigate = useNavigate();
    const [data,setData] = useState<DocumentData[]>( [] as DocumentData[]);
    const[copied,setCopied] =useState(false)
    SwiperCore.use([EffectFade,Autoplay,Navigation,Pagination])

    useEffect(()=>{
        const fetchData =async()=>{
           const data= await FirebaseFetchAllData(6);
           console.log(data);
           setData(data)
           setIsLoaging(true)
        }
         fetchData()
    },[])
    const onCopyHandler = ()=>{
        navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(()=> setCopied(false),2000)
    }

  return (
    <>
    { isLoading &&
    <Swiper slidesPerView={1} navigation pagination={{type:"progressbar"}} effect='fade' 
    autoplay={{delay:3000}} >
        {
            data.map((item)=>(
                <SwiperSlide key={item.id}>
                    <div className=' overflow-hidden h-[400px] w-full cursor-pointer' onClick={()=>navigate(LISTING_PATH+`/${item.id}`)} 
                    style={{background:`url(${item.data.imgUrl}) center no-repeat`, backgroundSize:'cover'}}>
                        <div className=' text-white relative m-11 px-4 py-2 flex items-center justify-center text-xl
                         text-center bg-blue-500 w-fit  rounded-br-[30px] font-medium'> 
                            {item.data.name} </div>
                        <div className=' text-white  m-11 px-4 py-2 flex items-end relative top-48 justify-end text-xl
                         text-center bg-red-500 w-fit rounded-xl rounded-tr-[25px] font-medium'>{item.data.regularPrice}$ / Month</div>


                    <div className=' flex  flex-col  gap-4  relative bottom-[250px] justify-center items-end p-12  text-gray-500'>
                        <span onClick={onCopyHandler} className=' h-16 w-16 rounded-full cursor-pointer bg-white flex justify-center
                         items-center '>
                         <FaShare size="2.5rem"/>
                        </span>
                        {   copied &&
                            <span className=' bg-white p-2 rounded-lg text-black  font-bold text-3xl text-center'>
                             copied!
                            </span>
                        }

                    </div>
                </div>
                </SwiperSlide>
            ))

        }
    </Swiper>
    }
      
    </>
  )
}

export default SwiperComponent
