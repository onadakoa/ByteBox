"use client";
import css from "./Modal.module.css";
import {ReactNode} from "react";

export const Modal = (props: {
    children?: ReactNode,
    show?: boolean,
}) => {
    return (
        <div className={css.back} style={{display: (props.show) ? undefined : "none"}}>
            <div className={css.container}>
                {props.children}
            </div>
        </div>
    );
};