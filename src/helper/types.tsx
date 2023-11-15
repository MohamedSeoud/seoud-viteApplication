import { FieldValue } from "firebase/firestore";

export interface SignInFormModel{
    email: string;
    password: string;
}

export interface SignUpModel{
    name:string,
    email:string,
    password:string
}

export interface ForgotPasswordModel{
    email:string
}


export interface SignUpDbModel{
    name:string,
    email:string,
    password:string,
    timeStap:FieldValue
}

export interface ProfileModel{
    name:string,
    email:string,
}

export interface SellOrRentModel{
    sellOrRent:string,
    name:string,
    beds:number,
    baths:number,
    parkingSpot:boolean|null,
    furnished:boolean|null,
    address:string,
    description:string,
    offer:boolean|null,
    regularPrice:number,
    image?:File,
    discount:number,
    latitude:number,
    longitude:number,
    imgUrl:string,
    timeStamp:string
}

export interface SellOrRent{
    sellOrRent:string,
    name:string,
    beds:number,
    baths:number,
    parkingSpot:boolean|null,
    furnished:boolean|null,
    address:string,
    description:string,
    offer:boolean|null,
    regularPrice:number,
    discount:number,
    latitude:number,
    longitude:number,
    imgUrl:string,
    timeStamp:string,
    userRef:string
}

export interface FetchedData{
    data:SellOrRent
    id:string|null
}
export interface ListCardModel{
    id:string,
    address:string,
    baths:number
    beds:number
    description:string,
    imgUrl:string,
    regularPrice:number,
    timeStamp:string,
    onDeleteHandler?:()=> void,
    onEditHandler?:()=>void
}

export interface SwalAlertType{
    message1:string,
    warning1:string,
    type1:string,
    warning3?:string,
    type2?:string,
    warning2?:string,
    type3?:string,
    message2?:string,
    message3?:string,
}