import css from "./Loading.module.css";
import React from "react";

export function Loading(props: {
    children?: React.ReactNode;
}) {
    return (
        <span className={css.container}>{props.children}</span>
    );
}