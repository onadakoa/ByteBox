import Symbol from "@/components/MaterialSymbols/Symbol"
import css from "./page.module.css"
import FilterBox from "@/components/Category/FilterBox";

export default function Page() {

    return (
        <div className={css.container}>
            <FilterBox />
            test
        </div>
    );
}