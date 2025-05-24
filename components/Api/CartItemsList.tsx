"use client";

import {useCart} from "@/hooks/useCart";
import CheckOutItem from "@/components/CheckoutCartView/CheckOutItem";
import {useEffect, useState} from "react";
import {CartItem, ICartItem} from "@/utils/CartItem";
import {useDebounce} from "@/hooks/useDebounce";
import {mutate} from "swr";

export const CartItemsList = () => {
    const {isLoading, error, items} = useCart()

    if (isLoading || error) return;
    return (
        <>
            {items.map((item) => <CartItemView key={item.cart_item_id} value={item}/>)}
        </>
    );
};

export const CartItemView = (props: {
    value: ICartItem
}) => {
    const [url, setUrl] = useState<string | null>(null);
    const apiItem = CartItem.getFilled(props.value);

    const [quantity, setQuantity] = useState(apiItem.quantity);
    const debouncedQuantity = useDebounce(quantity);

    useEffect(() => {
        const promise = async () => {
            let att = await apiItem.fetchAttachment();
            if (!att) return;
            setUrl(att.getImages()[0].getURL());
        }
        promise();
    }, []);

    useEffect(() => {
        (async () => {
            if (debouncedQuantity === 0) {
                await onDelete();
                return;
            }

            const body = {
                product_id: apiItem.product_id,
                quantity: debouncedQuantity,
            }
            const res = await fetch("/api/cart/index.php", {
                credentials: "include",
                method: "PUT",
                body: JSON.stringify(body),
            })
            if (!res.ok) {
                console.error("CartItemView: ", `failed to fetch, ${res}`)
                console.error("CartItemView: ", await res.json())
                return;
            }

            await mutate("/cart/index.php");
        })();
    }, [debouncedQuantity]);

    const onChange = (newValue: number) => {
        setQuantity(newValue);
    }
    const onDelete = async () => {
        const res = await fetch(`/api/cart/index.php?id=${apiItem.cart_item_id}`, {
            credentials: "include",
            method: "DELETE",
        })
        if (!res.ok) {
            console.error("CartItemView: ", `failed to fetch, ${res}`)
        }
        await mutate("/cart/index.php");
    }
    return (
        <CheckOutItem price={apiItem.price.toString()} quantity={quantity} title={apiItem.name}
                      imageURL={url || "https://placehold.co/600x600"}
                      OnDelete={onDelete} OnQuantityChange={onChange}
                      gotoURL={"/product?id=" + apiItem.product_id}
        />
    )
}