"use client";

import useProductList from "@/hooks/useProductList";
import {useEffect, useState} from "react";
import Feed from "@/components/Feed/Feed";
import {Product} from "@/utils/Product";
import {Attachment} from "@/utils/Attachment";
import {useSearchParams} from "next/navigation";

export const ApiFeed = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") || undefined;
    const category = Number(searchParams.get("category")) || undefined;
    const sort = searchParams.get("sort") || undefined;
    const price_in = Number(searchParams.get("price_in")) || undefined;
    const price_out = Number(searchParams.get("price_out")) || undefined;
    const {products, isLoading, error} = useProductList({search, sort, category, price_in, price_out});

    if (isLoading || error) return "loading";

    return (
        <>
            {products?.map((prod) => {
                let ApiProduct = Product.getFilled(prod);
                return <ApiFeedContent product={ApiProduct} key={ApiProduct.product_id}/>
            })}
        </>
    );
};

export const ApiFeedContent = (props: {
    product: Product,
}) => {
    const [attachment, setAttachment] = useState<Attachment | null>(null);

    useEffect(() => {
        props.product.fetchAttachment()?.then(att => {
            setAttachment(att)
        })
    }, []);

    return (<Feed
        price={props.product.price} title={props.product.name} type={(props.product.stock > 0) ? "active" : "unavailable"}
        imageSrc={(attachment) ? attachment.getImages()[0].getURL() : undefined}
        productHref={"/product?id=" + props.product.product_id}
    />)
}