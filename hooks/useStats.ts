import useSWR from "swr";
import {OutPacket} from "@/utils/OutPacket";

export interface IStats {
    product_count: number,
    avg_product_price: number,
    user_count: number,
}

export default function useStats() {
    const {data, error, isLoading} = useSWR("/stats/index.php");

    return {
        isLoading,
        error,
        stats: data as OutPacket<IStats>
    };
}