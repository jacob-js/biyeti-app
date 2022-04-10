import { authActionsTypes } from "../../actionsTypes/auth";

const updateProfile = (state, {type, payload}) =>{
    switch (type) {
        case authActionsTypes.UPDATE_PROFILE_REQUEST:
            return{
                ...state,
                updateProfile: {
                    ...state.updateProfile,
                    loading: true,
                    error: {}
                }
            }

        case authActionsTypes.UPDATE_PROFILE_SUCCESS:
            state.currentUser.data = payload;
            return{
                ...state,
                updateProfile: {
                    ...state.updateProfile,
                    loading: false,
                    data: payload
                }
            }

        case authActionsTypes.UPDATE_PROFILE_FAILURE:
            return{
                ...state,
                updateProfile: {
                    ...state.updateProfile,
                    loading: false,
                    error: payload
                }
            }
    
        default:
            break;
    }
};

export default updateProfile;