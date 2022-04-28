import { eventsActionsTypes } from "../../actionsTypes/events";

const deleteEvent = (state, {type, payload}) =>{
    switch (type) {
        case eventsActionsTypes.DELETE_EVENT_REQUEST:
            return {
                ...state,
                deleteEvent: {
                    ...state.deleteEvent,
                    loading: true,
                    error: null
                }
            };

        case eventsActionsTypes.DELETE_EVENT_SUCCESS:
            state.events.rows = state.events.rows.filter(event => event.id !== payload.id);
            return {
                ...state,
                deleteEvent: {
                    ...state.deleteEvent,
                    loading: false,
                    msg: payload.msg
                }
            };

        case eventsActionsTypes.DELETE_EVENT_ERROR:
            return {
                ...state,
                deleteEvent: {
                    ...state.deleteEvent,
                    loading: false,
                    error: payload
                }
            }
    
        default:
            break;
    }
};

export default deleteEvent;