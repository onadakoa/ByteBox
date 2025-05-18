"use client";
import {poppins} from "@/utils/font";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect} from "react";
import useProduct from "@/hooks/useProduct";
import {Loading} from "@/components/Loading/Loading";

export const ProductViewDescription = () => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const id = Number(searchParams.get("id"));
    const {product, error, isLoading} = useProduct(id);

    useEffect(() => {
        if (isNaN(id) || id <= 0) router.push("/")
    }, [id]);

    return (
        <>
            <div className={poppins.className}>
                {
                    (isLoading || error) ? (<Loading>-</Loading>) : (product.name)
                }
            </div>
            <hr/>
            <div className={poppins.className}>
                {
                    (isLoading || error) ? (<Loading>-</Loading>) : (product.description)
                }
            </div>
        </>
    );
};