import { routes } from "../Routes/routes";

export const securedRoutes = routes.filter(route => route.secured);
export const notSecuredRoutes = routes.filter(route => !route.secured);