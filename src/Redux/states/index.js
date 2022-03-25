import agents from "./agents";
import events from "./events";
import tickets from "./tickets";
import users from "./users";

const initialStates = {
    users: users,
    events: events,
    agents: agents,
    tickets: tickets,
}

export default initialStates;