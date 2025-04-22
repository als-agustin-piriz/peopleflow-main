import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "@state/store";
import {logout} from '@state/slices/userSlice';
import axios from "axios";
import pkg from "../../../package.json";
import {useUser} from "@context/AuthProvider";

type HeaderProps = {
    className?: string;
};

const Header: React.FC<HeaderProps> = () => {
    const name = useSelector((state: RootState) => state.user.name);
    const {doLogout} = useUser();

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


    return (
        <header className="h-16 bg-white border-b px-6 flex items-center justify-between shadow-sm">
            <h2 className="text-xl font-semibold">Mi Panel</h2>
            <div className="flex items-center gap-4">
                <button onClick={getUserData} className="bg-black text-white rounded-3xl p-3 cursor-pointer">Solicita una demo
                </button>
                <button onClick={doLogout} className="bg-black text-white rounded-3xl  p-2 cursor-pointer">Cerrar session</button>
                <span className="text-sm text-gray-600">Hola, {name}</span>
            </div>
        </header>
    );
};

export default Header;
