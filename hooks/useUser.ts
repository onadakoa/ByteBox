import useSWR from "swr";
import {OutPacket} from "@/utils/OutPacket";
import {JsonError} from "@/utils/api";
import {IUser} from "@/utils/User";

export default function useUser() {
    const {data, error, isLoading} = useSWR("/user/index.php")

    const isLoggedIn = (error as JsonError)?.status != 200;

    return {
        isLoading,
        isLoggedIn,
        user: data as OutPacket<IUser>,
        error: error as JsonError,
    }
}
