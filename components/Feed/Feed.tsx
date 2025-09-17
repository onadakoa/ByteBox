import Image from "next/image";
import css from "./Feed.module.css"
import {Poppins, Roboto} from "next/font/google";
import Link from "next/link";

const poppins = Poppins({weight: "400", subsets: ["latin"]})
const roboto = Roboto({weight: "700", subsets: ["latin"]})

export default function Feed(
    props: {
        price: number,
        title: string,
        type: "active" | "unavailable",
        imageSrc?: string,
        productHref?: string,
    }
) {

    return (<div className={css.container}>
        <Link href={props.productHref || "/"}>
            <div className={css.top}>
                <div>
                    <Image src={props.imageSrc || "https://placehold.co/600x600"} alt={"image of product"} style={{objectFit: "contain"}} fill/>
                </div>
                <span style={poppins.style}>{props.title}</span>
            </div>
        </Link>
        <div className={css.bottom}>
            <span style={roboto.style}>{props.price} zł</span>
            {/*<FeedButton type={"unavailable"}>Dodaj do koszyka</FeedButton>*/}
        </div>
    </div>);
}