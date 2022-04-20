import initialStates from "../../states";
import createAgent from "./createAgent";
import getAgents from "./getAgents";

const agents = (state=initialStates.agents, action={}) =>({
    ...state,
    ...getAgents(state, action),
    ...createAgent(state, action)
});

export default agents;