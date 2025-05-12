import useSWR from "swr";
import {IProduct} from "@/utils/Product";
import {OutPacket} from "@/utils/OutPacket";

export default function useProductList() {
    const {data, isLoading, error} = useSWR("/products/index.php");

    return {
        isLoading,
        error,
        data: data as OutPacket<IProduct[]>,
        products: data?.d as IProduct[],
    }
}