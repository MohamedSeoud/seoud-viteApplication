import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react"

export function useAuthStatus() {
    const[logging,setLogging]=useState(false);
    const[checkingStatus,setCheckingStatus]=useState(true);

    useEffect(()=>{
        const auth=getAuth();
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setLogging(true)
                console.log(user)
            }else{
                setLogging(false)
            }
            setCheckingStatus(false);
        })
    },[])

  return { logging , checkingStatus}
}
