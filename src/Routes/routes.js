import Dashboard from "../Components/Dashboard";
import EventDetail from "../Components/EventDetail";
import EventsList from "../Components/EventsList";
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
    },
    {
        name: 'EventDetail',
        component: EventDetail,
        title: 'Detail de l\'événement',
    },
    {
        name: 'Dashboard',
        component: Dashboard,
        withHeader: false
    },
    {
        name: 'DashboardEvents',
        component: EventsList,
        withHeader: true,
        title: 'Mes événements'
    }
]

export const drawerRoutes = [
    {
        name: 'Home',
        component: Home
    }
]