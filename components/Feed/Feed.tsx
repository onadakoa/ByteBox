import Image from "next/image";
import css from "./Feed.module.css"
import {Poppins, Roboto} from "next/font/google";
import FeedButton from "@/components/Feed/FeedButton";

const poppins = Poppins({weight: "400", subsets: ["latin"]})
const roboto = Roboto({weight: "700", subsets: ["latin"]})

export default function Feed(
    props: {
        price: number,
        title: string,
        type: "active" | "unavailable",
        imageSrc?: string,
    }
) {

    return (<div className={css.container}>
        <div className={css.top}>
            <div>
                <Image src={props.imageSrc || "https://placehold.co/600x600"} alt={"image of product"} fill/>
            </div>
            <span style={poppins.style}>{props.title}</span>
        </div>
        <div className={css.bottom}>
            <span style={roboto.style}>{props.price} zł</span>
            <FeedButton type={"unavailable"}>Dodaj do koszyka</FeedButton>
        </div>
    </div>);
}