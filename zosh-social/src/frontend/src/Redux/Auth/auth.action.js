import axios from "axios"
import { api, API_BASE_URL } from "../../config/api"
import { GET_PROFILE_FALURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, LOGIN_FALURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FALURE, REGISTER_REQUEST, REGISTER_SUCCESS, UPDATE_PROFILE_FALURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "./auth.actionType"

export const loginUserAction = (loginData) => async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/signin`,loginData)

        if(data.token){
            localStorage.setItem("jwt", data.token)
            
        }
        console.log("login successed", data)
        dispatch({type:LOGIN_SUCCESS,payload:data.jwt})
    } catch (error) {
        console.log("-----------",error)
        dispatch({type:LOGIN_FALURE,payload:error})
    }
}

export const registerUserAction = (registerData) => async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST})
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/signup`,registerData)
        console.log("Sending register data: ", registerData);
        if(data.token){
            localStorage.setItem("jwt", data.token)
            
        }
        console.log("register successed", data)
        dispatch({type:REGISTER_SUCCESS,payload:data.jwt})
    } catch (error) {
        console.log("-----------",error)
        dispatch({type:REGISTER_FALURE,payload:error})
    }
}

export const getProfileAction = (jwt) => async(dispatch)=>{
    dispatch({type:GET_PROFILE_REQUEST});
    try {
        const {data} = await axios.get(`${API_BASE_URL}/api/users/profile`, {headers:{
            Authorization: `Bearer ${jwt}`,
        },
    });

        console.log("profile successed", data)
        dispatch({type:GET_PROFILE_SUCCESS,payload:data})
    } catch (error) {
        console.log("-----------",error)
        dispatch({type:GET_PROFILE_FALURE,payload:error})
    }
}

export const updateProfileAction = (reqData, jwt) => async (dispatch) => {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    try {
        const { data } = await axios.put(
            `${API_BASE_URL}/api/users`, 
            reqData,  // ✅ Chỉ truyền `reqData`, không bọc thêm object khác
            {
                headers: { Authorization: `Bearer ${jwt}` },
            }
        );

        console.log("update profile successed", data);
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        console.log("-----------", error);
        dispatch({ type: UPDATE_PROFILE_FALURE, payload: error });
    }
};
