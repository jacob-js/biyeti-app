import axios from "axios";
import { eventsActionsTypes } from "../actionsTypes/events"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const getEvents = (categId, offset=1, limit=5) => async(dispatch) =>{
    dispatch({
        type: eventsActionsTypes.GET_EVENTS_REQUEST
    });
    try {
        const url = categId ? `/api/v1/events/?category_id=${categId}&p=${offset}&p_size=${limit}`:
        `/api/v1/events?p=${offset}&p_size=${limit}`;
        const res = await axios.get(url);
        if(res.status === 200){
            dispatch({
                type: eventsActionsTypes.GET_EVENTS_SUCCESS,
                payload: res.data.data
            });
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: eventsActionsTypes.GET_EVENTS_ERROR,
                payload: res.data?.error || res.data
            })
        }else{
            dispatch({
                type: eventsActionsTypes.GET_EVENTS_ERROR,
                payload: 'Echec de chargement'
            })
        }
    }
};

export const clearEventsState = (dispatch) =>{
    dispatch({ type: eventsActionsTypes.DESTROY_EVENTS_STATE });
}

export const createEventAction = (data) => async(dispatch, navigation) =>{
    dispatch({
        type: eventsActionsTypes.CREATE_EVENT_REQUEST
    });
    const token = await AsyncStorage.getItem('auth_token');
    try {
        const res = await axios.post('https://bookitbackend.herokuapp.com/api/v1/events/', data, {
            headers: {
                'authtoken': token,
            }
        });
        if(res.status === 201){
            dispatch({
                type: eventsActionsTypes.CREATE_EVENT_SUCCESS,
                payload: res.data.data
            })
            navigation.navigate('DashboardEvents');
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: eventsActionsTypes.CREATE_EVENT_ERROR,
                payload: res.data?.error || res.data
            })
        }else{
            dispatch({
                type: eventsActionsTypes.CREATE_EVENT_ERROR,
                payload: 'Echec de chargement'
            })
        }
        console.log(res.data)
    }
};

export const getCategorys = async (dispatch) =>{
    dispatch({
        type: eventsActionsTypes.GET_CATEGORYS_REQUEST
    });
    try {
        const res = await axios.get(`/api/v1/events/categorys`);
        if(res.status === 200){
            dispatch({
                type: eventsActionsTypes.GET_CATEGORYS_SUCCESS,
                payload: res.data.data
            })
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: eventsActionsTypes.GET_CATEGORYS_ERROR,
                payload: res.data?.error || res.data
            })
        }else{
            dispatch({
                type: eventsActionsTypes.GET_CATEGORYS_ERROR,
                payload: 'Echec de chargement'
            })
        }
    }
};

export const getEvent = (id) => async(dispatch) =>{
    dispatch({
        type: eventsActionsTypes.GET_EVENT_REQUEST
    });
    try {
        const res = await axios.get(`/api/v1/events/id/${id}`);
        if(res.status === 200){
            dispatch({
                type: eventsActionsTypes.GET_EVENT_SUCCESS,
                payload: res.data.data
            })
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: eventsActionsTypes.GET_EVENT_ERROR,
                payload: res.data?.error || res.data
            })
        }else{
            dispatch({
                type: eventsActionsTypes.GET_EVENT_ERROR,
                payload: 'Echec de chargement'
            })
        }
    }
}