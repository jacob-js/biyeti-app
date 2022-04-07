import initialStates from "../../states";
import createTicket from "./createTicket";
import getTickets from "./getTickets";
import getUserTickets from "./getUserTickets";
import purchase from "./purchase";

const tickets = (state=initialStates.tickets, action={}) =>({
    ...state,
    ...getTickets(state, action),
    ...createTicket(state, action),
    ...purchase(state, action),
    ...getUserTickets(state, action)
});

export default tickets;