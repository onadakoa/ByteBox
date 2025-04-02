import css from "./Table.module.css"
import React from "react";

export const Table = (ctx: { children: React.ReactNode, rowGap?: string, columnGap?: string }) => {
    return (
        <div className={css.container} style={{rowGap: ctx.rowGap, columnGap: ctx.columnGap}}>
            {ctx.children}
        </div>
    );
};