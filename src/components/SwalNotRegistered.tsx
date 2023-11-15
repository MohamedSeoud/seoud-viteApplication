import Swal from "sweetalert2";



 function SwalNotRegistered(){
    Swal.fire(
        'You Have To Registered to be able to send a message',
        'you will be redirect to sign in page',
        'question'
    )
}

export default SwalNotRegistered