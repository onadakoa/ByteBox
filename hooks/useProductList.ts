import useSWR from "swr";
import {IProduct} from "@/utils/Product";
import {OutPacket} from "@/utils/OutPacket";

export default function useProductList(options: {
    search?: string,
    limit?: number,
    page?: number,
    category?: number,
    price_in?: number,
    price_out?: number,
    sort?: string,
} = {}) {
    const params = new URLSearchParams();
    if (options.search) params.append("search", options.search);
    if (options.limit) params.append("limit", options.limit.toString());
    if (options.page) params.append("page", options.page.toString());
    if (options.category) params.append("category", options.category.toString());
    if (options.price_in) params.append("price_in", options.price_in.toString());
    if (options.price_out) params.append("price_out", options.price_out.toString());
    if (options.sort) params.append("sort", options.sort);
    const {data, isLoading, error} = useSWR(`/products/index.php?${params.toString()}`);

    return {
        isLoading,
        error,
        data: data as OutPacket<IProduct[]>,
        products: data?.d as IProduct[],
    }
}