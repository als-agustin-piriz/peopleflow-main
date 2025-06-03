// RootApp.tsx
import React, {useEffect, useState} from 'react';
import {Provider, useDispatch} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {store} from '@state/store';
import {setEnv} from '@state/slices/envSlice';
import {UserProvider} from '@context/AuthProvider';
import AppRouter from './AppRouter';
import './tailwind.css';
import pkg from '../package.json';

const AppContent: React.FC = () => {
    const dispatch = useDispatch();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        fetch(`/api/${pkg.name}/env`)
            .then((res) => res.json())
            .then((data) => {
                dispatch(setEnv(data));
                setReady(true);
            })
            .catch((err) => {
                console.error('Error fetching /env:', err);
                setReady(true);
            });
    }, [dispatch]);

    if (!ready) return <div>Cargando entorno...</div>;

    return (
        <UserProvider>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </UserProvider>
    );
};

const RootApp: React.FC = () => (
    <Provider store={store}>
        <AppContent/>
    </Provider>
);

export default RootApp;
