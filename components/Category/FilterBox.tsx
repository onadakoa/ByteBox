"use client"
import css from "./FilterBox.module.css"
import { Poppins } from "next/font/google";
import FilterBoxItem from "./FilterBoxItem";
import FilterBoxSelect, { option as SelectOption } from "./FilterBoxSelect";
import { useActionState, useEffect, useState } from "react";
import FilterBoxPrice from "./FilterBoxPrice";
import { useRouter, useSearchParams } from "next/navigation";
import FilterBoxSubmit from "./FilterBoxSubmit";
const poppins = Poppins({ weight: "400" })

export default function CategoryBox() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [cat, setCat] = useState(searchParams.get("category") || "main")
    const [sort, setSort] = useState(searchParams.get("sort") || "sortUP");
    const [minPrice, setMinPrice] = useState<string>(searchParams.get("price_min") || "");
    const [maxPrice, setMaxPrice] = useState<string>(searchParams.get("price_max") || "");

    const categories: SelectOption[] = [
        { value: "main", span: "main category" },
        { value: "main2", span: "second category" },
    ]
    const sorts: SelectOption[] = [
        { value: "priceUP", span: "Cena (rosnąco)", },
        { value: "priceDOWN", span: "Cena (malejąco)", }
    ]

    const onSubmit = () => {
        const searchQuery = searchParams.get("search") || "";
        const query = `/?search=${searchQuery}&category=${cat}&sort=${sort}&price_min=${minPrice}&price_max=${maxPrice}`;
        router.push(query);
    }

    useEffect(() => {
        setCat(searchParams.get("category") || "main")
        setSort(searchParams.get("sort") || "sortUP")
        setMinPrice((searchParams.get("price_min") || ""))
        setMaxPrice((searchParams.get("price_max") || ""))
    }, [searchParams.toString()])

    return (
        <div className={[css.container, poppins.className].join(" ")}>
            <FilterBoxItem title="Kategoria">
                <FilterBoxSelect options={categories} value={cat} onChange={(v) => { setCat(v) }} />
            </FilterBoxItem>
            <FilterBoxItem title="Cena (min-max)">
                <FilterBoxPrice min={minPrice} max={maxPrice}
                    onChange={(min, max) => {
                        setMinPrice(min)
                        setMaxPrice(max)
                    }} />
            </FilterBoxItem>
            <FilterBoxItem title="Sortuj">
                <FilterBoxSelect options={sorts} value={sort} onChange={(v) => { setSort(v) }} />
            </FilterBoxItem>
            <FilterBoxSubmit onClick={onSubmit}>Zastosuj</FilterBoxSubmit>
        </div>
    );
}