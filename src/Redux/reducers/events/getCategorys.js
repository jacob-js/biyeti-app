import { eventsActionsTypes } from "../../actionsTypes/events";

const getCategorys = (state, {type, payload}) =>{
    switch(type){
        case eventsActionsTypes.GET_CATEGORYS_REQUEST:
            return{
                ...state,
                categorys: {
                    ...state.categorys,
                    loading: true,
                    error: null
                }
            }
        case eventsActionsTypes.GET_CATEGORYS_SUCCESS:
            return{
                ...state,
                categorys: {
                    ...state.categorys,
                    loading: false,
                    data: payload,
                    error: null
                }
            }
        case eventsActionsTypes.GET_CATEGORYS_ERROR:
            return{
                ...state,
                categorys: {
                    ...state.categorys,
                    loading: false,
                    error: payload
                }
            }
    }
};

export default getCategorys;