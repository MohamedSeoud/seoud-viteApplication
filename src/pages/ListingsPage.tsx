import  { useEffect, useState } from 'react'
import SwiperComponent from '../components/SwiperComponent'
import MapComponent from '../components/MapComponent'
import { MdLocationOn } from 'react-icons/md'
import { FaBath, FaBed, FaChair, FaParking } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router'
import { FirebaseGetEmail, FirebaseGetItemById } from '../firebase/Firebase'
import Spinner from '../components/Spinner'
import { DocumentData } from 'firebase/firestore'
import { HOME_PATH, SING_IN_PATH } from '../helper/enum/navigationPath'
import toastNotification from '../helper/toastNotification'
import { tostifyVariables } from '../helper/enum/tostifyVariables'
import TextAreaInput from '../UI/TextAreaInput';
import * as Yup from 'yup';
import { Form, Formik } from 'formik'
import ButtonSubmit from '../UI/ButtonSubmit'
import { getAuth } from 'firebase/auth'
import SwalNotRegistered from '../components/SwalNotRegistered'
import MessageSentSuceesfully from '../components/MessageSentSuceesfully'

function ListingsPage() {
  const[isLoading,setIsLoading]=useState(false)
  const[isRegistered,setIsRegistered]=useState(false)
  const [data,setData] = useState<DocumentData>( {} as DocumentData);
  const [email,setEmail] = useState<DocumentData>( {} as DocumentData);
  const auth = getAuth();


  const navigate = useNavigate()


  const {id} = useParams()
  useEffect(()=>{

    const fetchData = async()=>{
    const item = id &&  await FirebaseGetItemById(id)
     if ( item && !item.exists()){
      navigate(HOME_PATH);
      toastNotification({text:"This item doesn't Exist",choice:tostifyVariables.error})
    }
    item && setData(item.data());
    const email = item && await FirebaseGetEmail(item.data().userRef);
    email &&  setEmail(email.data().email);
    if ( auth.currentUser?.uid !== undefined){
      setIsRegistered(true)
    }
    setIsLoading(true)
    }
    fetchData()
  },)

  const initialState={
    message:""
  }
  const validationSchema= Yup.object({
    message:Yup.string().required('Required!')
  }) 

  const onSubmit = async(value:{message:string},{resetForm}:{resetForm:()=>void})=>{
    if(isRegistered)
    {
      console.log(email)
      MessageSentSuceesfully();
      resetForm()
    }
    else{
      sessionStorage.setItem('Email',value.message)
      sessionStorage.setItem('Subject',data.name)
      sessionStorage.setItem('body',value.message)
      SwalNotRegistered();
      navigate(SING_IN_PATH)
    }
  }
  return (
    <>
     { isLoading ?
     <Formik initialValues={initialState}  
     onSubmit={onSubmit} validationSchema={validationSchema}
     validateOnChange={false} validateOnBlur={false}
     >
         <Form>
            <div className=' bg-green-100 min-h-screen py-[75px] '>
              <SwiperComponent/>
              

              <div className=' grid grid-cols-1 lg:grid-cols-2 mx-20 my-6 gap-8 p-6 shadow-2xl  bg-white rounded-lg  h-fit '>
                  <div className=' col-span-1 flex flex-col gap-3 h-fit'>
                      <div className=' text-blue-800 font-bold text-3xl py-3'>
                          Room For {data.sellOrRent} with pool - {data.regularPrice}$/month
                      </div>

                      <div className='flex justify-between gap-2 text-xl font-bold   flex-row overflow-hidden '>
                          <span> <MdLocationOn color="green"  size="1.5rem"/></span>
                      <span className=' w-[100%] text-gray-500 line-clamp-2'>{data.address} </span>
                    </div>

                    <div className=' flex flex-row gap-3 flex-wrap'>
                    <div className='flex justify-between gap-2 text-xl w-[200px] h-fit bg-red-800 py-3
                      text-white  px-20 font-bold  uppercase flex-row overflow-hidden rounded-lg my-3 '>
                        {data.sellOrRent}
                    </div>

                    
                    { String(data.discount) !== String("0") && <div className='flex flex-row justify-center text-center items-center
                      gap-2 text-xl bg-green-800 py-3 h-fit
                      text-white  px-10 font-bold  w-[300px] uppercase overflow-hidden rounded-lg my-3 '>
                        {data.discount} $discount
                    </div>}

                    </div>


                    <div className='flex justify-between gap-2 text-xl  text-black flex-row overflow-hidden '>
                      <span className=' w-[100%]  line-clamp-6 '> <span className=' font-bold '>Description</span> : 
                        {data.description}
                      </span>
                    </div>  


                    
                    <div className='flex justify-between gap-2 text-xl py-4 font-bold flex-row overflow-hidden '>
                          <span> <FaBed color="black"  size="1.5rem"/></span>
                      <span className=' w-[100%] text-gray-500'>{data.beds} Beds  </span>

                      <span> <FaBath color="black"  size="1.5rem"/></span>
                      <span className=' w-[100%] text-gray-500'>{data.baths} Baths  </span>


                      <span> <FaParking color="black"  size="1.5rem"/></span>
                      {data.parkingSpot && <span className=' w-[100%] text-gray-500'>Parking Spot  </span>}

                      <span> <FaChair color="black"  size="1.5rem"/></span>
                      {data.furnished && <span className=' w-[100%] text-gray-500'>Furnished  </span>}
                    </div>



                      <div className=' font-medium text-gray-500  text-xl'> Contact {data.name} for the family home in central!</div>
                    <TextAreaInput name='message' placeholder='Message' className=' border-[2px] border-gray-300 p-4
                     rounded-xl text-xl font-medium
                     '/>
                     <ButtonSubmit name='Send Message'/>

                  </div>

                  <div className='col-span-1 h-[500px] w-[100%] lg:w-[100%] lg:h-[100%]'>
                      <MapComponent/>
                  </div>


              </div>
            
            </div>
          </Form>
      </Formik>
      :
      <Spinner/> 
    }
    </>
  )
}

export default ListingsPage
