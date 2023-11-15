import { useEffect, useState } from "react"
import SwiperComponent from "../components/SwiperComponent"
import { DocumentData } from "firebase/firestore";
import { FirebaseFetchAllData } from "../firebase/Firebase";
import ListHouseCard from "../components/ListHouseCard";
import Spinner from "../components/Spinner";

function Offers() {
  const [isLoading,setIsLoading] = useState(false);
  const [counter,setCounter] = useState(2);
  const [isFilled,setIsFilled] = useState(false);
  const [curData,setCurData] = useState<DocumentData[]>( [] as DocumentData[]);

  const onLoadMore = async()=>{
    const fetchedOfferData = await FirebaseFetchAllData(15*counter,"offer");
    if(fetchedOfferData.length === curData.length) {
      setIsFilled(true);
      return;
    }
    setCurData(fetchedOfferData)
    setCounter(counter+1)
  }

  useEffect(() => {
       const fetchData=async()=>{
        const fetchedOfferData = await FirebaseFetchAllData(15,"offer");
        setCurData(fetchedOfferData);
        setIsLoading(true)
       }
       fetchData()
  }, [])
  return (
    <>
    { isLoading ?
    
    <div className=' bg-green-100 min-h-screen py-[75px]  '>
    <SwiperComponent/>

    <div className=" flex flex-col p-16">
      <div className=" text-center text-black pb-4 text-3xl font-bold "> 
      Recent offers
      </div>

     <div className=" grid xl:grid-cols-5 lg:grid-cols-4   md:grid-cols-3  sm:grid-cols-2 gap-x-4  gap-y-4 ">
     { curData.map(c=>{

      return (<ListHouseCard key={c.id}  id={c.id}  address = {c.data.address} baths ={c.data.baths} beds= {c.data.beds}
      description= {c.data.description} imgUrl= {c.data.imgUrl} regularPrice= {c.data.regularPrice} 
      timeStamp = {c.data.timeStamp}   
      />)
      })
      }


    </div>
    <div className=" text-right   flex justify-center items-center py-3  my-3  text-white pb-4 text-xl    "> 
     
     {!isFilled? <span className="cursor-pointer flex flex-row justify-end hover:bg-transparent border-2 border-blue-400
      hover:text-blue-400 bg-blue-400 py-3 px-6 rounded-3xl
     
     
     w-fit items-end hover:border-b-2 " onClick={onLoadMore}> Show More     
      </span>
      :

      <span className=" flex flex-row justify-end bg-transparent border-2 border-blue-400
      text-blue-400  py-3 px-6 rounded-3xl
     
     
     w-fit items-end hover:border-b-2 " onClick={onLoadMore}> No More Data To Show     
      </span>
       }
      </div>

    </div>


 

    </div>
    :
    <Spinner/>
   }
  </>
  )
}

export default Offers
