import axios from "axios";
import agentsActionsTypes from "../actionsTypes/agents";

export const getAgentsAction = (userId, eventId) =>async(dispatch, navigation) => {
    dispatch({ type: agentsActionsTypes.GET_USER_AGENTS_REQUEST });
    try {
        const url = userId ? `/api/v1/agents?user_id=${userId}` : `/api/v1/agents?event_id=${eventId}`;
        const res = await axios.get(url);
        if(res.status === 200) {
            dispatch({ type: agentsActionsTypes.GET_USER_AGENTS_SUCCESS, payload: res.data.data });
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({ type: agentsActionsTypes.GET_USER_AGENTS_FAILURE, payload: res.data?.error || res.data });
            if(res.status === 401){ navigation.navigate("Login"); }
        }else{
            dispatch({ type: agentsActionsTypes.GET_USER_AGENTS_FAILURE, payload: 'Echec de chargement' });
        }
    }

}