// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {DocumentData, addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, limit, orderBy, query,
   serverTimestamp, setDoc, updateDoc, where} from 'firebase/firestore'
import {createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { ForgotPasswordModel, SellOrRent,  SignInFormModel, SignUpDbModel, SignUpModel } from '../helper/types';
import toastNotification from "../helper/toastNotification";
import { tostifyVariables } from "../helper/enum/tostifyVariables";
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOCxWtzMh-Y2_bV5g2UeStmZuW5H5TkEU",
  authDomain: "seoud-building-clone.firebaseapp.com",
  projectId: "seoud-building-clone",
  storageBucket: "seoud-building-clone.appspot.com",
  messagingSenderId: "521863304942",
  appId: "1:521863304942:web:a218acc0cd4cd7680105ff"
};

// Initialize Firebase
initializeApp(firebaseConfig);
 export const db = getFirestore();

export  async function FirebaseSignUp(fromData:SignUpModel) {

    try{
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth,fromData.email,fromData.password);
        const user = userCredential.user 
        auth.currentUser && updateProfile(auth.currentUser,{
          displayName:fromData.name
        })
        const formDataCopy:SignUpDbModel = {name:fromData.name,email:fromData.email,password:fromData.password, timeStap :serverTimestamp()}
        console.log(formDataCopy)
        await setDoc(doc(db,"users",user.uid),formDataCopy)
        
        return true
    }
    catch(err){
        console.log(err)
        toastNotification({text:"Something Went wrong with Registeration",choice:tostifyVariables.error})
        return false
    }
}

export async function FirebaseSignIn (formData:SignInFormModel){
  try{
  const auth = getAuth()
  const crendentials = await signInWithEmailAndPassword(auth,formData.email,formData.password);
  if(crendentials.user){
    return true
  }
  toastNotification({text:"Something is wrong with credentials",choice:tostifyVariables.error})
  return false
  }
  catch(err){
    console.log(err)
    toastNotification({text:"Email or Password is wrong",choice:tostifyVariables.error})
    return false
  }
  
}

export async function FirebaseForgetPassword (formData:ForgotPasswordModel){
  try{
    const auth = getAuth();
    await sendPasswordResetEmail(auth,formData.email);
    toastNotification({text:"Email was sent Successfully!",choice:tostifyVariables.success})
  }
  catch(err){
    console.log(err)
    toastNotification({text:"Something went wrong with the Email",choice:tostifyVariables.error})
    return false
  }

}

export async function FirebaseLogout (){
  try{
    const auth = getAuth();
    await auth.signOut();
    toastNotification({text:"Successfully Logged out",choice:tostifyVariables.success})
  }
  catch(err){
    console.log(err)
    toastNotification({text:"Something went wrong with Logging out",choice:tostifyVariables.error})
    return false
  }

}

export async function FirebaseEditEmail (formData:{name:string}){
  try{
    const auth = getAuth();

      auth.currentUser && await updateProfile(auth.currentUser, {
        displayName:formData.name
      })

      auth?.currentUser?.uid && await updateDoc(doc(db,"users",auth.currentUser.uid),{
        name:name
      })
      toastNotification({text:"Successfully Updated!",choice:tostifyVariables.success});
      return true
  }
  catch(err){
    console.log(err)
    toastNotification({text:"Something went wrong with the Updating",choice:tostifyVariables.error})
    return false
  }
  return false;

}

export async function FirebaseAddData (formData:SellOrRent){
  try{

    
     await addDoc(collection(db,"listings"),formData)

      toastNotification({text:"Successfully Added!",choice:tostifyVariables.success});
      return true
  }
  catch(err){
    console.log(err)
    toastNotification({text:"Something went wrong with the Adding",choice:tostifyVariables.error})
    return false
  }

}

