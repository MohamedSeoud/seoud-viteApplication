import Profile from "../pages/Profile"
import MainLayout from "../components/layout/MainLayout"
import { useRoutes } from 'react-router-dom';
import {  CREATE_LISTING_PATH, EDIT_LISTING_PATH, LOAD_MORE_DATA_PATH, PROFILE_PATH} from "../helper/enum/navigationPath";
import CheckAuthRoute from "../components/CheckAuthRoute";
import CreateListing from "../pages/CreateListing";
import EditListing from "../pages/EditListing";
import LoadMoreData from "../pages/LoadMoreData";

export default function AuthRoutes() {
    const index = useRoutes([
        {
            path:'/',
            element:<CheckAuthRoute/>,
           children:[ 
           { path:"/",
            element:<MainLayout/>,
            children:[
                {
                    path:PROFILE_PATH,
                    element:<Profile/>
                },
                {
                    path:CREATE_LISTING_PATH,
                    element:<CreateListing/>
                },
                {
                    path:EDIT_LISTING_PATH+"/:id",
                    element:<EditListing/>
                },
                {
                    path:LOAD_MORE_DATA_PATH+"/:name",
                    element:<LoadMoreData/>
                }

            ]
        }
        ]},
      
    ]);
  return index;

}