import { authActionsTypes } from '../../actionsTypes/auth';

const signup = (state, { type, payload }) =>{
    switch (type) {
        case authActionsTypes.REGISTER_REQUEST:
            return{
                ...state,
                signup: {
                    ...state.signup,
                    loading: true,
                    error: {}
                }
            }            
        case authActionsTypes.REGISTER_SUCCESS:
            return{
                ...state,
                signup: {
                    ...state.signup,
                    loading: false,
                    error: {},
                    data: payload
                },
                currentUser: {
                    ...state.currentUser,
                    loading: false,
                    error: null,
                    data: payload,
                    auth: true
                }
            } 

        case authActionsTypes.REGISTER_FAILURE:
            return{
                ...state,
                signup: {
                    ...state.signup,
                    loading: false,
                    error: payload
                }
            } 
    
        default:
            break;
    }
}

export default signup