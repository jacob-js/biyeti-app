import initialStates from "../../states";
import getAgents from "./getAgents";

const agents = (state=initialStates.agents, action={}) =>({
    ...state,
    ...getAgents(state, action)
});

export default agents;