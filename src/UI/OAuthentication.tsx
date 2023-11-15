import { FcGoogle } from 'react-icons/fc'
import toastNotification from '../helper/toastNotification'
import { tostifyVariables } from '../helper/enum/tostifyVariables'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../firebase/Firebase'
import { useNavigate } from 'react-router'
import { HOME_PATH } from '../helper/enum/navigationPath'

function OAuthentication() {

    const navigate = useNavigate();
    const onContinueHandler = async()=>{
        try{
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth,provider);
            const user = result.user;
            const docRef= doc(db,"users",user.uid);
            const docSnap= await getDoc(docRef);
            if(!docSnap.exists()){
                await setDoc(docRef,{
                    name:user.displayName,
                    email:user.email,
                    password:user.displayName,
                    timeStap:serverTimestamp()
                })
            }
            toastNotification({text:"Successfully Registered!",choice:tostifyVariables.success});
            navigate(HOME_PATH);
        }
        catch{
            toastNotification({text:"Couldn't Continue With Google",choice:tostifyVariables.error})
        }

    }
  return (

    <div className='w-[100%] '>
    <button type='button' className=' uppercase hover:bg-red-400 text-2xl flex flex-row 
    justify-center items-center  px-3 h-14 bg-red-500 w-[100%] text-center text-white my-2 '
    onClick={onContinueHandler}
    >
      continue with google
      <span className=' bg-white mx-4 px-1 rounded-[40px]' >
      <FcGoogle size="2.5rem"  />
      </span>
      </button>
    </div>
  )
}

export default OAuthentication
