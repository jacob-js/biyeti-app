import ticketsActionsTypes from "../../actionsTypes/tickets";

const createTicket = (state, {type, payload}) =>{
    switch(type){
        case ticketsActionsTypes.CREATE_TICKET_REQUEST:
            return {
                ...state,
                createTicket: {
                    ...state.createTicket,
                    loading: true,
                    error: null
                }
            }
        case ticketsActionsTypes.CREATE_TICKET_SUCCESS:
            return {
                ...state,
                createTicket: {
                    ...state.createTicket,
                    loading: false,
                    data: payload,
                    error: null
                }
            }
        case ticketsActionsTypes.CREATE_TICKET_ERROR:
            return {
                ...state,
                createTicket: {
                    ...state.createTicket,
                    loading: false,
                    error: payload
                }
            }
    }
};

export default createTicket;