import image from '../assets/spinner.svg';

function Spinner() {
  return (
    <div className='w-screen h-screen flex fixed bg-green-100 opacity-50 z-50  justify-center items-center text-center'>
      <img className=' w-20 h-20'  src={image} alt='Loading.....'/>
    </div>
  )
}

export default Spinner
