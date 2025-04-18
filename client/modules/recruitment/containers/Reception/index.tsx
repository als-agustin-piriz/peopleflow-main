import React, {lazy, Suspense} from 'react';

const MfeUno = lazy(() => import('mfeUno/App'));

const Reception: React.FC = () => {
    return (
        <Suspense fallback={<div>Cargando MFE Uno...</div>}>
            <MfeUno/>
        </Suspense>
    );
};

export default Reception;