"use client"
import css from "./FilterBoxSelect.module.css"

export type option = { value: string, span?: string }

export default function FilterBoxSelect(props: {
    options: option[],
    value?: string,
    onChange: (newValue: string) => void,
}) {

    return (
        <select className={css.container} value={props.value} onChange={(e) => {
            props.onChange(e.target.value)
        }}>
            {props.options.map((v, i) => {
                return (
                    <option key={v.value} value={v.value}>{v.span || v.value}</option>
                );
            })}
        </select>
    )
}