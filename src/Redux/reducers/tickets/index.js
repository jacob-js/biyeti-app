import initialStates from "../../states";
import createTicket from "./createTicket";
import getTickets from "./getTickets";

const tickets = (state=initialStates.tickets, action={}) =>({
    ...state,
    ...getTickets(state, action),
    ...createTicket(state, action)
});

export default tickets;