import css from "./page.module.css"
import {Poppins} from "next/font/google";
import {ProductView} from "@/components/ProductView/ProductView";

const poppinsDesc = Poppins({weight: ["400", "600", "700", "900"], subsets: ["latin"]});

export default function Page() {
    return (
        <div className={css.container}>
            <ProductView/>

            <div className={css.description}>
                <div className={poppinsDesc.className}>Opis</div>
                <hr/>
                <div className={poppinsDesc.className}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Dignissimos exercitationem facilis fuga,
                    nihil odio quae quas quia sit ullam vero! Deleniti fugiat fugit hic ipsum nihil odit provident
                    reiciendis, velit.
                </div>
            </div>
        </div>
    );
}
