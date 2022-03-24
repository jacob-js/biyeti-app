import { authActionsTypes } from '../../actionsTypes/auth';

const logout = (state, { type, payload }) =>{
    switch (type) {
        case authActionsTypes.LOGOUT:
            return{
                ...state,
                currentUser: {
                    ...state.currentUser,
                    loading: false,
                    error: null,
                    data: {},
                    auth: false
                }
            } 
    
        default:
            break;
    }
}

export default logout