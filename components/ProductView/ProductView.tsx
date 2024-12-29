import css from "./ProductView.module.css"
import {Poppins, Roboto} from "next/font/google";
import Button from "@/components/Button/Button";
import {ImageSelector} from "@/components/ProductView/ImageSelector";

const poppins = Poppins({weight: ["400", "500", "600", "700", "900"], subsets: ["latin"]})
const roboto = Roboto({weight: ["400", "500", "700", "900"], subsets: ["latin"]})

function CN(...args: string[]) {
    return args.join(" ");
}

function DetailItem({name, value}: { name: string, value: any }) {
    return <>
        <span>{name}</span>
        <span>{value}</span>
    </>
}

export function ProductView(props: {}) {
    return (
        <div className={css.container}>
            <div>
                <ImageSelector/>
            </div>
            <div className={css.details}>
                <div className={CN(css.top)}>
                    <div className={CN(poppins.className, css.name)}>Tablet Oppo skibidi sigma</div>
                    <div className={CN(roboto.className, css.det)}>
                        <DetailItem name={"Kategoria:"} value={"something"}/>
                        <DetailItem name={"Ilość:"} value={"23"}/>
                    </div>
                </div>
                <div className={css.bottom}>
                    <div className={roboto.className}>304zł</div>
                    <div>
                        <Button backgroundColor={"var(--primary-color)"}>Dodaj do koszyka</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}