import image from '../assets/20944201.jpg'
import {  SING_IN_PATH, SING_UP_PATH } from '../helper/enum/navigationPath';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { ForgotPasswordModel } from '../helper/types';
import OAuthentication from '../UI/OAuthentication';
import { FirebaseForgetPassword } from '../firebase/Firebase';
import InputField from '../UI/InputField';
import ButtonSubmit from '../UI/ButtonSubmit';
import ORPart from '../UI/ORPart';
import OptionPart from '../UI/OptionPart';



function ForgetPassword() {

  const onSubmit=(values:ForgotPasswordModel)=>{
    console.log(values)
    FirebaseForgetPassword(values);
  }

  const validationSchema= Yup.object({
    email:Yup.string().required('Required').email('Email Not Valid')
  });

  const intialValues = {
    email:''
  }
  return (
    <div className=' flex flex-col gap-5  h-fit py-28 w-[100%] px-[30px] overflow-hidden bg-green-100'>
      <div className=' uppercase text-black text-center w-[100%]  overflow-hidden text-5xl font-bold'>
        forgot the password
      </div>
      <div className=' grid grid-cols-2 max-md:grid-cols-1 gap-5 w-[100%]  my-7  overflow-hidden '>

        <div className='w-[100%] col-span-1 mx-4  overflow-hidden  '>
          <img src={image} className='rounded-[20px] h-[500px] w-[90%] '/>

        </div>
 
      <Formik onSubmit={onSubmit} initialValues={intialValues} validationSchema={validationSchema}
       validateOnBlur={false} validateOnChange={false}>
        <Form className='flex flex-col col-span-1 py-5 w-[100%]  justify-center  overflow-hidden gap-y-6'>
            <InputField name='email' placeholder='Email address'/> 
            <OptionPart name1={`Don't have an account?`} name2='Sign in instead?' path1={SING_UP_PATH} path2={SING_IN_PATH} option1='Register'/>
           <ButtonSubmit name=' send rest password ' />
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

export default ForgetPassword
