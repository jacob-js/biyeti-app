import axios from "axios";
import ticketsActionsTypes from "../actionsTypes/tickets";

export const getTicketsAction = (eventId) => async(dispatch) =>{
    dispatch({
        type: ticketsActionsTypes.GET_TICKETS_REQUEST
    });
    try {
        const res = await axios.get(`/api/v1/tickets/event/${eventId}`);
        if(res.status === 200){
            dispatch({
                type: ticketsActionsTypes.GET_TICKETS_SUCCESS,
                payload: res.data.data
            })
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: ticketsActionsTypes.GET_TICKETS_ERROR,
                payload: res.data?.error || res.data
            })
        }else{
            dispatch({
                type: ticketsActionsTypes.GET_TICKETS_ERROR,
                payload: 'Echec de chargement'
            })
        }
    }
}