import useSWR from "swr";
import {API_HOSTNAME} from "@/utils/api";
import {Packet} from "@/utils/Packet";

export default function useStats() {
    const {data, error, isLoading} = useSWR(new URL("/stats/index.php", API_HOSTNAME).toString());

    return {
        isLoading,
        error,
        stats: data as Packet
    };
}