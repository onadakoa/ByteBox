import useSWR from "swr";
import {OutPacket} from "@/utils/OutPacket";
import {IShippingAddress} from "@/utils/ShippingAddress";

export function useAddress() {
    const {data, isLoading, error} = useSWR("/shipping_address/index.php");

    return {
        isLoading,
        error,
        data: data as OutPacket<IShippingAddress[]>,
        addresses: data?.d as IShippingAddress[],
    }
}