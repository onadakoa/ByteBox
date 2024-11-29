import Symbol from "@/components/MaterialSymbols/Symbol"
import css from "./page.module.css"
import FilterBox from "@/components/Filter/FilterBox";
import { Suspense } from "react";
import Feed from "@/components/Feed/Feed";
import FeedController from "@/components/Feed/FeedController";

export default function Page() {

    return (
        <div className={css.container}>
            <Suspense>
                <FilterBox />
                <FeedController>
                    <Feed price={233} title={"AKKO keyboard 5325B plus v2"} type={"active"}/>
                    <Feed price={233} title={"AKKO keyboard 5325B plus v2"} type={"active"}/>
                    <Feed price={233} title={"AKKO keyboard 5325B plus v2"} type={"active"}/>
                    <Feed price={233} title={"AKKO keyboard 5325B plus v2"} type={"active"}/>
                    <Feed price={233} title={"AKKO keyboard 5325B plus v2"} type={"active"}/>
                    <Feed price={233} title={"AKKO keyboard 5325B plus v2"} type={"active"}/>
                    <Feed price={233} title={"AKKO keyboard 5325B plus v2"} type={"active"}/>
                    <Feed price={233} title={"AKKO keyboard 5325B plus v2"} type={"active"}/>
                    <Feed price={233} title={"AKKO keyboard 5325B plus v2"} type={"active"}/>
                    <Feed price={233} title={"AKKO keyboard 5325B plus v2"} type={"active"}/>
                    <Feed price={233} title={"AKKO keyboard 5325B plus v2"} type={"active"}/>
                    <Feed price={233} title={"AKKO keyboard 5325B plus v2"} type={"active"}/>
                </FeedController>
            </Suspense>
        </div>
    );
}