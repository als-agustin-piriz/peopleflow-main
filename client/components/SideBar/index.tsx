import React from 'react';

type SidebarProps = {
    className?: string;
};

const Sidebar: React.FC<SidebarProps> = () => {
    return (
        <aside className="w-64 bg-white shadow-md h-full">
            <div className="p-6 font-bold text-xl border-b">Dashboard</div>
            <nav className="p-4 space-y-2">
                <a href="#" className="block px-3 py-2 rounded hover:bg-gray-100">Inicio</a>
                <a href="#" className="block px-3 py-2 rounded hover:bg-gray-100">Usuarios</a>
                <a href="#" className="block px-3 py-2 rounded hover:bg-gray-100">Configuración</a>
            </nav>
        </aside>
    );
};

export default Sidebar;
