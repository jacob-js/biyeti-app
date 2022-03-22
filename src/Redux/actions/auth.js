import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { authActionsTypes } from "../actionsTypes/auth"

const baseUrl = 'https://bookitbackend.herokuapp.com'
export const loginAction = (data) => async (dispatch, navigation) => {
    dispatch({
        type: authActionsTypes.LOGIN_REQUEST
    })
    try {
        const res = await axios.post(`${baseUrl}/api/v1/users/login`, data)
        if(res.status === 200){
            await AsyncStorage.setItem('auth_token', res.data?.data.token)
            navigation.navigate('Drawer');
            dispatch({
                type: authActionsTypes.LOGIN_SUCCESS,
                payload: res.data.data?.user
            })
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: authActionsTypes.LOGIN_FAILURE,
                payload: res.data.error || res.data
            })
        }else{
            dispatch({
                type: authActionsTypes.LOGIN_FAILURE,
                payload: 'Erreur de chargement, veuillez réessayer'
            })
        }
    }
}


export const signupAction = (data) => async (dispatch, navigation) => {
    dispatch({
        type: authActionsTypes.REGISTER_REQUEST
    })
    try {
        const res = await axios.post(`${baseUrl}/api/v1/users/register`, data)
        if(res.status === 201){
            dispatch({
                type: authActionsTypes.REGISTER_SUCCESS,
                payload: res.data.data?.user
            })
            await AsyncStorage.setItem('auth_token', res.data?.data.token)
            navigation.navigate('Drawer')
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: authActionsTypes.REGISTER_FAILURE,
                payload: res.data.error || res.data
            })
        }else{
            dispatch({
                type: authActionsTypes.REGISTER_FAILURE,
                payload: 'Erreur de chargement, veuillez réessayer'
            })
        }
    }
}