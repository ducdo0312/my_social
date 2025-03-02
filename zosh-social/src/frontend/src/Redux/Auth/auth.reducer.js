import { GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, LOGIN_FALURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FALURE, REGISTER_REQUEST, REGISTER_SUCCESS, UPDATE_PROFILE_FALURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "./auth.actionType";

const initialState={
    jwt:null,
    error:null,
    loading:false,
    user:null
}
export const authReducer=(state=initialState,action)=>{

    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case UPDATE_PROFILE_REQUEST:
            return {...state,loading:true, error:null}
        case GET_PROFILE_REQUEST:
            return {...state,loading:true, error:null}
        case GET_PROFILE_SUCCESS:
        case UPDATE_PROFILE_SUCCESS:
            return {...state,user:action.payload,error:null,loading:false}
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {...state,jwt:action.payload,loading:false,error:null}
        case UPDATE_PROFILE_FALURE:
        case LOGIN_FALURE:
        case REGISTER_FALURE:
            return {...state,loading:false,error:action.payload}
        default:
            return state;
    }
}