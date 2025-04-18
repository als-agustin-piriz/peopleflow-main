import React, {useEffect} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {login} from '@state/slices/userSlice';
import Header from '@components/Header';
import AppRouter from './AppRouter';
import type {AppDispatch} from '@state/store';
import pkg from '../package.json';
import SideBar from "@components/SideBar";

const App: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data: loginData} = await axios.post(`/api/${pkg.name}/login`);
                dispatch(login({name: loginData.user.name}));
            } catch (error: unknown) {
                console.error('Error al obtener datos:', error);
            }
        };

        const fetchEnv = async () => {
            try {
                const {data} = await axios.get(`/api/${pkg.name}/env`);
            } catch (err) {
                console.error('Error al obtener env:', err);
            }
        };

        fetchData()
            .then((r) => console.log('fetchData', r))
            .catch((e) => console.error('fetchData', e));

        fetchEnv();
    }, []);

    return (
        <div className="flex h-screen">
            <SideBar className="w-64 bg-gray-100"/>
            <div className="flex flex-col flex-1">
                <Header className="h-16 bg-white border-b"/>
                <main className="flex-1 overflow-auto p-4 bg-gray-50">
                    {/* contenido */}
                    <AppRouter/>
                </main>
            </div>
        </div>
    );
}

export default App;
