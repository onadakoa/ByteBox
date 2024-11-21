import Link from "next/link"
import Symbol from "../MaterialSymbols/Symbol"
import css from "./SearchResult.module.css"
import { Poppins, Roboto } from "next/font/google"

const roboto = Roboto({ weight: "400", subsets: ["latin"] })
const robotoPrice = Roboto({ weight: "700", subsets: ["latin"] })

export enum ResultType {
    "search" = "search",
    "product" = "inventory_2",
    "category" = "folder_open"
}

export default function Result(props: {
    type: ResultType,
    phrase: string,
    price?: string,
    currency?: string,
    href?: string,
}) {

    return (
        <Link href={props.href || "/"} className={css.container} >
            <div className={css.logo}>
                <Symbol fontSize="2rem">{props.type}</Symbol>
            </div>
            <div className={css.text}>
                <span className={roboto.className}>{props.phrase}</span>
            </div>
            <div className={css.price}>
                <span className={robotoPrice.className}>{props.price || ""} {(props.price) ? (props.currency || "zł") : ""}</span>
            </div>
        </Link>
    )
}