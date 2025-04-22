import React from 'react';
import Sidebar from '@components/SideBar';
import Header from '@components/Header';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <main className="flex-1 overflow-auto p-4 bg-gray-100" style={{ background: "linear-gradient(183deg, rgb(255 174 152) 0%, rgb(254 232 228) 35%, rgb(237 214 243) 100%)"}}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
