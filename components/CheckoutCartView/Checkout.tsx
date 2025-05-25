"use client";
import css from "./Checkout.module.css"
import {Poppins, Roboto} from "next/font/google";
import Button from "@/components/Button/Button";
import {useCart} from "@/hooks/useCart";
import {useModal} from "@/utils/ModalContext";
import {PaymentGate} from "@/components/CheckoutCartView/PaymentGate";

const poppins = Poppins({subsets: ["latin"], weight: ["100", "200", "400"]});
const roboto = Roboto({subsets: ["latin"], weight: ["900", "700", "500"]});

const ListItem = (props: { title: string, value: string }) => {
    return (<div>
        <span className={poppins.className}>{props.title}</span>
        <span className={roboto.className}>{props.value}</span>
    </div>)
}

export default function CheckOut() {
    const [showModal, closeModal] = useModal();
    const {info, isLoading, error} = useCart();
    if (isLoading || error) return;

    const onPay = async () => {
        showModal((<PaymentGate/>));
    }

    return (<div className={css.container}>
        <div className={css.list}>
            <ListItem title={"items:"} value={`${info.count} (${info.total_quantity})`}/>
            <ListItem title={"To pay:"} value={info.total_price + " zł"}/>
        </div>
        <Button onClick={onPay}>Pay</Button>
    </div>)
}