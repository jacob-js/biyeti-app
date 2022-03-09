import Home from "../Components/Home";
import Login from "../Components/Login";

export const routes = [
    {
        name: 'Login',
        component: Login,
        withHeader: false,
    }
]

export const drawerRoutes = [
    {
        name: 'Home',
        component: Home
    },
]