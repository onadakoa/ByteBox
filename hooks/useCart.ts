import useSWR from "swr";
import {OutPacket} from "@/utils/OutPacket";
import {ICartItem} from "@/utils/CartItem";
import {ICartData} from "@/utils/CartData";

export function useCart() {
    const {data, isLoading, error} = useSWR("/cart/index.php");

    return {
        isLoading,
        error,
        data: data as OutPacket<ICartItem[]>,
        items: data?.d.items as ICartItem[],
        info: data?.d.data as ICartData,
    }
}