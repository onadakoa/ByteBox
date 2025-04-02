import css from "./Header.module.css"
import {poppins, roboto} from "@/utils/font";
import {CSSProperties} from "react";

export const Header = (ctx: { children: string, weight?: string, size?: string, padding?: string }) => {
    const style: CSSProperties = {
        ...poppins.style,
        padding: ctx.padding,
        fontSize: ctx.size,
        fontWeight: ctx.weight
    }
    return (
        <div className={css.container} style={style}>
            {ctx.children}
        </div>
    );
};