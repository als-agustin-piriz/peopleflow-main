import axios from 'axios';
import React, {lazy, Suspense, useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import pkg from '../package.json';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from "./AppRouter";

// Tipar correctamente import dinámico (Module Federation)
const MfeUno = lazy(() => import('mfeUno/App'));

const App: React.FC = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.get(`/api/${pkg.name}/env`);
                const {data: loginData} = await axios.post(`/api/${pkg.name}/login`);
            } catch (error: unknown) {
                console.error('Error al obtener datos:', error);
            }
        };

        fetchData()
            .then((r) => console.log('fetchData', r))
            .catch((e) => console.error('fetchData', e));
    }, []);

    const getUserData = async () => {
        try {
            const {data} = await axios.get(`/api/${pkg.name}/session`);
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                console.log('No autorizado, redirigiendo al login...');
            } else {
                console.error('Hubo un error:', (error as Error).message);
            }
        }
    };

    const logout = async () => {
        try {
            const {data} = await axios.post(`/api/${pkg.name}/logout`);
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                console.log('No autorizado, redirigiendo al login...');
            } else {
                console.error('Hubo un error:', (error as Error).message);
            }
        }
    };

    const apiTest = async () => {
        try {
            const {data} = await axios.post(`/user/hola`);
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                console.log('No autorizado, redirigiendo al login...');
            } else {
                console.error('Hubo un error:', (error as Error).message);
            }
        }
    };

    return (
        <div>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </div>
    );
};

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<App/>);
} else {
    console.error("No se encontró el contenedor con id 'root'");
}
