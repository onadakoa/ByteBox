import css from "./page.module.css"
import {Poppins, Roboto} from "next/font/google";
import IconButton from "@/components/Button/IconButton";
import Symbol from "@/components/MaterialSymbols/Symbol";
import CheckOut from "@/components/CheckoutCartView/Checkout";
import {RequireAuth} from "@/components/Api/RequireAuth";
import {CartItemsList} from "@/components/Api/CartItemsList";

const poppins = Poppins({weight: ["900", "700", "800", "400", "200"], subsets: ["latin"]});
const roboto = Roboto({weight: ["900", "400", "300"], subsets: ["latin"]})

export default function Page() {

    return (
        <div className={css.container}>
            <RequireAuth type={"loggedIn"}/>
            <div className={css.cart_container}>
                <div className={css.upper}>
                    <span style={poppins.style}>Cart</span>
                    <div className={roboto.className}>
                        <IconButton
                            icon={(
                                <Symbol
                                    fontSize={"1.5rem"}
                                    wght={200}
                                >delete_forever</Symbol>
                            )}
                            onClick={undefined}
                        >clear all</IconButton>
                    </div>
                </div>
                <div className={css.content}>
                    <div className={css.itemList}>
                        <CartItemsList/>
                    </div>
                    <div className={css.checkout}>
                        <CheckOut/>
                    </div>
                </div>
            </div>
        </div>)
}