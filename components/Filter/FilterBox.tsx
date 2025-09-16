"use client"
import css from "./FilterBox.module.css"
import {Poppins} from "next/font/google";
import FilterBoxItem from "./FilterBoxItem";
import FilterBoxSelect, {option as SelectOption} from "./FilterBoxSelect";
import {useEffect, useState} from "react";
import FilterBoxPrice from "./FilterBoxPrice";
import {useRouter, useSearchParams} from "next/navigation";
import FilterBoxSubmit from "./FilterBoxSubmit";
import {OutPacket} from "@/utils/OutPacket";
import {ICategory} from "@/utils/Category";

const poppins = Poppins({weight: "400", subsets: ["latin"]})

export default function CategoryBox() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [cat, setCat] = useState<string>(searchParams.get("category") || "0")
    const [sort, setSort] = useState(searchParams.get("sort") || "P_ASC");
    const [minPrice, setMinPrice] = useState<string>(searchParams.get("price_in") || "");
    const [maxPrice, setMaxPrice] = useState<string>(searchParams.get("price_out") || "");
    const [categories, setCategories] = useState<SelectOption[] | null>(null)

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/categories/index.php", {
                credentials: "include",
                method: "GET",
            });
            if (!res.ok) {
                console.error("FilterBox: ", `failed to fetch, ${res}`)
                return;
            }
            const json = await res.json() as OutPacket<ICategory[]>;
            if (json.c) {
                console.error("FilterBox: ", json)
                return;
            }

            setCategories(
                [
                    {value: "0", span: "-"},
                    ...json.d.map(c => {
                        return {value: c.id.toString(), span: c.name};
                    })
                ]
            );
        })();
    }, []);

    useEffect(() => {
        setCat(searchParams.get("category") || "0");
    }, [searchParams]);
    const sorts: SelectOption[] = [
        {value: "P_ASC", span: "Cena (rosnąco)",},
        {value: "P_DESC", span: "Cena (malejąco)",}
    ]

    const onSubmit = () => {
        const qr = new URLSearchParams();
        const searchQuery = searchParams.get("search") || "";
        qr.append("search", searchQuery);
        if (cat) qr.append("category", cat);
        qr.append("sort", sort);
        qr.append("price_in", minPrice);
        qr.append("price_out", maxPrice);
        router.push("/?" + qr.toString());
    }

    const onCatChange = (value: string) => {
        if (!categories) return;
        let c = categories.find((val) => val.value === value);
        setCat(c?.value || "");
    }

    return (
        <div className={[css.container, poppins.className].join(" ")}>
            <FilterBoxItem title="Kategoria">
                <FilterBoxSelect options={categories || []} value={cat} onChange={onCatChange}/>
            </FilterBoxItem>
            <FilterBoxItem title="Cena (min-max)">
                <FilterBoxPrice min={minPrice} max={maxPrice}
                                onChange={(min, max) => {
                                    setMinPrice(min)
                                    setMaxPrice(max)
                                }}/>
            </FilterBoxItem>
            <FilterBoxItem title="Sortuj">
                <FilterBoxSelect options={sorts} value={sort} onChange={(v) => {
                    setSort(v)
                }}/>
            </FilterBoxItem>
            <FilterBoxSubmit onClick={onSubmit}>Zastosuj</FilterBoxSubmit>
        </div>
    );
}