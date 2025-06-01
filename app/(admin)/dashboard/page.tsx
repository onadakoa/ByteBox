import css from "./page.module.css";
import {Card} from "@/components/Field/Card";
import {poppins} from "@/utils/font";
import React, {ReactNode} from "react";
import {Stats} from "@/components/Api/Stats";
import {ProductsManager} from "@/components/Admin/ProductsManager";
import {CategoriesManager} from "@/components/Admin/CategoriesManager";
import {OrdersManager} from "@/components/Admin/OrdersManager";

export default function page() {
    return (<div className={[poppins.className, css.container].join(" ")}>
        <div className={css.section}>
            <GridItem header={"Total users"}><Stats>user_count</Stats> users</GridItem>
            <GridItem header={"Total products"}><Stats>product_count</Stats> products</GridItem>
            <GridItem header={"Orders"}><Stats>order_count</Stats> orders</GridItem>
            <GridItem header={"Profit"}>
                <Stats>avg_product_price</Stats> zł
            </GridItem>
        </div>
        <div className={[css.section, css.section2].join(" ")}>
            <Card>
                <div className={css.cardHeader}>Products</div>
                <ProductsManager/>
            </Card>
            <Card>
                <div className={css.cardHeader}>Recent orders</div>
                <OrdersManager/>
            </Card>
            <Card>
                <div className={css.cardHeader}>Categories</div>
                <CategoriesManager/>
            </Card>
        </div>
    </div>);
}

function GridItem(props: {
    header?: ReactNode,
    children?: ReactNode
}) {
    return (<Card>
        <div className={css.cardHeader}>{props.header}</div>
        <div className={css.cardContent}>{props.children}</div>
    </Card>)
}
