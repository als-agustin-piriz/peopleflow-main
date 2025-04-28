import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {internalRoutes} from '@configuration/internalRoutes';
import ProtectedRoute from '@components/ProtectedRoutes';
import DashboardLayout from '@components/DasboardLayout';
import Login from "@auth/containers/Login";

const AppRouter: React.FC = () => {
    const userModules = ['recruitment:reception', 'home'];

    const routesWithMatches = internalRoutes.map(route => {
        const matchingModules = route.requiredModule.filter(module => userModules.includes(module));
        return {
            ...route,
            matchingModules
        };
    });

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
                                {routesWithMatches?.map(route => (
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
