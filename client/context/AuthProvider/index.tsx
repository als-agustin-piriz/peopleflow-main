import React, {
    useContext,
    useEffect,
    useState,
    createContext,
    ReactNode,
} from "react";
import axios from "axios";
import getUser from "@services/auth/getUser";
import {login, logout} from "@state/slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "@state/store";
import {BFF_URL} from "@utils/constants/service.constant";

type UserContextType = {
    isUserFetched: boolean;
    doLogout: () => Promise<void>;
    fetchUserLogged: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

type Props = {
    children: ReactNode;
};

export const UserProvider: React.FC<Props> = ({children}) => {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const [isUserFetched, setIsUserFetched] = useState(false);

    const doLogout = async () => {
        try {
            await axios.post(`${BFF_URL}/logout`);
            dispatch(logout());
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const fetchUserLogged = async () => {
        try {
            const response = await getUser();
            if (!!response?.name)
                dispatch(login({name: response.name}));
            setIsUserFetched(true);
        } catch (error) {
            console.error("Fetching user failed:", error);
        }
    };

    useEffect(() => {
        if (!user?.isLoggedIn) {
            fetchUserLogged();
        }
    }, []);

    return (
        <UserContext.Provider
            value={
                {
                    isUserFetched,
                    doLogout,
                    fetchUserLogged
                }
            }
        >
            {
                children
            }
        </UserContext.Provider>
    )
        ;
};
