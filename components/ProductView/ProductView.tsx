"use client";
import css from "./ProductView.module.css"
import {Poppins, Roboto} from "next/font/google";
import Button from "@/components/Button/Button";
import {ImageSelector} from "@/components/ProductView/ImageSelector";
import {useRouter, useSearchParams} from "next/navigation";
import useProduct from "@/hooks/useProduct";
import {useEffect, useState} from "react";
import {Loading} from "@/components/Loading/Loading";
import {Product} from "@/utils/Product";

const poppins = Poppins({weight: ["400", "500", "600", "700", "900"], subsets: ["latin"]})
const roboto = Roboto({weight: ["400", "500", "700", "900"], subsets: ["latin"]})

function CN(...args: string[]) {
    return args.join(" ");
}

function DetailItem({name, value}: { name: string, value: any }) {
    return <>
        <span>{name}</span>
        <span>{value}</span>
    </>
}

export function ProductView(props: {}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = Number(searchParams.get("id"));
    const {product, error, isLoading} = useProduct(id);
    const [category, setCategory] = useState<string | null>(null);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        if (isNaN(id) || id <= 0) router.push("/")
        if (product) {
            Product.getFilled(product).getCategory()?.then(cat => {
                setCategory(cat.name);
            })
        }
    }, [isLoading]);

    const add = async () => {
        if (!product) return;
        setIsFetching(true);

        let formData = new FormData();
        formData.append("product_id", product.product_id.toString());
        formData.append("quantity", "1");

        const res = await fetch("/api/cart/index.php", {
            credentials: "include",
            method: "POST",
            body: formData,
        })

        if (!res.ok) {
            console.error("ProductView: ", `failed to fetch, C: ${res.status}`)
            try {
                const json = await res.json();
                console.error("ProductView: ", json)
            } catch (err) {
                console.error("ProductView: ", err)
            }
            return;
        }

        setIsFetching(false)
    }

    return (
        <div className={css.container}>
            <div>
                <ImageSelector attachment_id={product?.attachment_id || undefined}/>
            </div>
            <div className={css.details}>
                <div className={CN(css.top)}>
                    <div className={CN(poppins.className, css.name)}>
                        {(isLoading || error) ? <Loading>-</Loading> : product.name}
                    </div>
                    <div className={CN(roboto.className, css.det)}>
                        <DetailItem name={"Category:"} value={
                            (isLoading || error || !category) ? <Loading>-</Loading> : category
                        }/>
                        <DetailItem name={"Stock:"} value={
                            (isLoading) ? <Loading>-</Loading> : product.stock
                        }/>
                    </div>
                </div>
                <div className={css.bottom}>
                    <div className={roboto.className}>
                        {(isLoading || error) ? <Loading>-</Loading> : (product.price + " zł")}
                    </div>
                    <div>
                        <Button onClick={add} backgroundColor={"var(--primary-color)"}>{(isLoading || error || isFetching || product.stock <= 0) ?
                            <Loading>-</Loading> : "Add to cart"}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}