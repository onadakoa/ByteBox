import css from "./page.module.css"
import {ProductView} from "@/components/ProductView/ProductView";
import {ProductViewDescription} from "@/components/Api/ProductViewDescription";
import {Suspense} from "react";

export default function Page() {
    return (
        <div className={css.container}>
            <Suspense>
                <ProductView/>
            </Suspense>

            <div className={css.description}>
                <Suspense>
                    <ProductViewDescription/>
                </Suspense>
            </div>
        </div>
    );
}
