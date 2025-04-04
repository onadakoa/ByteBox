import css from "./Field.module.css"
import {CSSProperties} from "react";

export function Field(ctx: { children?: React.ReactNode, padding?: string, height?: string, width?: string }) {
    const style: CSSProperties = {
        padding: ctx.padding,
        height: ctx.height,
        width: ctx.width,
    }
    return (
        <div className={css.container} style={style}>
            {ctx.children}
        </div>
    );
}