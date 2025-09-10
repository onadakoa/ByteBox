"use client"
import {ChangeEvent, CSSProperties, useEffect, useRef, useState} from "react"
import css from "./SearchBar.module.css"
import {Poppins} from "next/font/google"
import Symbol from "../MaterialSymbols/Symbol"
import {useRouter, useSearchParams} from "next/navigation"
import {useDebounce} from "@/hooks/useDebounce";
import Result, {ResultType} from "@/components/SearchBar/SearchResult";
import {DynamicSearch, FilledDynamicProductSearch, FilledDynamicSearch} from "@/utils/DynamicSearch";
import {API_HOSTNAME} from "@/utils/api";
import {OutPacket} from "@/utils/OutPacket";

const poppins = Poppins({weight: "400", subsets: ["latin"]})

export default function SearchBar() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [dynamicSearchEntries, setDynamicSearchEntries] = useState<DynamicSearch[]>([]);
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
    const onDynamicSearch = async () => {
        let res = await fetch(API_HOSTNAME+"/search?search=" + debouncedValue.toString());
        let json = await res.json() as OutPacket<DynamicSearch[]>;

        setDynamicSearchEntries(json.d);
    }

    useEffect(() => {
        setValue(searchParams.get("search") || "")
    }, [searchParams.toString()])

    useEffect(() => {
        onDynamicSearch();
    }, [debouncedValue]);

    const popupStyle: CSSProperties = {
        width: `${(searchContainer.current?.clientWidth || 100) - 10}px`,
        display: (isInputFocused && value.length > 0) ? undefined : "none",
    }

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
            <div className={css.popup} style={popupStyle}>
                <Result type={ResultType.search} phrase={value}/>
                <Result type={ResultType.product} phrase="product" price="125"/>
                <Result type={ResultType.category} phrase="category"/>
                {
                    dynamicSearchEntries.map((v,i) => {
                        let [price,setPrice] = useState<undefined|string>(undefined);
                        if (v.type == "product"){
                            (async () => {
                                let prod = FilledDynamicProductSearch.getFilled(v) as FilledDynamicProductSearch;
                                // prod.getPrice().then((v) => {
                                //     setPrice(v);
                                // })
                            })();
                        }
                        return (<Result type={ResultType[v.type]} phrase={v.name} price={price}/>);
                    })
                }
            </div>
        </div>
    )
}