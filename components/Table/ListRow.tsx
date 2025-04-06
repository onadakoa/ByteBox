"use client";
import css from "./ListRow.module.css";
import React, {CSSProperties} from "react";
import {useListContext} from "@/utils/ListContext";

export default function ListRow(props: { children: React.ReactNode, padding?: string, className?: string }) {
    const grid = useListContext();

    const style: CSSProperties = {
        padding: props.padding,
        gridTemplateColumns: grid.gridTemplateColumns,
    }
    return (
        <div className={[css.container, props.className].join(" ")} style={style}>
            {props.children}
        </div>
    );
}

export function ListRowHeader(props: { children: React.ReactNode, padding?: string, className?: string }) {
    const grid = useListContext();

    const style: CSSProperties = {
        padding: props.padding,
        gridTemplateColumns: grid.gridTemplateColumns,
    }
    return (
        <div className={[css.container, css.header, props.className].join(" ")} style={style}>
            {props.children}
        </div>
    );
}
