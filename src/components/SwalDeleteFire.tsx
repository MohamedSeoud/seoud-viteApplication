import Swal from "sweetalert2";





export async function SwalDeleteFire( deleteFun:()=>Promise<boolean>){
        Swal.fire({
            title: `'Are you sure?'`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                 deleteFun().then((response)=>{
                if(response){
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              ).then(()=> window.location.reload())
            
            }
              else{
              Swal.fire(
                'Faild!',
                `Your file hasn't been deleted.`,
                'error'
              )}
            });
              return true;
            }
            else{
                return false;
            }
          })
}