import React from 'react';
import {InternalRoute} from "@configuration/internalRoutes";
// import Logo from "../../assets/images/logo.png";
import {useNavigate} from "react-router-dom";

type SidebarProps = {
    className?: string;
    itemsWithPermissions?: InternalRoute[];
};

const Sidebar: React.FC<SidebarProps> = ({itemsWithPermissions}) => {
    const navigate = useNavigate();

    const onNavigate = (path: string) => {
        console.log(path);
        navigate(path);
    }

    return (
        <aside className="w-52 bg-amber-100 shadow-md h-full"
               style={{background: 'linear-gradient(178deg, rgba(241, 182, 249, 0.47) 0%, rgb(216 203 238 / 41%) 51%)'}}>
            <div>
                {/*<img src={Logo} width={20} alt="logo"/>*/}
                <div className="p-6 font-bold text-xl">PeopleFlow</div>
            </div>
            <nav className="p-4 space-y-2">
                {itemsWithPermissions?.map((item) => (
                    <div key={item.path}
                         className="block px-3 py-2 rounded hover:bg-fuchsia-200 hover:opacity-80 hover:rounded-xl cursor-pointer"
                         onClick={() => onNavigate(item.path)}
                    >
                        <div className="flex gap-2 items-center">
                            {item.icon}
                            <p>
                                {item.title}
                            </p>
                        </div>
                    </div>
                ))}
            </nav>
        </aside>
    )
        ;
};

export default Sidebar;
