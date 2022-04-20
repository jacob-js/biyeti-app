import axios from "axios";
import { showToast } from "../../Utils/feedbacks";
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

};

export const createAgentAction = (data) => async (dispatch, cb) => {
    dispatch({ type: agentsActionsTypes.CREATE_AGENT_REQUEST });
    try {
        const res = await axios.post(`/api/v1/agents/`, data);
        if(res.status === 201) {
            dispatch({ type: agentsActionsTypes.CREATE_AGENT_SUCCESS, payload: res.data.data });
            showToast('Nouveau membre ajouté avec succès', 'success');
            cb(true)
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({ type: agentsActionsTypes.CREATE_AGENT_FAILURE, payload: res.data?.error || res.data });
        }else{
            dispatch({ type: agentsActionsTypes.CREATE_AGENT_FAILURE, payload: 'Echec de chargement' });
        }
    }
}