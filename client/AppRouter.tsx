import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import internalRoutes from './configuration/internalRoutes';
import ProtectedRoute from '@components/ProtectedRoutes';
import DashboardLayout from '@components/DasboardLayout';
import Login from "@auth/containers/Login";

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
            {/* Public Routes */}
            <Route path="/login" element={<Login/>}/>

            {/* Protected routes */}
            <Route
                path="/*"
                element={
                    <ProtectedRoute>
                        <DashboardLayout>
                            <Routes>
                                {enabledRoutes.map(route => (
                                    <Route key={route.path} path={route.path} element={route.element}/>
                                ))}
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
                        </DashboardLayout>
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

export default AppRouter;
