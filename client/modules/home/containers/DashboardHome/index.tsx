import React, { Suspense, lazy } from 'react';

const MfeUno = lazy(() => import('mfeUno/App'));

const DashboardHome: React.FC = () => {
    return (
        <Suspense fallback={<div>Cargando MFE Uno...</div>}>
            <MfeUno />
        </Suspense>
    );
};

export default DashboardHome;