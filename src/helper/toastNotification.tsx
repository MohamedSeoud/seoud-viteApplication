import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tostifyVariables } from './enum/tostifyVariables';


function toastNotification({text,choice}:{text:string,choice:string}) {
    console.log('Here!')
  return (
    <>
    {
        choice===tostifyVariables.error?
        toast.error(text, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            })
            :choice===tostifyVariables.success?
        toast.success(text, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            })
            :        
        toast.info(text, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            })
    }
    
    </>
  )
}

export default   toastNotification
