import AddEventForm from "../Components/AddEventForm";
import Dashboard from "../Components/Dashboard";
import DashboardEventDetail from "../Components/DashboardEventDetail";
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
        secured: false
    },
    {
        name: 'Signup',
        component: Signup,
        withHeader: false,
        secured: false
    },
    {
        name: 'EventDetail',
        component: EventDetail,
        title: 'Detail de l\'événement',
        secured: true
    },
    {
        name: 'Dashboard',
        component: Dashboard,
        withHeader: false,
        secured: true
    },
    {
        name: 'DashboardEvents',
        component: EventsList,
        withHeader: true,
        title: 'Mes événements',
        secured: true
    },
    {
        name: 'AddEventForm',
        component: AddEventForm,
        withHeader: true,
        title: 'Ajouter un événement',
        secured: true
    },
    {
        name: 'DashboardEventDetail',
        component: DashboardEventDetail,
        withHeader: false,
        secured: true
    }
]

export const drawerRoutes = [
    {
        name: 'Home',
        component: Home
    }
]