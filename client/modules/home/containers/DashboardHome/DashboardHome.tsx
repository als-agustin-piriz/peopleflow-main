import React from 'react';

const DashboardHome: React.FC = () => {
    return (
        <div className="flex p-4 w-full gap-1 flex-col px-44">
            <h1 className="text-3xl font-semibold text-center">
                Genera un impacto positivo con la plataforma de RR. HH. más inteligente
            </h1>
            <div className="text-center">
                <h3 className="text-xl text-gray-600"
                >Automatiza tareas repetitivas, personaliza workflows y obtén información sobre tus equipos. Todo en un
                    solo lugar.
                </h3>
            </div>
        </div>
    );
};

export default DashboardHome;
