import css from "./page.module.css"
import {ProductView} from "@/components/ProductView/ProductView";
import {ProductViewDescription} from "@/components/Api/ProductViewDescription";

export default function Page() {
    return (
        <div className={css.container}>
            <ProductView/>

            <div className={css.description}>
                <ProductViewDescription/>
            </div>
        </div>
    );
}
