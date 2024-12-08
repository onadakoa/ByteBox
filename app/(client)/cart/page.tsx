import css from "./page.module.css"
import {Poppins, Roboto} from "next/font/google";
import IconButton from "@/components/Button/IconButton";
import Symbol from "@/components/MaterialSymbols/Symbol";
import CheckOut from "@/components/CheckoutCartView/Checkout";
import CheckOutItem from "@/components/CheckoutCartView/CheckOutItem";

const poppins = Poppins({weight: ["900", "700", "800", "400", "200"], subsets: ["latin"]});
const roboto = Roboto({weight: ["900", "400", "300"], subsets: ["latin"]})

export default function Page() {

    return (<div className={css.container}>
        <div className={css.cart_container}>
            <div className={css.upper}>
                <span style={poppins.style}>Twój Koszyk</span>
                <div className={roboto.className}>
                    <IconButton
                        icon={(
                            <Symbol
                                fontSize={"1.5rem"}
                                wght={200}
                            >delete_forever</Symbol>
                        )}>Usuń Wszystko</IconButton>
                </div>
            </div>
            <div className={css.content}>
                <div className={css.itemList}>
                    <CheckOutItem/>
                    <CheckOutItem/>
                </div>
                <div className={css.checkout}>
                    <CheckOut price={"1313"}/>
                </div>
            </div>
        </div>
    </div>)
}