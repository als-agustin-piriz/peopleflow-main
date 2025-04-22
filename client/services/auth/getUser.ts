import {getUserURL} from "./URLs";
import axios from "axios";

type User = {
    name?: string;
    lastName?: string;
    email?: string;
    // to do: refactor with user model
};

const getUser = async (): Promise<User> => {
    try {
        const response = await axios.get(getUserURL);
        return response.data || {};
    } catch {
        return {};
    }
};

export default getUser;
