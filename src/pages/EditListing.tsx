import { SellOrRentModel } from '../helper/types'
import * as Yup from "yup"
import { Form, Formik } from 'formik'
import RadioButton from '../UI/RadioButton'
import InputField from '../UI/InputField'
import InputNumber from '../UI/InputNumber'
import TextAreaInput from '../UI/TextAreaInput';
import ImageInput from '../UI/ImageInput'
import ButtonSubmit from '../UI/ButtonSubmit'
import { getAuth } from 'firebase/auth'
import { tostifyVariables } from '../helper/enum/tostifyVariables'
import toastNotification from '../helper/toastNotification'
import { FireBaseSaveImage, FirebaseGetItemById, FirebaseUpdateData } from '../firebase/Firebase'
import { useNavigate, useParams } from 'react-router'
import { HOME_PATH, PROFILE_PATH } from '../helper/enum/navigationPath'
import { useEffect, useState } from 'react'
import { DocumentData } from 'firebase/firestore'
import Spinner from '../components/Spinner'




function EditListing() {
  const location =false;
  const navigate = useNavigate();
  const {id} = useParams();
  const [isLoading,setIsLoaging] = useState(false);
  const [data,setData] = useState<DocumentData>( {} as DocumentData);
  const auth = getAuth();


  
  useEffect(() => {
    const fetchData = async(id:string)=>{
        const item =await FirebaseGetItemById(id);
        setData (item.data());
        setIsLoaging(true);
        if(item.data().userRef !== auth.currentUser?.uid) {
            navigate(HOME_PATH);
            toastNotification({text:"You can't update this data",choice:tostifyVariables.error})
        } 
        console.log(item.data())
    }
    id && fetchData(id)
  })



    const intialValues:SellOrRentModel = {
        sellOrRent:data.sellOrRent,
        name:data.name,
        beds:data.beds,
        baths:data.baths,
        parkingSpot:data.parkingSpot,
        furnished:data.furnished,
        address:data.address,
        description:data.description,
        offer:data.offer,
        regularPrice:data.regularPrice,
        image: {} as File,
        discount: data.discount,
        latitude:data.latitude,
        longitude:data.longitude,
        imgUrl:data.imgUrl,
        timeStamp:data.timeStamp
    }
    const ValidationSchema = Yup.object({
        name:Yup.string().required('Required'),
        address:Yup.string().required('Required'),
        description:Yup.string().required('Required'),
        sellOrRent:Yup.string().required('Required'),
        beds:Yup.string().required('Required'),
        offer:Yup.boolean().required('Required'),
        regularPrice:Yup.number().required('Required'),
        discount:Yup.number().required('Required'),
        baths:Yup.string().required('Required'),
        parkingSpot:Yup.boolean().required('Required'),
        furnished:Yup.boolean().required('Required'),
        image:Yup.mixed().nonNullable().required('Required')

        
    })
    const onSubmit =async(values:SellOrRentModel)=>{
        const auth =getAuth()
        console.log(values);
        const { image } = values
        const imgUrl = image && await FireBaseSaveImage(image);
        toastNotification({text:`Image Successfully uploaded`,choice:tostifyVariables.success});
         delete values.image;
        const value = auth.currentUser?.uid && id && await FirebaseUpdateData({...values,userRef:auth.currentUser?.uid,imgUrl:imgUrl!,
          timeStamp:(new Date()).toString()},id);
        value && navigate(PROFILE_PATH);
    }
  return (
    <> { isLoading ?
    <div className=' flex flex-col gap-5 min-h-screen justify-center items-center   h-fit py-28 w-[100%]  md:px-[30px]
     overflow-hidden bg-green-100'>
    <div className=' uppercase text-black text-center w-[100%]  overflow-hidden text-5xl font-bold'>
      sing in
    </div>

    <Formik onSubmit={onSubmit} initialValues={intialValues} validationSchema={ValidationSchema}
     validateOnChange={false} validateOnBlur={false}>
    {({setFieldValue})=>(
        <Form className=' bg-green-100 py-9 md:px-36 px-8 w-[100%] max-w-[800px]'>
            <div className='flex flex-col gap-7 w-[100%] justify-center items-center text-center'>

          <RadioButton name='sellOrRent' title='sell / Rent' value1='sell' value2='rent' name2='sell' name3='rent' />
          <InputField name='name' placeholder='Name' label='name' />
          <InputNumber   name1='beds' name2='baths' title1='beds' title2='baths' />
          <RadioButton name='parkingSpot' title='parkingSpot' value1="true" value2="false" name2='yes' name3='no' />
          <RadioButton name='furnished' title='furnished' value1="true" value2="false" name2='yes' name3='no'  />
          <TextAreaInput name='address' placeholder='address' label='address' />
          { location ?
          <InputNumber   name1='latitude' name2='longitude' title1='latitude' title2='longitude' min2={-180} max2={180} min={-90} max={90}/>
          : null
          }
          <TextAreaInput name='description' placeholder='description' label='description' />
          <RadioButton name='offer' title='offer' value1="true" value2="false" name2='yes' name3='no'/>
          <InputNumber  name1='regularPrice' title1='Regular Price' option={true} />
          <InputNumber  name1='discount' title1='Discount price' option={true}  />
          <ImageInput name='image' setFieldValue={setFieldValue} src={data.imgUrl}/>
          <ButtonSubmit name='Update Listing'/>

          </div>
            
        </Form>
    )}
    </Formik>
      
    </div>
    :
    <Spinner/>
     }
     </>
  )
}

export default EditListing
