import axios from 'axios';
import React, { lazy, Suspense, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import pkg from '../package.json'
const MfeUno = lazy(() => import('mfeUno/App'));

const App = () => {

    useEffect(async () => {
        const { data } = await axios.get(`/api/${pkg.name}/env`);
        const { data2 } = await axios.post(`/api/${pkg.name}/login`);
    }, []);

    const getUserData = async () => {
        try {
            const { data } = await axios.get(`/api/${pkg.name}/session`);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Aquí manejas el error 401
                console.log('No autorizado, redirigiendo al login...');
                // window.location.href = '/login'; // O maneja la redirección a login de otra forma
            } else {
                // Maneja otros errores de manera general
                console.error('Hubo un error:', error.message);
            }
        }
    }
    
    const logout = async () => {
        try {
            const { data } = await axios.post(`/api/${pkg.name}/logout`);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Aquí manejas el error 401
                console.log('No autorizado, redirigiendo al login...');
                // window.location.href = '/login'; // O maneja la redirección a login de otra forma
            } else {
                // Maneja otros errores de manera general
                console.error('Hubo un error:', error.message);
            }
        }
    }

    return (
        <div>
            <h1>Soy el Shell</h1>
            <Suspense fallback={<div>Cargando MFE Uno...</div>}>
                <MfeUno />
            </Suspense>
            <button type='button' onClick={getUserData}>Obtener usuario</button>
            <button type='button' onClick={logout}>Cerrar session</button>
        </div>
    )
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
