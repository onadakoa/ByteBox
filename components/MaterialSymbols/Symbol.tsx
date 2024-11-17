import { CSSProperties } from "react";

export type SymbolType = "outlined" | "rounded" | "sharp";

export default function Symbol(props: {
    children: string,
    type?: SymbolType
    FILL?: boolean
    wght?: number,
    GRAD?: number,
    opsz?: number,
    fontSize?: string,
}) {
    const style: CSSProperties = {
        fontSize: props.fontSize,
        fontVariationSettings: `
        'FILL' ${Number(props.FILL || false)},
        'wght' ${props.wght || 400},
        'GRAD' ${props.GRAD || 0},
        'opsz' ${props.opsz || 24} 
        `
    }
    return (<span className={`material-symbols-${props.type || "outlined"}`} style={style}>{props.children}</span>)
}


