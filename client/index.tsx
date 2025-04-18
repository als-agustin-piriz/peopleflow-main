import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '@state/store';
import './tailwind.css';
import App from './App';

const container = document.getElementById('root');

if (container) {
    const root = createRoot(container);
    root.render(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    );
} else {
    console.error("No se encontró el contenedor con id 'root'");
}
