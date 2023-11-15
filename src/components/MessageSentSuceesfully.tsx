import Swal from "sweetalert2";

function MessageSentSuceesfully() {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Message Sent Successfully',
        showConfirmButton: false,
        timer: 1500
      })

}

export default MessageSentSuceesfully
