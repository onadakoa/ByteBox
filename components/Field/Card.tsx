import css from "./Card.module.css";
import React, {CSSProperties} from "react";

export function Card(props: {
    children?: React.ReactNode,
    padding?: string,
}) {
    const style: CSSProperties = {
        padding: props.padding,
    }
    return (
        <div className={css.container} style={style}>
            {props.children}
        </div>
    );
}