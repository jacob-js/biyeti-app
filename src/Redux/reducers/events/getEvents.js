import { eventsActionsTypes } from "../../actionsTypes/events";

const getEvents = (state, {type, payload}) =>{
    switch (type) {
        case eventsActionsTypes.GET_EVENTS_REQUEST:
            return{
                ...state,
                events: {
                    ...state.events,
                    loading: !payload.isMore,
                    isLoadingMore: payload.isMore,
                    error: null,
                    rows: payload.isMore ? state.events.rows : [],
                    count: payload.isMore ? state.events.count : 0
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
                    isLoadingMore: false,
                    rows: [...state.events.rows, ...payload.data.rows],
                    count: payload.data.count,
                }
            }

        case eventsActionsTypes.GET_EVENTS_ERROR:
            return{
                ...state,
                events: {
                    ...state.events,
                    loading: false,
                    error: payload,
                    isLoadingMore: false
                }
            }

        case eventsActionsTypes.DESTROY_EVENTS_STATE:
            return{
                ...state,
                events: {
                    ...state.events,
                    rows: [],
                    count: 0
                }
            }
    
        default:
            break;
    }
};

export default getEvents;