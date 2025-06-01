import css from "./page.module.css"
import FilterBox from "@/components/Filter/FilterBox";
import {Suspense} from "react";
import FeedController from "@/components/Feed/FeedController";
import {ApiFeed} from "@/components/Api/ApiFeed";
import {Header} from "@/components/Header/Header";
import {Card} from "@/components/Field/Card";
import {poppins} from "@/utils/font";
import Symbol from "@/components/MaterialSymbols/Symbol";

export default function Page() {
    return (
        <div className={[css.pageContainer, poppins.className].join(" ")}>
            <div className={css.banner}>
                <div className={css.bannerContent}>
                    <h1>Welcome</h1>
                    <p>Discover amazing products</p>
                </div>
            </div>

            <div className={css.mainContent}>
                <Header size="1.8rem" padding="0 0 20px 0">Our Products</Header>

                <div className={css.container}>
                    <div className={css.filterSection}>
                        <Card>
                            <div className={css.filterHeader}>
                                <Symbol fontSize="1.5rem">filter_list</Symbol>
                                <span>Filters</span>
                            </div>
                            <Suspense fallback={<div>Loading filters...</div>}>
                                <FilterBox/>
                            </Suspense>
                        </Card>
                    </div>

                    <div className={css.productsSection}>
                        <FeedController>
                            <Suspense fallback={<div className={css.loading}>Loading products...</div>}>
                                <ApiFeed/>
                            </Suspense>
                        </FeedController>
                    </div>
                </div>
            </div>
        </div>
    );
}
