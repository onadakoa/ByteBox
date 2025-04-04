import css from "./Field.module.css"
import {CSSProperties} from "react";

export function Field(ctx: { children?: React.ReactNode, padding?: string }) {
    const style: CSSProperties = {
        padding: ctx.padding
    }
    return (
        <div className={css.container} style={style}>
            {ctx.children}
        </div>
    );
}