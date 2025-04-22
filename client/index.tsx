import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {store} from '@state/store';
import {UserProvider} from '@context/AuthProvider';
import './tailwind.css';
import AppRouter from "./AppRouter";

const container = document.getElementById('root');

if (container) {
    const root = createRoot(container);
    root.render(
        <Provider store={store}>
            <UserProvider>
                <BrowserRouter>
                    <AppRouter/>
                </BrowserRouter>
            </UserProvider>
        </Provider>
    );
}
