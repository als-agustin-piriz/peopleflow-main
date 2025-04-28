import React from 'react';
import {useSelector} from "react-redux";
import type {RootState} from "@state/store";
import axios from "axios";
import pkg from "../../../package.json";
import {useUser} from "@context/AuthProvider";

type HeaderProps = {
    className?: string;
    onMenuClick?: () => void;
};

const Header: React.FC<HeaderProps> = ({onMenuClick}) => {
    const name = useSelector((state: RootState) => state.user.name);
    const {doLogout} = useUser();

    const getUserData = async () => {
        try {
            await axios.get(`/api/${pkg.name}/session`);
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                console.log('No autorizado, redirigiendo al login...');
            } else {
                console.error('Hubo un error:', (error as Error).message);
            }
        }
    };

    return (
        <header className="h-16 bg-white px-6 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-2 rounded-md text-gray-600 hover:text-black focus:outline-none focus:ring-2 focus:ring-black"
                >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>
                <h2 className="text-xl font-semibold">Mi Panel</h2>
            </div>

            <div className="flex items-center gap-4">
                <button onClick={getUserData}
                        className="bg-black text-white rounded-2xl p-2 cursor-pointer text-sm">
                    Solicita una demo
                </button>
                <button onClick={doLogout}
                        className="bg-black text-white rounded-3xl p-2 cursor-pointer text-sm">
                    Cerrar sesión
                </button>
                <span className="text-sm text-gray-600 hidden sm:inline">Hola, {name}</span>
            </div>
        </header>
    );
};

export default Header;
