import useSWR from "swr";
import {IOrder} from "@/utils/Order";
import {OutPacket} from "@/utils/OutPacket";

export default function useOrders() {
    const {data, isLoading, error} = useSWR("/order/index.php");

    if (error) {
        console.error("useOrders: ", error)
    }

    return {
        isLoading,
        error,
        data: data as OutPacket<IOrder[]>,
        orders: data?.d as IOrder[],
    }
}
