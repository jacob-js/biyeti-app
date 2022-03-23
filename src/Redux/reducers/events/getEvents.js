import { eventsActionsTypes } from "../../actionsTypes/events";

const getEvents = (state, {type, payload}) =>{
    switch (type) {
        case eventsActionsTypes.GET_EVENTS_REQUEST:
            return{
                ...state,
                events: {
                    ...state.events,
                    loading: true,
                    error: null
                }
            }
            
        case eventsActionsTypes.GET_EVENTS_SUCCESS:
            return{
                ...state,
                events: {
                    ...state.events,
                    loading: false,
                    error: null,
                    data: payload,
                    rows: payload.rows,
                    count: payload.count
                }
            }

        case eventsActionsTypes.GET_EVENTS_ERROR:
            return{
                ...state,
                events: {
                    ...state.events,
                    loading: false,
                    error: payload
                }
            }
    
        default:
            break;
    }
};

export default getEvents;