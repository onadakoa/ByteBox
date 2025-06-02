"use client"
import {ChangeEvent, useEffect, useRef, useState} from "react"
import css from "./SearchBar.module.css"
import {Poppins} from "next/font/google"
import Symbol from "../MaterialSymbols/Symbol"
import {useRouter, useSearchParams} from "next/navigation"
import {useDebounce} from "@/hooks/useDebounce";

const poppins = Poppins({weight: "400", subsets: ["latin"]})

export default function SearchBar() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [value, setValue] = useState(searchParams.get("search") || "");
    const debouncedValue = useDebounce(value, 500);
    const [isInputFocused, setFocus] = useState(false);

    const searchContainer = useRef<HTMLDivElement>(null)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }
    const onSearch = () => {
        let query = new URLSearchParams(searchParams.toString())
        query.set("search", value.trim());
        if (value.trim() === "") query.delete("search");
        router.push("/?" + query.toString())
    }
    useEffect(() => {
        setValue(searchParams.get("search") || "")
    }, [searchParams.toString()])

    useEffect(() => {
        onSearch()
    }, [debouncedValue]);

    // const popupStyle: CSSProperties = {
    //     width: `${(searchContainer.current?.clientWidth || 100) - 10}px`,
    //     display: (isInputFocused && value.length > 0) ? undefined : "none",
    // }

    return (
        <div className={css.rootContainer}>
            <div className={css.container} ref={searchContainer}>
                <label>
                    <div className={[css.searchContainer, poppins.className].join(" ")}>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            onSearch()
                        }}>
                            <input type="text" value={value} onChange={onChange} placeholder="Search..."
                                   onFocus={() => {
                                       setFocus(true)
                                   }}
                                   onBlur={() => {
                                       setFocus(false)
                                   }}
                                   tabIndex={1}
                            />
                        </form>
                    </div>
                </label>
                <div className={css.searchButton} onClick={onSearch}>
                    <Symbol>search</Symbol>
                </div>
            </div>
            {/*<div className={css.popup} style={popupStyle}>*/}
            {/*    <Result type={ResultType.search} phrase={value}/>*/}
            {/*    <Result type={ResultType.product} phrase="product" price="125"/>*/}
            {/*    <Result type={ResultType.category} phrase="category"/>*/}
            {/*</div>*/}
        </div>
    )
}