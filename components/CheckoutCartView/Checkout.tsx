import css from "./Checkout.module.css"
import {Poppins, Roboto} from "next/font/google";
import Button from "@/components/Button/Button";
import Link from "next/link";

const poppins = Poppins({subsets: ["latin"], weight: ["100", "200", "400"]});
const roboto = Roboto({subsets: ["latin"], weight: ["900", "700", "500"]});

const ListItem = (props: { title: string, value: string }) => {
    return (<div>
        <span className={poppins.className}>{props.title}</span>
        <span className={roboto.className}>{props.value}</span>
    </div>)
}

const PossiblyLink = (props: {children: React.ReactNode,href?: string, onClick?: () => void}) => {
    if (props.href != undefined) {
        return (
            <Link href={props.href}>{props.children}</Link>
        )
    }
    return props.children;
}

export default function CheckOut(props: {
    price: string,
    href?: string,
    onClick?: () => void,
}) {

    return (<div className={css.container}>
        <div className={css.list}>
            <ListItem title={"Do zapłaty:"} value={"1,500zł"}/>
        </div>
        <PossiblyLink href={props.href}>
            <Button backgroundColor={""} onClick={props.onClick}>Do Zapłaty</Button>
        </PossiblyLink>
    </div>)
}