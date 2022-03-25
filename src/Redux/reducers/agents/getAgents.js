import agentsActionsTypes from "../../actionsTypes/agents";

const getAgents = (state, {type, payload}) =>{
    switch(type){
        case agentsActionsTypes.GET_USER_AGENTS_REQUEST:
            return {
                ...state,
                agents: {
                    ...state.agents,
                    loading: true,
                    error: null
                }
            }
        case agentsActionsTypes.GET_USER_AGENTS_SUCCESS:
            return {
                ...state,
                agents: {
                    ...state.agents,
                    loading: false,
                    error: null,
                    data: payload,
                    count: payload.count,
                    rows: payload.rows
                }
            }

        case agentsActionsTypes.GET_USER_AGENTS_FAILURE:
            return {
                ...state,
                agents: {
                    ...state.agents,
                    loading: false,
                    error: payload
                }
            }
    }
};

export default getAgents;