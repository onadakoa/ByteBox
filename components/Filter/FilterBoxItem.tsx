import React from "react"
import css from "./FilterBoxItem.module.css"


export default function CategoryBoxItem(props: {
    children: React.ReactNode,
    title: string
}) {
    return (
        <div className={css.container}>
            <span>{props.title}</span>
            <div>{props.children}</div>
        </div>
    )
}