import axios from 'axios';
import React, { lazy, Suspense, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const MfeUno = lazy(() => import('mfeUno/App'));

const App = () => {

    useEffect(async () => {
        const { data } = await axios.get(`/api/env`);
        debugger;
    }, []);

    return (
        <div>
            <h1>Soy el Shell</h1>
            <Suspense fallback={<div>Cargando MFE Uno...</div>}>
                <MfeUno />
            </Suspense>
        </div>
    )
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
