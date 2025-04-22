import React, {useEffect} from 'react';
import axios from 'axios';
import Header from '@components/Header';
import AppRouter from './AppRouter';
import pkg from '../package.json';
import SideBar from "@components/SideBar";

const App: React.FC = () => {
    useEffect(() => {
        const fetchEnv = async () => {
            try {
                const {data} = await axios.get(`/api/${pkg.name}/env`);
            } catch (err) {
                console.error('Error al obtener env:', err);
            }
        };

        fetchEnv();
    }, []);

    return (
        <div className="flex h-screen">
            <SideBar className="w-64 bg-gray-100"/>
            <div className="flex flex-col flex-1">
                <Header className="h-16 bg-white border-b"/>
                <main className="flex-1 overflow-auto p-4 bg-red-300">
                    <AppRouter/>
                </main>
            </div>
        </div>
    );
}

export default App;
