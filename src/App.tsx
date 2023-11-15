
import { BrowserRouter} from 'react-router-dom'
import AuthRoutes from './routes/AuthRoutes'
import UnAuthRoutes from './routes/UnAuthRoutes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <BrowserRouter>
        <AuthRoutes/>
        <UnAuthRoutes/>
        <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />    
     </BrowserRouter>
  )
}

export default App
