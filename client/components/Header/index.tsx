import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "@state/store";
import {logout} from '@state/slices/userSlice';
import axios from "axios";
import pkg from "../../../package.json";

type HeaderProps = {
    className?: string;
};

const Header: React.FC<HeaderProps> = () => {
    const name = useSelector((state: RootState) => state.user.name);
    const dispatch = useDispatch<AppDispatch>();


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

    const onLogout = async () => {
        try {
            const {data} = await axios.post(`/api/${pkg.name}/logout`);
            dispatch(logout())
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
            <h1 className="text-xl font-semibold">Mi Panel</h1>
            <div className="flex items-center gap-4">
                <button onClick={getUserData} className="bg-blue-400 rounded-xl p-2 cursor-pointer">Obtener session
                </button>
                <button onClick={onLogout} className="bg-blue-400 rounded-xl p-2 cursor-pointer">Cerrar session</button>
                <span className="text-sm text-gray-600">Hola, {name}</span>
            </div>
        </header>
    );
};

export default Header;
