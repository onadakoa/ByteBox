"use client"
import { ChangeEvent, CSSProperties, useEffect, useRef, useState } from "react"
import css from "./SearchBar.module.css"
import { Poppins } from "next/font/google"
import Symbol from "../MaterialSymbols/Symbol"
import Result, { ResultType } from "./SearchResult"
import { useRouter, useSearchParams } from "next/navigation"

const poppins = Poppins({ weight: "400" })

export default function SearchBar() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [value, setValue] = useState(searchParams.get("search") || "");
    const [isInputFocused, setFocus] = useState(false);

    const searchContainer = useRef<HTMLDivElement>(null)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }
    const onSearch = () => {
        let query = new URLSearchParams(searchParams.toString())
        query.set("search", value.trim());
        router.push("/?" + query.toString())
    }
    useEffect(() => {
        setValue(searchParams.get("search") || "")
    }, [searchParams.toString()])

    const popupStyle: CSSProperties = {
        width: `${(searchContainer.current?.clientWidth || 100) - 10}px`,
        display: (isInputFocused && value.length > 0) ? undefined : "none",
    }

    return (
        <div className={css.rootContainer}>
            <div className={css.container} ref={searchContainer}>
                <label>
                    <div className={[css.searchContainer, poppins.className].join(" ")}>
                        <input type="text" value={value} onChange={onChange} placeholder="Search..."
                            onKeyDown={(e) => { if (e.key == "Enter") onSearch() }}
                            onFocus={() => { setFocus(true) }}
                            onBlur={() => { setFocus(false) }}
                            tabIndex={1}
                        />
                    </div>
                </label>
                <div className={css.searchButton} onClick={onSearch}>
                    <Symbol>search</Symbol>
                </div>
            </div>
            <div className={css.popup} style={popupStyle}>
                <Result type={ResultType.search} phrase={value} />
                <Result type={ResultType.product} phrase="product" price="125" />
                <Result type={ResultType.category} phrase="category" />
            </div>
        </div>
    )
}