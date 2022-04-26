import ticketsActionsTypes from "../../actionsTypes/tickets";

const getPurchases = (state, {type, payload}) =>{
    switch (type) {
        case ticketsActionsTypes.GET_PURCHASES_REQUEST:
            return {
                ...state,
                purchases: {
                    ...state.purchases,
                    loading: true,
                    error: null
                }
            }

        case ticketsActionsTypes.GET_PURCHASES_SUCCESS:
            return {
                ...state,
                purchases: {
                    ...state.purchases,
                    loading: false,
                    data: payload,
                    rows: payload.rows,
                    count: payload.count
                }
            }

        case ticketsActionsTypes.GET_PURCHASES_ERROR:
            return {
                ...state,
                purchases: {
                    ...state.purchases,
                    loading: false,
                    error: payload
                }
            }
    
        default:
            break;
    }
};

export default getPurchases;