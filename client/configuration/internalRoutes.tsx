import {lazy} from "react";
import DashboardHome from "@home/containers/DashboardHome";
import Publication from "@recruitment/containers/Publication";
import Reception from "@recruitment/containers/Reception";
import routes from "../routes";

type InternalRoute = {
    path: string;
    element: React.ReactElement;
    requiredModule: string;
};

const internalRoutes: InternalRoute[] = [
    {
        path: routes.RECTRUITMENT_RECEPTION,
        element: <Reception/>,
        requiredModule: 'recruitment:reception'
    },
    {
        path: routes.RECTRUITMENT_PUBLICATION,
        element: <Publication/>,
        requiredModule: 'recruitment:publication'
    },
    {
        path: routes.HOME,
        element: <DashboardHome/>,
        requiredModule: 'home'
    },
];

export default internalRoutes;