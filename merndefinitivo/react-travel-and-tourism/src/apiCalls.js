import axios from "axios";
export const loginCall = async (userCredential,dispatch)=>{
    dispatch({type:"LOGIN_START"});
    try {
        const res = await axios.post("auth/login",userCredential);
        dispatch({type:"LOGIN_SUCCESS",payload: res.data});
    } catch (error) {
        dispatch({type:"LOGIN_FAILURE",payload: error});
        alert("email o password errati");
        window.location.reload();
        
    }
}
export const logoutCall = async (dispatch)=>{
    dispatch({type:"LOGOUT"});
   
}