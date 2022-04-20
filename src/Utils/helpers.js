import { routes } from "../Routes/routes";

export const securedRoutes = routes.filter(route => route.secured);
export const notSecuredRoutes = routes.filter(route => !route.secured);

export const isEventAdmin = (user, members) =>{
    const member = members.find(member => member.user?.id === user.id);
    if(!member) return false;
    return member?.role === 'admin';
}