export async function FirebaseFetchData():Promise<DocumentData[]> {
  try{

    const auth = getAuth();
    const{currentUser}=auth;
    const listingRef = collection(db,"listings");
    const q =  query(listingRef,
    where("userRef","==",currentUser?.uid )
    )
    const querySnap = await getDocs(q);
    const listings:DocumentData[] =[];
    querySnap.forEach((doc)=>{
      return listings.push({
        id:doc.id,
        data:doc.data() 
      })
    })

      return listings
  }
  catch(err){
    console.log('ssssss',err)
    toastNotification({text:"Something went wrong with getting data",choice:tostifyVariables.error})
    return [] as DocumentData[]
  }

}

export async function FireBaseSaveImage( image:File ){
  try{ 
  const auth = getAuth();
  const storage = getStorage();
  const fileName = `${auth.currentUser?.uid}-${image.name}`;
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, image);
   uploadTask.on('state_changed', 
(snapshot) => {
const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
console.log('Upload is ' + progress + '% done');
switch (snapshot.state) {
  case 'paused':
    console.log('Upload is paused');
    break;
  case 'running':
    console.log('Upload is running');
    break;
}
}, 
(error) => {
console.log("Handle unsuccessful uploads" ,error)
}, 
 async():Promise<string> => {
return await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  console.log('File available at', downloadURL);
   return downloadURL
});
}
);

return await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
console.log('File available at', downloadURL);
return downloadURL
});
  }
  catch(err){
    console.log(err)
    toastNotification({text:"Something went wrong with the Updating",choice:tostifyVariables.error})
  }

}

export  function FirebaseDeleteItem(listingId:string) {
 return async()=> { try{
    await deleteDoc(doc(db,"listings",listingId));
    return true
  }
  catch(err){
    console.log('ssssss',err)
    toastNotification({text:"Something went wrong with getting data",choice:tostifyVariables.error})
    return false

  }
}

}

export async function FirebaseGetItemById(listingId:string):Promise<DocumentData> {
   try{
     const item = await getDoc(doc(db,"listings",listingId));
     return item
   }
   catch(err){
     console.log(err)
     toastNotification({text:"Something went wrong with getting data",choice:tostifyVariables.error})
     return {} as DocumentData

   }

 
}

 export async function FirebaseUpdateData (formData:SellOrRent,id:string){
  try{    
     await updateDoc(doc(db,"listings",id),{...formData})
      toastNotification({text:"Successfully Updated!",choice:tostifyVariables.success});
      return true
  }
  catch(err){
    console.log('ssssss',err)
    toastNotification({text:"Something went wrong with the Updating",choice:tostifyVariables.error})
    return false
  }

}

export async function FirebaseGetEmail(userRef:string):Promise<DocumentData> {
  try{
    const item = await getDoc(doc(db,"users",userRef));
    return item
  }
  catch(err){
    console.log(err)
    toastNotification({text:"Something went wrong with getting data",choice:tostifyVariables.error})
    return {} as DocumentData

  }


}

export async function FirebaseFetchAllData(dataNo:number,condition?:string):Promise<DocumentData[]> {
  try{
    const listingRef = collection(db,"listings");

    const q = (condition===undefined)? query(listingRef,orderBy("timeStamp","desc"),limit(dataNo))
    : (condition==="offer")? query(listingRef,where("offer","==","true"),orderBy("timeStamp","desc"),limit(dataNo)) :
      (condition==="sell")? query(listingRef,where("sellOrRent","==","sell"),orderBy("timeStamp","desc"),limit(dataNo)):
      (condition==="rent")? query(listingRef,where("sellOrRent","==","rent"),orderBy("timeStamp","desc"),limit(dataNo)):
      query(listingRef,orderBy("timeStamp","desc"),limit(dataNo));

    const querySnap = await getDocs(q);
    const listings:DocumentData[] =[];
    querySnap.forEach((doc)=>{
      return listings.push({
        id:doc.id,
        data:doc.data() 
      })
    })

      return listings
  }
  catch(err){
    console.log(err)
    toastNotification({text:"Something went wrong with getting data",choice:tostifyVariables.error})
    return [] as DocumentData[]
  }

}

