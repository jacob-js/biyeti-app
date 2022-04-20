import agentsActionsTypes from "../../actionsTypes/agents";

const createAgent = (state, {type, payload}) => {
    switch (type) {
        case agentsActionsTypes.CREATE_AGENT_REQUEST:
            return{
                ...state, 
                createAgent: {
                    ...state.createAgent,
                    isLoading: true,
                    error: null
                }
            }

        case agentsActionsTypes.CREATE_AGENT_SUCCESS:
            state.agents.rows = state.agents.rows.concat(payload);
            return{
                ...state, 
                createAgent: {
                    ...state.createAgent,
                    isLoading: false,
                    data: payload
                }
            }

        case agentsActionsTypes.CREATE_AGENT_FAILURE:
            return{
                ...state, 
                createAgent: {
                    ...state.createAgent,
                    isLoading: false,
                    error: payload
                }
            }
    }
};

export default createAgent;