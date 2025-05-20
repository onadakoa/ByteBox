"use client";

import useProductList from "@/hooks/useProductList";
import {useEffect, useState} from "react";
import Feed from "@/components/Feed/Feed";
import {Product} from "@/utils/Product";
import {Attachment} from "@/utils/Attachment";

export const ApiFeed = () => {
    const {products, isLoading, error} = useProductList();

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