import useSWR from "swr";
import {IProduct} from "@/utils/Product";
import {OutPacket} from "@/utils/OutPacket";

export default function useProduct(id: number) {
    const {data, error, isLoading} = useSWR("/products/index.php" + ((id) ? `?id=${id}` : ""));

    return {
        isLoading,
        error,
        data: data as OutPacket<IProduct>,
        product: data?.d as IProduct,
    }
}