import React from 'react';
import {Routes, Route, Navigate, useLocation} from 'react-router-dom';
import internalRoutes from "./configuration/internalRoutes";

type AppRoute = {
    path: string;
    element: React.ReactElement;
    requiredModule: string;
};

const AppRouter: React.FC = () => {
    const userModules = ['recruitment:reception', 'home'];

    const routes: AppRoute[] = internalRoutes;

    const enabledRoutes = routes.filter(route =>
        userModules.includes(route.requiredModule)
    );

    return (
        <Routes>
            {enabledRoutes.map(route => (
                <Route key={route.path} path={route.path} element={route.element}/>
            ))}
            {/* Default route */}
            <Route
                path="*"
                element={
                    userModules.includes('home') ? (
                        <Navigate to="/" replace/>
                    ) : (
                        <div>No tenés acceso a ninguna sección.</div>
                    )
                }
            />
        </Routes>
    );
};

export default AppRouter;