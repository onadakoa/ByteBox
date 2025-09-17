"use client"

import css from "./CheckOutItem.module.css"
import Image from "next/image";
import {Poppins, Roboto} from "next/font/google";
import Symbol from "@/components/MaterialSymbols/Symbol";
import QuantitySelector from "@/components/Input/QuantitySelector";
import {useState} from "react";
import {useRouter} from "next/navigation";

const poppins = Poppins({subsets: ["latin"], weight: ["400", "600", "300"]})
const roboto = Roboto({subsets: ["latin"], weight: ["500", "900", "700", "400"]})

export default function CheckOutItem(props: {
    title?: string,
    imageURL?: string,
    price: string,
    quantity: number,
    gotoURL?: string,
    OnQuantityChange?: (quantity: number) => void,
    OnDelete?: () => void,
}) {
    const router = useRouter();
    const [quantity, setQuantity] = useState(props.quantity || 2);
    const onQuantitySet = (nQuantity: number) => {
        if (nQuantity < 0) return;
        setQuantity(nQuantity);
        if (props.OnQuantityChange != undefined)
            props.OnQuantityChange(nQuantity);
    }
    const gotoProduct = () => {
        if (!props.gotoURL) return;
        router.push(props.gotoURL);
    }

    return (
        <div className={css.container}>
            <div className={css.imageContainer}>
                <Image src={props.imageURL || "https://placehold.co/600x600"} alt={"picture of product"} fill style={{objectFit: "contain"}}/>
            </div>
            <div className={css.content}>
                <div className={css.description}>
                    <div className={css.hover} onClick={gotoProduct}><span className={poppins.className}>{props.title || "NONE"}</span></div>
                    <div className={css.delete} onClick={props.OnDelete}>
                        <Symbol wght={100} fontSize={"2.3rem"}>delete</Symbol>
                    </div>
                </div>
                <div className={css.action}>
                    <div>
                        <span className={roboto.className}>{props.price}zł</span>
                    </div>
                    <QuantitySelector value={quantity} setValue={onQuantitySet}/>
                </div>
            </div>
        </div>
    );
};
