import {IProvider} from "@/utils/Provider";
import useSWR from "swr";
import {OutPacket} from "@/utils/OutPacket";

export function useProvider() {
    const {data, isLoading, error} = useSWR("/provider/index.php");

    return {
        isLoading,
        error,
        data: data as OutPacket<IProvider[]>,
        providers: data?.d as IProvider[],
    }
}