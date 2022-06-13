import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { Toast } from "native-base"
import { showToast } from "../../Utils/feedbacks"
import { authActionsTypes } from "../actionsTypes/auth"

export const loginAction = (data) => async (dispatch, navigation) => {
    dispatch({
        type: authActionsTypes.LOGIN_REQUEST
    })
    try {
        const res = await axios.post(`/api/v1/users/login`, data)
        if(res.status === 200){
            await AsyncStorage.setItem('auth_token', res.data?.data.token)
            dispatch({
                type: authActionsTypes.LOGIN_SUCCESS,
                payload: res.data.data?.user
            });
            axios.defaults.headers.common['authtoken'] = res.data?.data.token
            navigation.navigate('Drawer');
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
        const res = await axios.post(`/api/v1/users/register`, data)
        if(res.status === 202){
            dispatch({
                type: authActionsTypes.REGISTER_SUCCESS,
                payload: res.data.data?.user
            })
            navigation.navigate('Verify', { token: res.data?.data.token, callback: 'signup' })
        }
    } catch (error) {
        const res = error.response;
        console.log(error);
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
};

export const validateAndCreateUser = (data, navigation) => async (dispatch) => {
    dispatch({
        type: authActionsTypes.CREATE_USER_START
    });
    try {
        const res = await axios.post(`/api/v1/users/validate-new-user`, {code: data.code}, {
            headers: {
                'signuptoken': data.token
            }
        });
        await AsyncStorage.setItem('auth_token', res.data?.data.token);
        axios.defaults.headers.common['authtoken'] = res.data?.data.token
        dispatch({
            type: authActionsTypes.CREATE_USER_SUCCESS,
            payload: res.data.data?.user
        });
        showToast('Inscription réussie', 'success');
        navigation.navigate('Drawer');
    } catch (error) {
        const res = error.response;
        dispatch({
            type: authActionsTypes.CREATE_USER_FAILURE,
            payload: res.data.error || error.message
        })
    }
}

export const getCurrentUser = async (dispatch, navigation) => {
    dispatch({
        type: authActionsTypes.GET_CURRENT_USER_REQUEST
    })
    const token = await AsyncStorage.getItem('auth_token')
    try {
        const res = await axios.get(`/api/v1/users/profile`, {
            headers: {
                'authtoken': token
            }
        })
        if(res.status === 200){
            axios.defaults.headers.common['authtoken'] = token
            dispatch({
                type: authActionsTypes.GET_CURRENT_USER_SUCCESS,
                payload: res.data.data
            })
            navigation?.navigate('Drawer');
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: authActionsTypes.GET_CURRENT_USER_FAILURE,
                payload: res.data.error || res.data
            })
        }else{
            dispatch({
                type: authActionsTypes.GET_CURRENT_USER_FAILURE,
                payload: 'Erreur de chargement, veuillez réessayer'
            })
        }
    }
};

export const logoutAction = async (dispatch, navigation) => {
    await AsyncStorage.removeItem('auth_token')
    dispatch({
        type: authActionsTypes.LOGOUT
    });
    axios.defaults.headers.common['authtoken'] = null
    navigation.navigate('Login');
}

export const updateProfileAction = (data) => async (dispatch, navigation) => {
    dispatch({
        type: authActionsTypes.UPDATE_PROFILE_REQUEST
    })
    try {
        const res = await axios.put(`/api/v1/users/profile`, data)
        if(res.status === 200){
            dispatch({
                type: authActionsTypes.UPDATE_PROFILE_SUCCESS,
                payload: res.data.data
            });
            showToast('Profil mis à jour avec succès', 'success')
            navigation.goBack();
        }
    } catch (error) {
        const res = error.response;
        dispatch({
            type: authActionsTypes.UPDATE_PROFILE_FAILURE,
            payload: res.data.error || 'Erreur de chargement, veuillez réessayer'
        })
    }
}