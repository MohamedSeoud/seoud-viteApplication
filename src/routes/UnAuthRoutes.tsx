import { useRoutes } from "react-router-dom";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import ForgetPassword from "../pages/ForgetPassword";
import { FORGET_PASSWORD_PATH, LISTING_PATH, OFFER_PATH, SING_IN_PATH, SING_UP_PATH } from "../helper/enum/navigationPath";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";
import Offers from "../pages/Offers";
import NotFoundPage from "../pages/NotFoundPage";
import ListingsPage from "../pages/ListingsPage";



export default function UnAuthRoutes(){
    const index = useRoutes([
    { path:'/',
        element:<MainLayout/>,
        children:[
        {
            path:'/',
            element: <Home/>
        },
        {
            path:'/home',
            element: <Home/>
        },
        {
            path:SING_IN_PATH ,
            element:<Signin/>
        },
        {
            path:SING_UP_PATH,
            element:<Signup/>
        },
        {
            path:FORGET_PASSWORD_PATH,
            element:<ForgetPassword/>
        },
        {
            path:OFFER_PATH,
            element:<Offers/>
        },
        {
            path:LISTING_PATH+"/:id",
            element:<ListingsPage/>
        },
        {
            path:'/*',
            element: <NotFoundPage/>,
        },
    ]
    }
    
    ]);
    return index
}
