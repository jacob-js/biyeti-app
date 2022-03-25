import initialStates from "../../states";
import getTickets from "./getTickets";

const tickets = (state=initialStates.tickets, action={}) =>({
    ...state,
    ...getTickets(state, action)
});

export default tickets;