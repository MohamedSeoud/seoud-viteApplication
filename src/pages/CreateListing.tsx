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
import { FireBaseSaveImage, FirebaseAddData } from '../firebase/Firebase'
import { useNavigate } from 'react-router'
import { PROFILE_PATH } from '../helper/enum/navigationPath'




function CreateListing() {
  const location =false;
  const navigate = useNavigate();

    const intialValues:SellOrRentModel = {
        sellOrRent:"",
        name:"",
        beds:1,
        baths:1,
        parkingSpot:null,
        furnished:null,
        address:"",
        description:"",
        offer:null,
        regularPrice:1,
        image: {} as File,
        discount: 1,
        latitude:0,
        longitude:0,
        imgUrl:"",
        timeStamp:""
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
        const value = auth.currentUser?.uid && await FirebaseAddData({...values,userRef:auth.currentUser?.uid,imgUrl:imgUrl!,
          timeStamp:(new Date()).toString()});
        value && navigate(PROFILE_PATH);
    }
  return (
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
          <ImageInput name='image' setFieldValue={setFieldValue}/>
          <ButtonSubmit name='Create Listing'/>

          </div>
            
        </Form>
    )}
    </Formik>
      
    </div>
  )
}

export default CreateListing
