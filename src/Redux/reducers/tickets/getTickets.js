import ticketsActionsTypes from "../../actionsTypes/tickets";

const getTickets = (state, {type, payload}) => {
    switch(type){
        case ticketsActionsTypes.GET_TICKETS_REQUEST:
            return {
                ...state,
                tickets: {
                    ...state.tickets,
                    loading: true,
                    error: null
                }
            }
        case ticketsActionsTypes.GET_TICKETS_SUCCESS:
            return {
                ...state,
                tickets: {
                    ...state.tickets,
                    loading: false,
                    data: payload,
                    error: null
                }
            }

        case ticketsActionsTypes.GET_TICKETS_ERROR:
            return {
                ...state,
                tickets: {
                    ...state.tickets,
                    loading: false,
                    error: payload
                }
            }
    }
};

export default getTickets;