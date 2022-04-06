import ticketsActionsTypes from "../../actionsTypes/tickets";

const purchase = (state, {type, payload}) => {
    switch (type) {
        case ticketsActionsTypes.PURCHASE_TICKET_START:
            return{
                ...state,
                purchase: {
                    ...state.purchase,
                    loading: true,
                    error: null
                }
            }

        case ticketsActionsTypes.PURCHASE_TICKET_SUCCESS:
            return{
                ...state,
                purchase: {
                    ...state.purchase,
                    loading: false,
                    error: null,
                    ...payload
                }
            }
        
        case ticketsActionsTypes.PURCHASE_TICKET_ERROR:
            return{
                ...state,
                purchase: {
                    ...state.purchase,
                    loading: false,
                    error: payload
                }
            }
    
        default:
            break;
    }
};

export default purchase;