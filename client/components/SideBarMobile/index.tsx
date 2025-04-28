import React from 'react';
import {useNavigate} from "react-router-dom";
import {InternalRoute} from "@configuration/internalRoutes";

type SidebarProps = {
    className?: string;
    itemsWithPermissions?: InternalRoute[];
};

const SideBarMobile: React.FC<SidebarProps> = ({itemsWithPermissions}) => {
    const navigate = useNavigate();

    const onNavigate = (path: string) => {
        console.log(path);
        navigate(path);
    }

    return (
        <div>
            {itemsWithPermissions?.map((item, index) => (
                <div
                    key={index}
                    className="block px-3 py-2 rounded hover:text-blue-100 font-bold text-white cursor-pointer text-4xl"
                    onClick={() => onNavigate(item.path)}
                >
                    {item.title}
                </div>
            ))}
        </div>
    );
};

export default SideBarMobile;
