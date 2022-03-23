import { eventsActionsTypes } from "../../actionsTypes/events";

const createEvent = (state, {type, payload}) =>{
    switch (type) {
        case eventsActionsTypes.CREATE_EVENT_REQUEST:
            return{
                ...state,
                createEvent: {
                    ...state.createEvent,
                    loading: true,
                    error: null
                }
            }
            
        case eventsActionsTypes.CREATE_EVENT_SUCCESS:
            return{
                ...state,
                createEvent: {
                    ...state.createEvent,
                    loading: false,
                    error: null,
                    data: payload
                }
            }

        case eventsActionsTypes.CREATE_EVENT_ERROR:
            return{
                ...state,
                createEvent: {
                    ...state.createEvent,
                    loading: false,
                    error: payload
                }
            }

        default:
            break;
    }
};

export default createEvent;