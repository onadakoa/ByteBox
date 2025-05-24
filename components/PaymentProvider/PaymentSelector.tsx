"use client";
import css from "./PaymentSelector.module.css";
import React, {useState} from "react";
import {useProvider} from "@/hooks/useProvider";
import {poppins} from "@/utils/font";

export const PaymentSelector = (props: {
    onSelect?: (id: number) => void,
}) => {
    const {isLoading, error, providers} = useProvider();
    const [selected, setSelected] = useState<number | null>(null);

    const select = (id: number) => {
        setSelected(id);
        if (props.onSelect) props.onSelect(id);
    }

    if (isLoading || error) return;
    return (
        <div className={css.container} style={poppins.style}>
            {providers.map(provider => (
                <ProviderField key={provider.provider_id} onSelect={() => select(provider.provider_id)}
                               selected={selected === provider.provider_id}>
                    {provider.name}
                </ProviderField>))}
        </div>
    );
};

export const ProviderField = (props: {
    children?: React.ReactNode,
    onSelect?: () => void,
    selected?: boolean,
}) => {
    return (<div className={(props.selected) ? css.selected : undefined} onClick={props.onSelect}>
        {props.children}
    </div>)
}