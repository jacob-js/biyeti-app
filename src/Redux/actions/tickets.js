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
};

export const createTicketAction = (data) => async(dispatch, cb) =>{
    dispatch({
        type: ticketsActionsTypes.CREATE_TICKET_REQUEST
    });
    try {
        const res = await axios.post('/api/v1/tickets/', data);
        if(res.status === 201){
            dispatch({
                type: ticketsActionsTypes.CREATE_TICKET_SUCCESS,
                payload: res.data.data
            })
            cb(true);
            getTicketsAction(data.event)(dispatch);
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: ticketsActionsTypes.CREATE_TICKET_ERROR,
                payload: res.data?.error || res.data
            })
        }else{
            dispatch({
                type: ticketsActionsTypes.CREATE_TICKET_ERROR,
                payload: 'Echec de chargement'
            })
        }
    }
}

export const purchaseAction = (ticket) => async(dispatch, cb) =>{
    dispatch({ type: ticketsActionsTypes.PURCHASE_TICKET_START });
    try {
        const res = await axios.post(`/api/v1/tickets/buy`, {ticket: ticket.id});
        if(res.status === 201){
            dispatch({
                type: ticketsActionsTypes.PURCHASE_TICKET_SUCCESS,
                payload: {data: res.data.data, ticket}
            });
            cb(true)
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: ticketsActionsTypes.PURCHASE_TICKET_ERROR,
                payload: res.data?.error || res.data
            })
        }else{
            dispatch({
                type: ticketsActionsTypes.PURCHASE_TICKET_ERROR,
                payload: error.message || 'Echec de chargement'
            })
        }
    }
}

export const getUserTicketsAction = (userId) => async(dispatch) =>{
    dispatch({ type: ticketsActionsTypes.GET_USER_TICKETS_START });
    try {
        const res = await axios.get(`/api/v1/tickets/user/${userId}`);
        if(res.status === 200){
            dispatch({
                type: ticketsActionsTypes.GET_USER_TICKETS_SUCCESS,
                payload: res.data.data
            })
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: ticketsActionsTypes.GET_USER_TICKETS_ERROR,
                payload: res.data?.error || res.data
            })
        }else{
            dispatch({
                type: ticketsActionsTypes.GET_USER_TICKETS_ERROR,
                payload: error.message || 'Echec de chargement'
            })
        }
        console.log(error);
    }
}