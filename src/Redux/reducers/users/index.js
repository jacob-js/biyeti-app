import initialStates from "../../states";
import login from "./login";
import signup from "./signup";

const users = (state=initialStates.users, action={}) =>({
    ...state,
    ...login(state, action),
    ...signup(state, action)
});

export default users;