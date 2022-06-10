import DashboardEventHeader from "../Components/DashboardEventHeader";
import AddEventForm from "../Screens/AddEventForm";
import AllEvents from "../Screens/AllEvents";
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
        secured: true,
        headerOptions: {
        }
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
        secured: true,
        headerOptions: {}
    },
    {
        name: 'AddEventForm',
        component: AddEventForm,
        withHeader: true,
        title: 'Ajouter un événement',
        secured: true,
        headerOptions: {}
    },
    {
        name: 'DashboardEventDetail',
        component: DashboardEventDetail,
        withHeader: true,
        secured: true,
        headerOptions: {
            // header: props => <DashboardEventHeader {...props} />,
            headerBackTitleVisible: false,
            headerTitle: false,
            headerTransparent: true,
            headerTintColor: 'white',
            title: ""
        }
    },
    {
        name: 'UserBookings',
        component: UserBookings,
        withHeader: true,
        secured: true,
        title: 'Mes réservations',
        headerOptions: {}
    }
]

export const drawerRoutes = [
    {
        name: 'Home',
        component: Home
    },
    {
        name: 'AllEvents',
        component: AllEvents
    }
]

export const securedRoutes = routes.filter(route => route.secured);
export const notSecuredRoutes = routes.filter(route => !route.secured);