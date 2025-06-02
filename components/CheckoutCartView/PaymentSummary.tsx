"use client";
import css from "./PaymentSummary.module.css";
import { useCart } from "@/hooks/useCart";
import { useAddress } from "@/hooks/useAddress";
import { poppins } from "@/utils/font";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button/Button";
import { Loading } from "@/components/Loading/Loading";
import { IShippingAddress } from "@/utils/ShippingAddress";
import { useProvider } from "@/hooks/useProvider";
import { IProvider } from "@/utils/Provider";

export const PaymentSummary = (props: {
    paymentMethodId?: number,
    billingAddressId?: number,
}) => {
    const cartData = useCart();
    const addressData = useAddress();
    const providers = useProvider();
    const [address, setAddress] = useState<IShippingAddress | undefined>(undefined);
    const [provider, setProvider] = useState<IProvider | undefined>(undefined);

    useEffect(() => {
        if (cartData.isLoading || addressData.isLoading || providers.isLoading) return;

        setProvider(providers.providers.find(p => p.provider_id === props.paymentMethodId));
        setAddress(addressData.addresses.find(a => a.shipping_address_id === props.billingAddressId));
    }, [props.paymentMethodId, props.billingAddressId, cartData, addressData, providers]);

    const onPay = async () => {
        if (!props.billingAddressId || !props.paymentMethodId) return;
        const formdata = new FormData();
        formdata.append("shipping_address_id", props.billingAddressId.toString());
        formdata.append("provider_id", props.paymentMethodId.toString());
        const res = await fetch("/api/checkout/index.php", {
            credentials: "include",
            method: "POST",
            body: formdata,
        })
        if (!res.ok) {
            try {
                const json = await res.json();
                console.error("onPay error: ", json)
            } catch (e) {
                console.error("onPay error:",e);
            }
        }

        const json = await res.json();
        console.log(json);
        // TODO
    }

    return (
        <div className={[css.container, poppins.className].join(" ")}>
            <div>
                <ListItem name={"Payment Method:"}>
                    <Later>
                        {provider?.name}
                    </Later>
                </ListItem>
                <ListItem name={"Phone Number:"}><Later>{address?.phone_number}</Later></ListItem>
                <ListItem name={"Taker:"}><Later>{(address) ? `${address.first_name} ${address.last_name}` : undefined}</Later></ListItem>
                <ListItem name={"To pay:"}><Later>{cartData.info.total_price}zł</Later></ListItem>
            </div>
            <div>
                <Button onClick={onPay}>Pay</Button>
            </div>
        </div>
    );
};

export function ListItem(props: {
    name?: string,
    children?: React.ReactNode,
}) {
    return (
        <div className={css.listItem}>
            <span className={css.name}>{props.name}</span>
            <span className={css.value}>{props.children}</span>
        </div>
    )
}

export function Later(props: { children?: React.ReactNode }) {
    if (props.children) return props.children;
    return (<Loading>-</Loading>)
}