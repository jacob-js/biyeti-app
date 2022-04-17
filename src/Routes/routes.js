import AddEventForm from "../Screens/AddEventForm";
import Dashboard from "../Screens/Dashboard";
import DashboardEventDetail from "../Screens/DashboardEventDetail";
import EditProfile from "../Screens/EditProfile";
import EventDetail from "../Screens/EventDetail";
import EventsList from "../Screens/EventsList";
import Home from "../Screens/Home";
import Login from "../Screens/Login";
import Signup from "../Screens/Signup";
import UserBookings from "../Screens/UserBookings";

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
        name: 'EditProfile',
        component: EditProfile,
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
    },
    {
        name: 'UserBookings',
        component: UserBookings,
        withHeader: true,
        secured: true,
        title: 'Mes réservations'
    }
]

export const drawerRoutes = [
    {
        name: 'Home',
        component: Home
    }
]