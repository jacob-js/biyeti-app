import initialStates from "../../states";
import createTicket from "./createTicket";
import getTickets from "./getTickets";
import purchase from "./purchase";

const tickets = (state=initialStates.tickets, action={}) =>({
    ...state,
    ...getTickets(state, action),
    ...createTicket(state, action),
    ...purchase(state, action)
});

export default tickets;