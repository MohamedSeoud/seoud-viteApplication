import image from '../assets/20944201.jpg'
import {  useNavigate } from 'react-router-dom';
import { FORGET_PASSWORD_PATH, HOME_PATH, SING_UP_PATH } from '../helper/enum/navigationPath';
import { Form, Formik } from 'formik';
import * as Yup from "yup"
import { SignInFormModel } from '../helper/types';
import { FirebaseSignIn } from '../firebase/Firebase';
import OAuthentication from '../UI/OAuthentication';
import InputField from '../UI/InputField';
import ButtonSubmit from '../UI/ButtonSubmit';
import PasswordInput from '../UI/PasswordInput';
import OptionPart from '../UI/OptionPart';
import ORPart from '../UI/ORPart';


function Signin() {
  const navigate=useNavigate();
  const initialValues = {
    email:"",
    password:""
  }

  const onSubmit =async(values:SignInFormModel,{resetForm}:{resetForm:()=>void})=>{
    console.log(values)
    const value =await FirebaseSignIn(values);
    if(value){
      resetForm();
      navigate(HOME_PATH)
    }
    return;
  }

  const validationSchema= Yup.object({
    email:Yup.string().required('Required').email('Email not valid'),
    password:Yup.string().required('Required')
  })


  return (
    <div className=' flex flex-col gap-5  h-fit py-28 w-[100%] px-[30px] overflow-hidden bg-green-100'>
      <div className=' uppercase text-black text-center w-[100%]  overflow-hidden text-5xl font-bold'>
        sing in
      </div>
      <div className=' grid grid-cols-2 max-md:grid-cols-1 gap-5 w-[100%]  my-7  overflow-hidden '>

        <div className='w-[100%] col-span-1 mx-4  overflow-hidden  '>
          <img src={image} className='rounded-[20px] h-[500px] w-[90%] '/>
        </div>
       <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}
       validateOnChange={false}
       validateOnBlur={false}
       >
        <Form className='flex flex-col col-span-1 py-5 w-[100%]  overflow-hidden gap-y-6'>
            <InputField name='email' placeholder='Email address'/>
            <PasswordInput/>
            <OptionPart name1={`Don't have an account?`} name2='Forgot Password?' path1={SING_UP_PATH} path2={FORGET_PASSWORD_PATH} option1='Register'/>
            <ButtonSubmit name='Sign in' />
            <ORPart/>
            <OAuthentication/>
          </Form>
        </Formik>

        <div>

        </div>

      </div>

      
    </div>
  )
}

export default Signin
