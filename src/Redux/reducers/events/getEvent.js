import { eventsActionsTypes } from "../../actionsTypes/events";

const getEvent = (state, {type, payload}) =>{
    switch (type) {
        case eventsActionsTypes.GET_EVENT_REQUEST:
            return{
                ...state,
                event: {
                    ...state.event,
                    loading: true,
                    error: null
                }
            }
            
        case eventsActionsTypes.GET_EVENT_SUCCESS:
            return{
                ...state,
                event: {
                    ...state.event,
                    loading: false,
                    error: null,
                    data: payload
                }
            }

        case eventsActionsTypes.GET_EVENT_ERROR:
            return{
                ...state,
                event: {
                    ...state.event,
                    loading: false,
                    error: payload
                }
            }
    
        default:
            break;
    }
};

export default getEvent;