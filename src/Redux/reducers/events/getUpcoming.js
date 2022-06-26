import { eventsActionsTypes } from "../../actionsTypes/events";

const getUpcomingEvents = (state, {type, payload}) => {
    switch (type) {
        case eventsActionsTypes.GET_UPCOMING_EVENTS_REQUEST:
            return {
                ...state,
                upcomingEvents: {
                    ...state.upcomingEvents,
                    isLoading: true,
                    error: null
                }
            };
        case eventsActionsTypes.GET_UPCOMING_EVENTS_SUCCESS:
            return {
                ...state,
                upcomingEvents: {
                    ...state.upcomingEvents,
                    isLoading: false,
                    rows: payload.rows,
                    count: payload.count,
                    error: null
                }
            };
        case eventsActionsTypes.GET_UPCOMING_EVENTS_ERROR:
            return {
                ...state,
                upcomingEvents: {
                    ...state.upcomingEvents,
                    isLoading: false,
                    error: payload
                }
            };
        default:
            break;
    }
};

export default getUpcomingEvents;