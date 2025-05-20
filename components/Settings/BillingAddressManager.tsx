"use client";
import css from "./BillingAddress.module.css";
import {roboto} from "@/utils/font";
import Symbol from "@/components/MaterialSymbols/Symbol";
import {ChangeEvent, CSSProperties, FormEventHandler, useEffect, useState} from "react";
import {Table} from "@/components/Table/Table";
import {TableField} from "@/components/Table/TableField";
import {Input} from "@/components/Form/Input";
import {useAddress} from "@/hooks/useAddress";
import {mutate} from "swr";

type Tmode = "view" | "edit" | "create";

export function BillingAddressManager(props: { DontRenderAddEntry?: boolean, DontSelect?: boolean, DontShowActions?: boolean }) {
    const [selected, setSelected] = useState<number | null>(null);
    const [[mode, id], setMode] = useState<[Tmode, number]>(['view', 0]);
    const {addresses, isLoading, error} = useAddress();

    const Fields = () => {
        if (isLoading || mode !== "view") return;
        if (error) return;

        return addresses?.map((val) => {
            let values = [
                `${val.first_name} ${val.last_name},`,
                `${val.phone_number},`,
                `${val.city}, ${val.postal_code},`,
                `${val.street}, ${val.building_number}, ${val.apartment_number || ""}`,
            ];

            return (
                <Entry key={val.shipping_address_id} id={val.shipping_address_id} values={values}
                       selected={val.shipping_address_id === selected}
                       showActions={!props.DontShowActions}
                       onSelect={(!props.DontSelect) ? () => setSelected(val.shipping_address_id) : undefined}
                       setMode={setMode}
                />
            )

        })
    }

    return (
        <div style={roboto.style} className={css.container}>
            {(mode === "view") || <InputF mode={mode} id={id} setMode={setMode}/>}

            <Fields/>

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

    const del = async () => {
        const res = await fetch(`/api/shipping_address/index.php?id=${props.id}`, {
            method: "DELETE",
            credentials: "include",
        })
        if (!res.ok) {
            console.error("BillingAddressManager: ", `failed to fetch, C: ${res.status}`)
            let json = await res.json();
            console.error("BillingAddressManager: ", json)
            return;
        }
        await mutate("/shipping_address/index.php");
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
    const [isLoading, setIsLoading] = useState((props.mode === "edit"));
    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        postal_code: "",
        city: "",
        street: "",
        building_number: "",
        apartment_number: "",
    })

    useEffect(() => {
        const gather = async () => {
            if (props.mode !== "edit") return;

            const res = await fetch(`/api/shipping_address/id.php?id=${props.id || 0}`, {
                method: "GET",
                credentials: "include",
            })

            if (!res.ok) {
                console.error("BillingAddressManager: ", `failed to fetch, C: ${res.status}`)
                let json = await res.json();
                console.error("BillingAddressManager: ", json)
                handleError(json?.d);
                return;
            }

            const json = await res.json();
            setForm(json.d);
            setIsLoading(false);
        }
        gather();
    }, []);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("now")
        const {name, value} = e.target
        if (name === "phone_number") {
            let nval = value.replace(/[^0-9]/g, "");
            nval = nval.slice(0, 9);
            nval = (nval.match(/.{1,3}/g) ?? []).join("-");
            setForm({...form, [name]: nval})
        } else if (name === "postal_code") {
            let nval = value.replace(/[^0-9]/g, "");
            nval = nval.slice(0, 5);
            if (nval.length > 2) nval = nval.slice(0, 2) + "-" + nval.slice(2);
            setForm({...form, [name]: nval})
        } else if (['apartment_number', "building_number"].includes(name)) {
            let nval = value.replace(/[^0-9]/g, "");
            setForm({...form, [name]: nval})
        } else {
            setForm({...form, [name]: value})
        }
    }

    const handleError = (msg: string) => {
        setError(msg);
    }

    const save: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        let formData = new FormData(e.currentTarget);
        if (props.mode === "edit") formData.append("id", props.id.toString());

        let jsonData = Object.fromEntries(formData.entries());

        const res = await fetch("/api/shipping_address/index.php", {
            method: (props.mode === "create") ? "POST" : "PUT",
            credentials: "include",
            body: (props.mode === "create") ? formData : JSON.stringify(jsonData),
        })

        if (!res.ok) {
            console.error("BillingAddressManager: ", `failed to fetch, C: ${res.status}`)
            if (res.status == 404) {
                handleError("not found");
            } else {
                const json = await res.json();
                console.error("BillingAddressManager: ", json)
                handleError(`error: ${res.status}, ${json?.d}`)
            }
            return;
        }

        const json = await res.json();
        console.log("BillingAddressManager: ", json)
        await mutate("/shipping_address/index.php");
        setIsLoading(false);
        props.setMode(["view", 0]);
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
                    <TableField value={"First name"}><Input name={"first_name"} placeholder={"John"} value={form.first_name}
                                                            onChange={onChange}/></TableField>
                    <TableField value={"Last name"}><Input name={"last_name"} placeholder={"Smith"} value={form.last_name}
                                                           onChange={onChange}/></TableField>
                    <TableField value={"Phone number"}><Input type={"tel"} name={"phone_number"} placeholder={"000-000-000"} value={form.phone_number}
                                                              onChange={onChange}/></TableField>
                    <TableField value={"Postal code"}><Input name={"postal_code"} placeholder={"34-600"} value={form.postal_code}
                                                             onChange={onChange}/></TableField>
                    <TableField value={"City"}><Input name={"city"} placeholder={"Warszawa"} value={form.city} onChange={onChange}/></TableField>
                    <TableField value={"Street name"}><Input name={"street"} placeholder={"ul. Limonkowa"} value={form.street}
                                                             onChange={onChange}/></TableField>
                    <TableField value={"Building number"}><Input name={"building_number"} placeholder={"155"}
                                                                 value={form.building_number} onChange={onChange}/></TableField>
                    <TableField value={"Apartment number"}><Input name={"apartment_number"} placeholder={"3"}
                                                                  value={form.apartment_number} onChange={onChange}/></TableField>
                </Table>
            </div>
            <div className={css.entryAction}>
                <input type="submit" value={"Save"}/>
                <span onClick={cancel}>Cancel</span>
                <span className={css.error}>{error}</span>
            </div>
        </form>
    );
}
