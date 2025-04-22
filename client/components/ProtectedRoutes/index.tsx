import React from 'react';
import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import type {RootState} from '@state/store';
import {useUser} from "@context/AuthProvider";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const isAuthenticated = useSelector((state: RootState) => state.user.isLoggedIn);
    const {isUserFetched} = useUser();

    if (!isUserFetched) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace/>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
