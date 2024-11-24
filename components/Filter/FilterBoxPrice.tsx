"use client"
import { useRef } from "react"
import css from "./FilterBoxPrice.module.css"
import { Roboto } from "next/font/google"

const roboto = Roboto({ weight: "100", subsets: ["latin"] })

export default function FilterBoxPrice(
    props: {
        min?: string,
        max?: string,
        onChange: (newMinValue: string, newMaxValue: string) => void
    }
) {
    const minRef = useRef<HTMLInputElement>(null);
    const maxRef = useRef<HTMLInputElement>(null);

    const onChange = () => {
        props.onChange(
            minRef.current?.value || '',
            maxRef.current?.value || '',
        )
    }

    return (
        <div className={css.container}>
            <label className={[roboto.className, css.priceInput].join(" ")}>
                <input type="number" placeholder="0" value={props.min} ref={minRef} onChange={() => { onChange() }} />
                <span>zł</span>
            </label>
            <div className={css.spacer}></div>
            <label className={[roboto.className, css.priceInput].join(" ")}>
                <input type="number" placeholder="0" value={props.max} ref={maxRef} onChange={() => { onChange() }} />
                <span>zł</span>
            </label>
        </div>
    )
}