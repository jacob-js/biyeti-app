import initialStates from "../../states";
import getCurrentUser from "./getCurrent";
import login from "./login";
import logout from "./logout";
import signup from "./signup";
import updateProfile from "./updateProfile";
import validateNewUser from "./validate";

const users = (state=initialStates.users, action={}) =>({
    ...state,
    ...getCurrentUser(state, action),
    ...login(state, action),
    ...signup(state, action),
    ...logout(state, action),
    ...updateProfile(state, action),
    ...validateNewUser(state, action)
});

export default users;