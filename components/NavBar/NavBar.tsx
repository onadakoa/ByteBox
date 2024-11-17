import Link from "next/link"
import css from "./NavBar.module.css"
import Symbol from "../MaterialSymbols/Symbol"
import Logo from "../Logo/Logo"
import SearchBar from "../SearchBar/SearchBar"


export default function NavBar() {

    return (<div className={css.container}>
        <div className={css.logoContainer}>
            <Link href={"/"}>
                <Logo />
            </Link>
        </div>
        <div>
            <SearchBar />
        </div>
        <div className={css.iconsContainer}>
            <Link href={"/"}>
                <Symbol>account_circle</Symbol>
            </Link>
            <Link href={"/"}>
                <Symbol>shopping_cart</Symbol>
            </Link>
        </div>
    </div>)
}