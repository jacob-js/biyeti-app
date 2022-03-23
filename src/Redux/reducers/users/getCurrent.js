import { authActionsTypes } from "../../actionsTypes/auth";

const getCurrentUser = (state, {type, payload}) =>{
    switch (type) {
        case authActionsTypes.GET_CURRENT_USER_REQUEST:
            return{
                ...state,
                currentUser: {
                    ...state.currentUser,
                    loading: true,
                    error: null,
                    auth: null
                }
            }
            
        case authActionsTypes.GET_CURRENT_USER_SUCCESS:
            console.log('payload', payload);
            return{
                ...state,
                currentUser: {
                    ...state.currentUser,
                    loading: false,
                    error: null,
                    data: payload,
                    auth: true
                }
            }
    
        case authActionsTypes.GET_CURRENT_USER_FAILURE:
            return{
                ...state,
                currentUser: {
                    ...state.currentUser,
                    loading: false,
                    error: payload,
                    auth: false
                }
            }
    }
};

export default getCurrentUser;