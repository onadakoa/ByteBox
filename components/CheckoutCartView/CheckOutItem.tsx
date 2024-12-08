"use client"

import css from "./CheckOutItem.module.css"
import Image from "next/image";
import {Poppins, Roboto} from "next/font/google";
import Symbol from "@/components/MaterialSymbols/Symbol";
import QuantitySelector from "@/components/Input/QuantitySelector";
import {useState} from "react";

const poppins = Poppins({subsets: ["latin"], weight: ["400", "600", "300"]})
const roboto = Roboto({subsets: ["latin"], weight: ["500", "900", "700", "400"]})

export default function CheckOutItem(props: {}) {
    const [quantity, setQuantity] = useState(2);
    const onQuantitySet = (nprice: number) => {
        if (nprice <= 0) return;
        setQuantity(nprice)
    }

    return (
        <div className={css.container}>
            <div className={css.imageContainer}>
                <Image src={"https://placehold.co/600x600"} alt={"image of product"} fill={true}/>
            </div>
            <div className={css.content}>
                <div className={css.description}>
                    <div><span className={poppins.className}>Tablet oppo</span></div>
                    <div className={css.delete}>
                        <Symbol wght={100} fontSize={"2.3rem"}>delete</Symbol>
                    </div>
                </div>
                <div className={css.action}>
                    <div>
                        <span className={roboto.className}>309zł</span>
                    </div>
                    <QuantitySelector value={quantity} setValue={onQuantitySet}/>
                </div>
            </div>
        </div>
    );
};
