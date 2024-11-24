import Symbol from "@/components/MaterialSymbols/Symbol"
import css from "./page.module.css"
import FilterBox from "@/components/Filter/FilterBox";
import { Suspense } from "react";
import Feed from "@/components/Feed/Feed";

export default function Page() {

    return (
        <div className={css.container}>
            <Suspense>
                <FilterBox />
                <Feed price={233} title={"AKKO keyboard 5325B plus v2"} type={"active"}/>
            </Suspense>
        </div>
    );
}