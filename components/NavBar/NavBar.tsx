import Link from "next/link"
import css from "./NavBar.module.css"
import Symbol from "../MaterialSymbols/Symbol"
import Logo from "../Logo/Logo"
import SearchBar from "../SearchBar/SearchBar"
import {Suspense} from "react"
import {IfIsLoggedIn} from "@/components/Api/IfIsLoggedIn";
import {IfIsAdmin} from "@/components/Api/IfIsAdmin";


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
            <IfIsAdmin>
                <Link href={"/dashboard"} title={"Dashboard"}>
                    <Symbol>dashboard</Symbol>
                </Link>
            </IfIsAdmin>
            <IfIsLoggedIn
                ifNotLogged={
                    <Link href={"/auth"} title={"Login"}>
                        <Symbol>account_circle</Symbol>
                    </Link>
                }
            >
                <Link href={"/auth/orders"} title={"Orders"}>
                    <Symbol>receipt_long</Symbol>
                </Link>
                <Link href={"/cart"} title={"koszyk"}>
                    <Symbol>shopping_cart</Symbol>
                </Link>
                <Link href={"/auth/settings"} title={"ustawienia"}>
                    <Symbol>settings_account_box</Symbol>
                </Link>
            </IfIsLoggedIn>
        </div>
    </div>)
}