import useSWR from "swr";
import {OutPacket} from "@/utils/OutPacket";
import {JsonError} from "@/utils/api";
import {IUser} from "@/utils/User";

export default function useUser() {
    const {data, error, isLoading} = useSWR("/user/index.php", {
        shouldRetryOnError: false,
    })

    let isLoggedIn = true;

    if (error) {
        isLoggedIn = false;
        console.error("useUser: ", JSON.stringify(error))
    }

    return {
        isLoading,
        isLoggedIn,
        data: data as OutPacket<IUser>,
        user: data?.d as IUser,
        error: error as JsonError,
    }
}
