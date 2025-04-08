import css from "./Badge.module.css";
import React, {CSSProperties} from "react";

export type variant = "default" | "success" | "warning" | "danger" | "pending";

export default function Badge(props: {
    children?: React.ReactNode,
    variant?: variant,

    backgroundColor?: string,
    borderColor?: string,
    border?: string,
    color?: string,
    padding?: string,

    className?: string,

}) {
    const style: CSSProperties = {
        backgroundColor: props.backgroundColor,
        borderColor: props.borderColor,
        border: props.border,
        color: props.color,
        padding: props.padding,
    }
    return (
       <div className={[css.container, props.variant ? css[props.variant] : undefined, props.className].join(" ")} style={style}>{props.children}</div>
    );
}