import image from '../assets/20944201.jpg'
import {  useNavigate } from 'react-router-dom';
import { FORGET_PASSWORD_PATH, HOME_PATH, SING_IN_PATH } from '../helper/enum/navigationPath';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { SignUpModel } from '../helper/types';
import { FirebaseSignUp } from '../firebase/Firebase';
import toastNotification from '../helper/toastNotification';
import { tostifyVariables } from '../helper/enum/tostifyVariables';
import OAuthentication from '../UI/OAuthentication';
import InputField from '../UI/InputField';
import ButtonSubmit from '../UI/ButtonSubmit';
import PasswordInput from '../UI/PasswordInput';
import OptionPart from '../UI/OptionPart';
import ORPart from '../UI/ORPart';


function Signup() 
{
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    name:Yup.string().required('Required'),
    email:Yup.string().required('Required').email('Email NotValid'),
    password:Yup.string().required('Required')
  })
  const initialValues:SignUpModel={
    name:'',
    email:'',
    password:''
  }
  const onSubmit = async (values:SignUpModel,{resetForm}:{resetForm:()=>void})=>{
   console.log(values)
   const value = await FirebaseSignUp(values);
   if(value)
   {
   resetForm();
   navigate(HOME_PATH);
   toastNotification({text:"Registered Successfully",choice:tostifyVariables.success})
   }
  }
  
  return (
    <div className=' flex flex-col gap-5  h-fit py-28 w-[100%] px-[30px] overflow-hidden bg-green-100'>
      <div className=' uppercase text-black text-center w-[100%]  overflow-hidden text-5xl font-bold'>
        Register
      </div>
      <div className=' grid grid-cols-2 max-md:grid-cols-1 gap-5 w-[100%]  my-7  overflow-hidden '>

        <div className='w-[100%] col-span-1 mx-4  overflow-hidden  '>
          <img src={image} className='rounded-[20px] h-[500px] w-[90%] '/>

        </div>
       <Formik initialValues={initialValues} onSubmit={onSubmit}  validationSchema={validationSchema}
       validateOnChange={false} validateOnBlur={false}  
       >
          <Form className='flex flex-col col-span-1 py-5 w-[100%]  overflow-hidden gap-y-6'>
            <InputField name='name' placeholder='Full Name'/>
            <InputField name='email' placeholder='Email address'/>
            <PasswordInput/>
            <OptionPart name1={`Have an account?`} name2='Forgot Password?' path1={SING_IN_PATH} path2={FORGET_PASSWORD_PATH} option1='Sign in'/>
            <ButtonSubmit name='sign up' />
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

export default Signup
