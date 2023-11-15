import { useEffect, useState } from "react"
import SwiperComponent from "../components/SwiperComponent"
import { openInNewTab } from "../helper/openInNewTab"
import MessageSentSuceesfully from "../components/MessageSentSuceesfully";
import { DocumentData } from "firebase/firestore";
import { FirebaseFetchAllData } from "../firebase/Firebase";
import ListHouseCard from "../components/ListHouseCard";
import Spinner from "../components/Spinner";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router";
import { LOAD_MORE_DATA_PATH, OFFER_PATH } from "../helper/enum/navigationPath";

function Home() {
  const [isLoading,setIsLoaging] = useState(false);
  const [offerData,setOfferData] = useState<DocumentData[]>( [] as DocumentData[]);
  const [sellData,setSellData] = useState<DocumentData[]>( [] as DocumentData[]);
  const [rentData,setRentData] = useState<DocumentData[]>( [] as DocumentData[]);
  const navigate=useNavigate();

  useEffect(() => {
    if(sessionStorage.getItem('Email')&& 
       sessionStorage.getItem('Subject')&& 
       sessionStorage.getItem('body')){
        openInNewTab(`mailto:${sessionStorage.getItem('Email')}?Subject=
        ${sessionStorage.getItem('Subject')}&body=${sessionStorage.getItem('body')}`);
        sessionStorage.removeItem('Email');
       sessionStorage.removeItem('Subject'); 
       sessionStorage.removeItem('body');
       MessageSentSuceesfully();
       }

       const fetchData=async()=>{
        const fetchedOfferData = await FirebaseFetchAllData(5,"offer");
        setOfferData(fetchedOfferData);
        const fetchedSellData = await FirebaseFetchAllData(5,"sell");
        setSellData(fetchedSellData);
        const fetchedRentData = await FirebaseFetchAllData(5,"rent");
        setRentData(fetchedRentData)
        setIsLoaging(true)
       }
       fetchData()
  }, [])
  return (
    <>
    { isLoading ?
    
    <div className=' bg-green-100 min-h-screen py-[75px]  '>
    <SwiperComponent/>

    <div className=" flex flex-col p-16">
      <div className=" text-left text-black pb-4 text-3xl font-bold "> 
      Recent offers
      </div>

     <div className=" grid xl:grid-cols-5 lg:grid-cols-4   md:grid-cols-3  sm:grid-cols-2 gap-x-4  gap-y-4 ">
     { offerData.map(c=>{

      return (<ListHouseCard key={c.id}  id={c.id}  address = {c.data.address} baths ={c.data.baths} beds= {c.data.beds}
      description= {c.data.description} imgUrl= {c.data.imgUrl} regularPrice= {c.data.regularPrice} 
      timeStamp = {c.data.timeStamp}   
      />)
      })
      }


    </div>
    <div className=" text-right   flex justify-end items-end py-3  text-sky-600 pb-4 text-xl  " > 
     <span className="w-fit cursor-pointer flex flex-row justify-end  items-end hover:border-b-2 border-sky-600"
      onClick={()=>navigate(OFFER_PATH)}> Show More
     <span className="  relative"><AiOutlineArrowRight size="1.5rem"/> </span>
     
      </span>
      </div>

    </div>


    <div className=" flex flex-col p-16">
      <div className=" text-left text-black pb-4 text-3xl font-bold "> 
      Places For Sale 
      </div>

     <div className=" grid xl:grid-cols-5 lg:grid-cols-4   md:grid-cols-3  sm:grid-cols-2 gap-x-4  gap-y-4 ">
     { sellData.map(c=>{

      return (<ListHouseCard key={c.id}  id={c.id}  address = {c.data.address} baths ={c.data.baths} beds= {c.data.beds}
      description= {c.data.description} imgUrl= {c.data.imgUrl} regularPrice= {c.data.regularPrice} 
      timeStamp = {c.data.timeStamp}   
      />)
      })
      }


    </div>
    <div className=" text-right   flex justify-end items-end py-3  text-sky-600 pb-4 text-xl  "> 
     <span className="w-fit cursor-pointer flex flex-row justify-end  items-end hover:border-b-2 border-sky-600"
     onClick={()=>navigate(LOAD_MORE_DATA_PATH+`/sale`)}> Show More
     <span className="  relative"><AiOutlineArrowRight size="1.5rem"/> </span>
     
      </span>
      </div>

    </div>


    <div className=" flex flex-col p-16">
      <div className=" text-left text-black pb-4 text-3xl font-bold "> 
      Places For Rent 
      </div>

     <div className=" grid xl:grid-cols-5 lg:grid-cols-4   md:grid-cols-3  sm:grid-cols-2 gap-x-4  gap-y-4 ">
     { rentData.map(c=>{

      return (<ListHouseCard key={c.id}  id={c.id}  address = {c.data.address} baths ={c.data.baths} beds= {c.data.beds}
      description= {c.data.description} imgUrl= {c.data.imgUrl} regularPrice= {c.data.regularPrice} 
      timeStamp = {c.data.timeStamp}   
      />)
      })
      }
    </div>
    <div className=" text-right   flex justify-end items-end py-3  text-sky-600 pb-4 text-xl  "> 
     <span className="w-fit cursor-pointer flex flex-row justify-end  items-end hover:border-b-2 border-sky-600"
     onClick={()=>navigate(LOAD_MORE_DATA_PATH+`/rent`)}> Show More
     <span className="  relative"><AiOutlineArrowRight size="1.5rem"/> </span>
     
      </span>
      </div>

    </div>

    </div>
    :
    <Spinner/>
   }
  </>
  )
}

export default Home
