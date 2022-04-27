import { eventsActionsTypes } from "../../actionsTypes/events";

const updateEvent = (state, {type, payload}) =>{
    switch (type) {
        case eventsActionsTypes.UPDATE_EVENT_REQUEST:
            return{
                ...state,
                updateEvent: {
                    ...state.updateEvent,
                    loading: true,
                    error: null
                }
            };

        case eventsActionsTypes.UPDATE_EVENT_SUCCESS:
            return{
                ...state,
                updateEvent: {
                    ...state.updateEvent,
                    loading: false,
                    data: payload
                },
                event: {
                    ...state.event,
                    data: payload
                }
            };

        case eventsActionsTypes.UPDATE_EVENT_ERROR:
            return{
                ...state,
                updateEvent: {
                    ...state.updateEvent,
                    loading: false,
                    error: payload
                }
            };
    
        default:
            break;
    }
};

export default updateEvent