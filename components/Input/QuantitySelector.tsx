"use client"
import css from "./QuantitySelector.module.css"
import {Roboto} from "next/font/google";

const roboto = Roboto({subsets: ["latin"], weight: ["700", "900"]})

export default function QuantitySelector(props: {
    value: number;
    setValue?: (value: number) => void;
}) {
    return (
        <div style={roboto.style} className={css.container}>
            <div onClick={
                () => {
                    props.setValue?.(props.value - 1);
                }
            }>-
            </div>
            <div>{props.value}</div>
            <div
                onClick={() => {
                    props.setValue?.(props.value + 1);
                }}
            >+
            </div>
        </div>
    );
}
