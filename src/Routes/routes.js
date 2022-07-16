import AddEventForm from "../Screens/AddEventForm";
import AllEvents from "../Screens/AllEvents";
import Dashboard from "../Screens/Dashboard";
import EditProfile from "../Screens/EditProfile";
import EmailOrPhoneInput from "../Screens/EmailOrPhoneInput";
import EventDashboard from "../Screens/EventDashBoard";
import EditEvent from "../Screens/EventDashBoard/Components/EditEvent";
import EventDetail from "../Screens/EventDetail";
import EventsList from "../Screens/EventsList";
import Home from "../Screens/Home";
import Login from "../Screens/Login";
import NotificationDetails from "../Screens/NotificationDetails";
import Notifications from "../Screens/Notifications";
import PwdForm from "../Screens/PwdForm";
import SearchResult from "../Screens/SearchResult";
import Signup from "../Screens/Signup";
import UserBookings from "../Screens/UserBookings";
import VerificationCode from "../Screens/VerificationCode";

export const routes = [
    {
        name: 'Login',
        component: Login,
        withHeader: false,
        secured: false
    },
    {
        name: 'Verify',
        component: VerificationCode,
        withHeader: false,
        secured: false
    },
    {
        name: 'ResetPwdEmailForm',
        component: EmailOrPhoneInput,
        withHeader: false,
        secured: false
    },
    {
        name: 'ResetPwdForm',
        component: PwdForm,
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
        headerOptions: {}
    },
    {
        name: 'Notifications',
        component: Notifications,
        title: 'Notifications',
        secured: true,
        headerOptions: {}
    },
    {
        name: 'NotificationDetail',
        component: NotificationDetails,
        title: 'Details',
        secured: true,
        headerOptions: {}
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
        name: 'EditEvent',
        component: EditEvent,
        withHeader: true,
        title: "Modifier l'événement",
        secured: true,
        headerOptions: {}
    },
    {
        name: 'DashboardEventDetail',
        component: EventDashboard,
        withHeader: true,
        secured: true,
        headerOptions: {
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
    },
    {
        name: 'Search',
        component: SearchResult,
        withHeader: false,
        secured: true
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