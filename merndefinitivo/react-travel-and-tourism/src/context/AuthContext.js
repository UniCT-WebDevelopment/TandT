import { useReducer,useEffect } from "react";
import { createContext } from "react";
import AuthReducer from "./AuthReducer";
const FINAL_STATE ={
    user: null,
    isFecthing:false,
    error:false
    
};
const INITIAL_STATE = {
    user:JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
  };
export const FinalContex = createContext(FINAL_STATE); 
export const FinalContexProvider = ({children})=>{
    const [state,dispatch] = useReducer(AuthReducer,FINAL_STATE);
    useEffect(()=>{
        localStorage.setItem("user",null)
    } ,[state.user])
    return(
        <AuthContex.Provider 
        value={{
            user:null,
            isFecthing:false,
            error:false,
            dispatch ,
        }}
        >
        {children}
        </AuthContex.Provider>
    )
}
export const AuthContex = createContext(INITIAL_STATE);
export const  AuthContexProvider = ({children}) =>{
    const [state,dispatch] = useReducer(AuthReducer,INITIAL_STATE);
    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user))
      },[state.user])
    return(
        <AuthContex.Provider 
        value={{
            user:state.user,
            isFecthing:state.isFecthing,
            error:state.error,
            dispatch ,
        }}
        >
        {children}
        </AuthContex.Provider>
    )
}
