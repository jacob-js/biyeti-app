import { authActionsTypes } from "../../actionsTypes/auth";

const validateNewUser = (state, { type, payload }) =>{
    switch (type) {
        case authActionsTypes.CREATE_USER_START:
            return{
                ...state,
                createUser: {
                    ...state.createUser,
                    loading: true,
                    error: null
                }
            }

        case authActionsTypes.CREATE_USER_SUCCESS:
            return{
                ...state,
                createUser: {
                    ...state.createUser,
                    loading: false,
                    error: null
                },
                currentUser: {
                    ...state.currentUser,
                    loading: false,
                    error: null,
                    data: payload,
                    auth: true
                }
            }

        case authActionsTypes.CREATE_USER_FAILURE:
            return{
                ...state,
                createUser: {
                    ...state.createUser,
                    loading: false,
                    error: payload
                }
            }
    }
};

export default validateNewUser;