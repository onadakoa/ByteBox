"use client";
import css from "./ListRow.module.css";
import React, {CSSProperties} from "react";
import {useListContext} from "@/utils/ListContext";

export type RowProps = { children: React.ReactNode, padding?: string, className?: string };

export default function ListRow(props: RowProps) {
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

export function ListRowHeader(props: RowProps) {
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
