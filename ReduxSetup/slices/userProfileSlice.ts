import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface userAddress{
    country:string,
    city:string,
    postalCode:string,
    street:string,
}

interface userState{
    surname: string;
    clientId:string,
    username:string,
    imageUrl:string,
    email:string,
    phone:string,
    role:'Client' | 'Admin',
    loginStatus:boolean,

    address:userAddress
}

const initialState:userState = {
    clientId:"",
    username:"",
    surname:"",
    imageUrl:"",
    email:"",
    phone:"+38 111 111 11 11",
    role:"Client",
    loginStatus:false,

    address:{
        country:"Ukraine",
        city:"",
        postalCode:"",
        street:"",
    }
}

const userProfileSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setCurrentUser(state, action:PayloadAction<userState>){
            console.log("in user slice - ",action.payload);
                state.clientId = action.payload.clientId;
                state.username = action.payload.username;
                state.email = action.payload.email;
                state.phone = action.payload.phone;
                state.role = action.payload.role;
                state.loginStatus = action.payload.loginStatus;
                state.surname = action.payload.surname;
                state.address = action.payload.address;
                state.imageUrl = action.payload.imageUrl;
        },
        setUserAddress(state, action:PayloadAction<userAddress>){
            state.address.country = action.payload.country;
            state.address.city = action.payload.city;
            state.address.postalCode = action.payload.postalCode;
            state.address.street = action.payload.street;
        }
    }
})

export const {} = userProfileSlice.actions;
export default userProfileSlice.reducer;

export const {setCurrentUser, setUserAddress} = userProfileSlice.actions;

export const selectUserSlice = (state:RootState) => state.UserProfile