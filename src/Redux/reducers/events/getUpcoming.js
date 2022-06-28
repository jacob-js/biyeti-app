import { eventsActionsTypes } from "../../actionsTypes/events";

const getUpcomingEvents = (state, {type, payload}) => {
    switch (type) {
        case eventsActionsTypes.GET_UPCOMING_EVENTS_REQUEST:
            return {
                ...state,
                upcomingEvents: {
                    ...state.upcomingEvents,
                    isLoading: !payload.isMore ? true : false,
                    isLoadingMore: payload.isMore,
                    error: null,
                    rows: payload.isMore ? state.upcomingEvents.rows : [],
                    count: payload.isMore ? state.upcomingEvents.count : 0
                }
            };
        case eventsActionsTypes.GET_UPCOMING_EVENTS_SUCCESS:
            return {
                ...state,
                upcomingEvents: {
                    ...state.upcomingEvents,
                    isLoading: false,
                    isLoadingMore: false,
                    rows: [...state.upcomingEvents.rows, ...payload.data.rows],
                    count: payload.data.count,
                    error: null
                }
            };
        case eventsActionsTypes.GET_UPCOMING_EVENTS_ERROR:
            return {
                ...state,
                upcomingEvents: {
                    ...state.upcomingEvents,
                    isLoading: false,
                    error: payload,
                    isLoadingMore: false
                }
            };

        case eventsActionsTypes.DESTROY_EVENTS_STATE:
            return{
                ...state,
                upcomingEvents: {
                    ...state.upcomingEvents,
                    rows: [],
                    count: 0
                }
            }
        default:
            break;
    }
};

export default getUpcomingEvents;