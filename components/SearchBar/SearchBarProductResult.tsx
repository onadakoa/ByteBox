"use client";

import {useEffect, useState} from "react";
import Result, {ResultType} from "@/components/SearchBar/SearchResult";
import {OutPacket} from "@/utils/OutPacket";
import {IProduct} from "@/utils/Product";

export const SearchBarProductResult = (
    props: {
        id: any;
        phrase: string;
        href?: string;
    }
) => {
    const [price, setPrice] = useState("-");

    useEffect(() => {
        const controller = new AbortController();

        fetch(`/api/products/index.php?id=${props.id}`, {
            signal: controller.signal,
            method: "GET",
        }).then(res => res.json().then((data: OutPacket<IProduct>) => {
            if (!data.c) {
                setPrice(data.d.price.toString());
            }
        }))

        return () => {
            controller.abort();
        }
    }, []);

    return (
        <Result type={ResultType.product} phrase={props.phrase} href={props.href} price={price}/>
    );
};