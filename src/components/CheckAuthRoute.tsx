import { Navigate, Outlet } from 'react-router'
import { SING_IN_PATH } from '../helper/enum/navigationPath'
import {useAuthStatus} from '../hooks/useAuthStatus';
import Spinner from './Spinner';

function CheckAuthRoute() {
    const { logging , checkingStatus} = useAuthStatus();
    if(checkingStatus) return(<Spinner/>) 
  return ( <> { logging?<Outlet/>:<Navigate to={SING_IN_PATH}/> } </> )
}

export default CheckAuthRoute
