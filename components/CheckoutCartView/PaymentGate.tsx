"use client";
import css from "./PaymentGate.module.css";
import {useModal} from "@/utils/ModalContext";
import {BillingAddressManager} from "@/components/Settings/BillingAddressManager";
import {useState} from "react";
import {PaymentSelector} from "@/components/PaymentProvider/PaymentSelector";
import {Header} from "@/components/Header/Header";
import {PaymentSummary} from "@/components/CheckoutCartView/PaymentSummary";

export const PaymentGate = () => {
    const [showModal, closeModal] = useModal();
    const [billingAddressId, setBillingAddressId] = useState<number | null>(null);
    const [paymentMethodId, setPaymentMethodId] = useState<number | null>(null);

    return (
        <div className={css.container}>
            <div className={css.nav}>
                <div className={css.hover} onClick={closeModal}>x</div>
            </div>
            <div className={css.content}>
                <div className={css.selectors}>
                    <Header padding={"0"}>Billing Address</Header>
                    <BillingAddressManager onSelect={id => setBillingAddressId(id)}/>
                    <Header padding={"0"}>Payment Method</Header>
                    <PaymentSelector onSelect={id => setPaymentMethodId(id)}/>
                </div>
                <div className={css.gate}>
                    <Header padding={"0"}>Payment</Header>
                    <PaymentSummary paymentMethodId={paymentMethodId || undefined} billingAddressId={billingAddressId || undefined}/>
                </div>
            </div>
        </div>
    );
};