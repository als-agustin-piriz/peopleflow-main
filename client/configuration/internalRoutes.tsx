import DashboardHome from "@home/containers/DashboardHome/DashboardHome";
import Publication from "@recruitment/containers/Publication";
import Reception from "@recruitment/containers/Reception";
import routes from "../routes";
import {MaskOffIcon, TextAlignMiddleIcon, TokensIcon} from "@radix-ui/react-icons";

export type InternalRoute = {
    title: string;
    path: string;
    element: React.ReactElement;
    requiredModule: string[];
    icon: React.ReactElement;
};

export const internalRoutes: InternalRoute[] = [
    {
        title: "Inicio",
        path: routes.HOME,
        element: <DashboardHome/>,
        requiredModule: ['home'],
        icon: <TokensIcon/>
    },
    {
        title: "Recepción",
        path: routes.RECTRUITMENT_RECEPTION,
        element: <Reception/>,
        requiredModule: ['recruitment:reception'],
        icon: <TextAlignMiddleIcon/>
    },
    {
        title: "Publicar vacante",
        path: routes.RECTRUITMENT_PUBLICATION,
        element: <Publication/>,
        requiredModule: ['recruitment:publication'],
        icon: <MaskOffIcon/>
    }
];
