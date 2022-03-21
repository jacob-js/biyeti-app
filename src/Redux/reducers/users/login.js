import { authActionsTypes } from '../../actionsTypes/auth';

const login = (state, { type, payload }) =>{
    switch (type) {
        case authActionsTypes.LOGIN_REQUEST:
            return{
                ...state,
                login: {
                    ...state.login,
                    loading: true,
                    error: {}
                }
            }            
        case authActionsTypes.LOGIN_SUCCESS:
            return{
                ...state,
                login: {
                    ...state.login,
                    loading: false,
                    error: {},
                    data: payload
                }
            } 

        case authActionsTypes.LOGIN_FAILURE:
            return{
                ...state,
                login: {
                    ...state.login,
                    loading: false,
                    error: payload
                }
            } 
    
        default:
            break;
    }
}

export default login