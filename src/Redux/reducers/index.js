import agents from "./agents";
import events from "./events";
import tickets from "./tickets";
import users from "./users";

const reducers = {
    users: users,
    events: events,
    agents: agents,
    tickets: tickets
};

export default reducers;