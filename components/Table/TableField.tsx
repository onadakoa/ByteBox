import React from "react";

export function TableField(ctx: { children: React.ReactNode, value: React.ReactNode }) {
    return (
        <>
            <div>{ctx.value}</div>
            <div>{ctx.children}</div>
        </>
    );
}