import initialStates from "../../states";
import createEvent from "./createEvent";
import getEvents from "./getEvents";

const events = (state=initialStates.events, action={}) =>({
    ...state,
    ...getEvents(state, action),
    ...createEvent(state, action)
});
export default events;