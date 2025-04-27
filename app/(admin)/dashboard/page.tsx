import css from "./page.module.css";
import {Card} from "@/components/Field/Card";
import {poppins} from "@/utils/font";
import React, {ReactNode} from "react";
import ListRow, {ListRowHeader} from "@/components/Table/ListRow";
import {ListCell} from "@/components/Table/ListCell";
import {Manager} from "@/components/Admin/Manager";
import Badge from "@/components/Badge/Badge";
import {ManagerButton} from "@/components/Admin/ManagerButton";
import {List} from "@/components/Table/List";
import {ExpandableRow} from "@/components/Table/ExpandableRow";
import {Stats} from "@/components/Api/Stats";

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
                <Manager gridTemplateColumns={"100px 1fr 100px"}
                         additionalButtons={
                             <>
                                 <ManagerButton>Add item</ManagerButton>
                             </>
                         }
                >
                    <ListRowHeader>
                        <ListCell centerHorizontal>id</ListCell>
                        <ListCell>name</ListCell>
                        <ListCell centerHorizontal>price</ListCell>
                    </ListRowHeader>
                    <ListRow>
                        <ListCell centerHorizontal>#32</ListCell>
                        <ListCell>Muhamed Slicks</ListCell>
                        <ListCell centerHorizontal>32 zł</ListCell>
                    </ListRow>
                </Manager>
            </Card>
            <Card>
                <div className={css.cardHeader}>Recent orders</div>
                <Manager gridTemplateColumns={"100px 1fr 125px 125px"} dontShowAction>
                    <ListRowHeader>
                        <ListCell centerHorizontal>Id</ListCell>
                        <ListCell>User</ListCell>
                        <ListCell centerHorizontal>Total price</ListCell>
                        <ListCell centerHorizontal>Status</ListCell>
                    </ListRowHeader>
                    <ListRow>
                        <ListCell centerHorizontal>#3</ListCell>
                        <ListCell>Aldi Almanacs</ListCell>
                        <ListCell centerHorizontal>3,255 zł</ListCell>
                        <ListCell centerHorizontal><Badge variant={"pending"}>Pending</Badge></ListCell>
                    </ListRow>
                    <ListRow>
                        <ListCell centerHorizontal>#2</ListCell>
                        <ListCell>Aldi Almanacs</ListCell>
                        <ListCell centerHorizontal>3,255 zł</ListCell>
                        <ListCell centerHorizontal><Badge variant={"pending"}>Pending</Badge></ListCell>
                    </ListRow>
                </Manager>
            </Card>
            <Card>
                <div className={css.cardHeader}>Categories</div>
                <Manager gridTemplateColumns={"100px 1fr 125px"}>
                    <ListRowHeader>
                        <ListCell centerHorizontal>Id</ListCell>
                        <ListCell>Name</ListCell>
                        <ListCell centerHorizontal>Total Aliases</ListCell>
                    </ListRowHeader>
                    <ExpandableRow backgroundColor={"white"} content={
                        <List gridTemplateColumns={"75px 1fr"}>
                            <ListRowHeader>
                                <ListCell centerHorizontal>Id</ListCell>
                                <ListCell>Alias</ListCell>
                            </ListRowHeader>
                            <ListRow>
                                <ListCell centerHorizontal>#2</ListCell>
                                <ListCell>Computers</ListCell>
                            </ListRow>
                        </List>
                    }>
                        <ListCell centerHorizontal>#53</ListCell>
                        <ListCell>Technology</ListCell>
                        <ListCell centerHorizontal>3</ListCell>
                    </ExpandableRow>
                </Manager>
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