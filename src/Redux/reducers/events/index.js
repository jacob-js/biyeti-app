import initialStates from "../../states";
import createEvent from "./createEvent";
import getCategorys from "./getCategorys";
import getEvent from "./getEvent";
import getEvents from "./getEvents";
import updateEvent from "./updateEvent";

const events = (state=initialStates.events, action={}) =>({
    ...state,
    ...getEvents(state, action),
    ...createEvent(state, action),
    ...getCategorys(state, action),
    ...getEvent(state, action),
    ...updateEvent(state, action)
});
export default events;