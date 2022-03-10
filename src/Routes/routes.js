import Home from "../Components/Home";
import Login from "../Components/Login";
import Signup from "../Components/Signup";

export const routes = [
    {
        name: 'Login',
        component: Login,
        withHeader: false,
    },
    {
        name: 'Signup',
        component: Signup,
        withHeader: false,
    }
]

export const drawerRoutes = [
    {
        name: 'Home',
        component: Home
    },
]