import React, {useState} from 'react';
import Header from '@components/Header';
import SideBar from "@components/SideBar";
import SideBarMobile from "@components/SideBarMobile";
import {internalRoutes} from "@configuration/internalRoutes";
import {filterNavigationByAccess} from "@utils/permissions/user.permissions";
import {useSelector} from "react-redux";
import type {RootState} from "@state/store";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const session = useSelector((state: RootState) => state.user);
    const itemsWithPermissions = filterNavigationByAccess(session, internalRoutes);

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar Desktop */}
            <div className="hidden md:flex">
                <SideBar itemsWithPermissions={itemsWithPermissions}/>
            </div>

            {/* Sidebar Mobile Overlay */}
            {isSidebarOpen && (
                <>
                    {/* Overlay oscuro */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-40 z-30"
                        onClick={() => setSidebarOpen(false)}
                    />

                    {/* Sidebar Mobile */}
                    <div
                        className="fixed top-0 left-0 bottom-0 w-64 z-40 shadow-lg p-4"
                    >
                        <SideBarMobile itemsWithPermissions={itemsWithPermissions}/>
                    </div>
                </>
            )}

            {/* Main Content */}
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header onMenuClick={() => setSidebarOpen(true)}/>
                <main className="flex-1 overflow-auto p-4 bg-gray-100">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
