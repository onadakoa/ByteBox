import Link from "next/link"
import css from "./NavBar.module.css"
import Symbol from "../MaterialSymbols/Symbol"
import Logo from "../Logo/Logo"
import SearchBar from "../SearchBar/SearchBar"
import {Suspense} from "react"


export default function NavBar() {

    return (<div className={css.container}>
        <div className={css.logoContainer}>
            <Link href={"/"}>
                <Logo/>
            </Link>
        </div>
        <div>
            <Suspense>
                <SearchBar/>
            </Suspense>
        </div>
        <div className={css.iconsContainer}>
            <Link href={"/auth"}>
                <Symbol>account_circle</Symbol>
            </Link>
            <Link href={"/cart"}>
                <Symbol>shopping_cart</Symbol>
            </Link>
        </div>
    </div>)
}