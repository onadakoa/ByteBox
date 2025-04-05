"use client";
import css from "./BillingAddress.module.css";
import {roboto} from "@/utils/font";
import Symbol from "@/components/MaterialSymbols/Symbol";
import {CSSProperties, FormEvent, useState} from "react";
import {Table} from "@/components/Table/Table";
import {TableField} from "@/components/Table/TableField";
import {Input} from "@/components/Form/Input";

type Tmode = "view" | "edit" | "create";

export function BillingAddressManager(props: { DontRenderAddEntry?: boolean, DontSelect?: boolean, DontShowActions?: boolean }) {
    const [selected, setSelected] = useState<number | null>(null);
    const [[mode, id], setMode] = useState<[Tmode, number]>(['view', 0]);

    const temp_data = [
        {
            id: 0, values: [
                "Wall Street 3",
                "John Smith",
                "London",
            ]
        },
        {
            id: 3, values: [
                "Wall Street 3",
                "John Smith",
                "London",
            ]
        },
        {
            id: 2, values: [
                "Wall Street 3",
                "John Smith",
                "London",
            ]
        },
        ]

    return (
        <div style={roboto.style} className={css.container}>
            {(mode === "view") || <InputF mode={mode} id={id} setMode={setMode}/>}

            {!(mode == "view") || temp_data.map((val) => (
                <Entry key={val.id} id={val.id} values={val.values} selected={val.id === selected}
                       showActions={!props.DontShowActions}
                       onSelect={(!props.DontSelect) ? () => setSelected(val.id) : undefined}
                       setMode={setMode}
                />
            ))}
            {!(mode == "view") || ((!props.DontRenderAddEntry) ? (<AddEntry setMode={setMode}/>) : null)}
        </div>
    );
}

function Entry(props: {
    values: string[],
    id: number,
    selected?: boolean,
    onSelect?: () => void,
    showActions?: boolean,
    setMode: (v: [Tmode, number]) => void
}) {
    const style: CSSProperties = {
        borderColor: (props.selected) ? "black" : undefined
    }

    const del = () => {

    }
    return (
        <div className={css.entry} style={style} onClick={props.onSelect}>
            <div>
                {props.values.map((value, i) => (
                    <span key={i}>{value}</span>
                ))}
            </div>
            {(props.showActions) ? (
                <div className={css.entryAction}>
                <span onClick={() => {
                    props.setMode(['edit', props.id]);
                }}>Edit</span>
                    <span onClick={del}>Delete</span>
                </div>
            ) : null}
        </div>
    );
}

function AddEntry({setMode}: { setMode: (v: [Tmode, number]) => void }) {
    return (
        <div className={[css.entry, css.addEntry].join(" ")} onClick={() => {
            setMode(["create", 0])
        }}>
            <Symbol wght={500} GRAD={200} fontSize={"2rem"}>add</Symbol>
        </div>
    );
}

function InputF(props: { mode: Tmode, id: number, setMode: (v: [Tmode, number]) => void }) {
    const [isLoading, setIsLoading] = useState(false);

    const save = (e: FormEvent) => {
        e.preventDefault();

        /* TODO */
    }
    const cancel = () => {
        props.setMode(['view', 0]);
    }

    if (isLoading) {
        /* TODO */
        return (
            <span>Loading</span>
        );
    }
    return (
        <form onSubmit={save}>
            <div>
                <Table>
                    <TableField value={"Imie"}><Input name={"firstname"} placeholder={"John"}/></TableField>
                    <TableField value={"Nazwisko"}><Input name={"lastname"} placeholder={"Smith"}/></TableField>
                    <TableField value={"Phone number"}><Input type={"tel"} name={"phone"} placeholder={"000000000"}/></TableField>
                    <TableField value={"Postal code"}><Input name={"postal"} placeholder={"34-600"}/></TableField>
                    <TableField value={"Street name"}><Input name={"street"} placeholder={"ul. Limonkowa"}/></TableField>
                    <TableField value={"Building number"}><Input name={"street"} placeholder={"19"}/></TableField>
                </Table>
            </div>
            <div className={css.entryAction}>
                <input type="submit" value={"Save"}/>
                <span onClick={cancel}>Cancel</span>
            </div>
        </form>
    );
}
