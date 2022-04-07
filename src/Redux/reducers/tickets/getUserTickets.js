import ticketsActionsTypes from "../../actionsTypes/tickets";

const getUserTickets = (state, {type, payload}) =>{
    switch (type) {
        case ticketsActionsTypes.GET_USER_TICKETS_START:
            return{
                ...state,
                userTickets: {
                    ...state.userTickets,
                    loading: true,
                    error: null
                }
            }

        case ticketsActionsTypes.GET_USER_TICKETS_SUCCESS:
            return{
                ...state,
                userTickets: {
                    ...state.userTickets,
                    loading: false,
                    error: null,
                    data: payload
                }
            }

        case ticketsActionsTypes.GET_USER_TICKETS_ERROR:
            return{
                ...state,
                userTickets: {
                    ...state.userTickets,
                    loading: false,
                    error: payload
                }
            }
    
        default:
            break;
    }
};

export default getUserTickets;