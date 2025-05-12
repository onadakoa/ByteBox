import css from "./page.module.css"
import FilterBox from "@/components/Filter/FilterBox";
import {Suspense} from "react";
import FeedController from "@/components/Feed/FeedController";
import {ApiFeed} from "@/components/Api/ApiFeed";

export default function Page() {

    return (
        <div className={css.container}>
            <Suspense>
                <FilterBox/>
                <FeedController>
                    <ApiFeed/>
                </FeedController>
            </Suspense>
        </div>
    );
}