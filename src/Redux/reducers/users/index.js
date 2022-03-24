import initialStates from "../../states";
import getCurrentUser from "./getCurrent";
import login from "./login";
import logout from "./logout";
import signup from "./signup";

const users = (state=initialStates.users, action={}) =>({
    ...state,
    ...getCurrentUser(state, action),
    ...login(state, action),
    ...signup(state, action),
    ...logout(state, action)
});

export default users;