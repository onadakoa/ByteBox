import css from "./page.module.css"
import {Header} from "@/components/Header/Header";
import {List} from "@/components/Table/List";
import {Field} from "@/components/Field/Field";
import ListRow, {ListRowHeader} from "@/components/Table/ListRow";
import {ListCell} from "@/components/Table/ListCell";
import React from "react";
import {ExpandableRow} from "@/components/Table/ExpandableRow";
import Badge from "@/components/Badge/Badge";

export default function Page() {

    return (
        <div className={css.mainContainer}>
            <Field padding={"10px"}>
                <Header padding={"5px"}>Orders</Header>
                <List className={css.list} gridTemplateColumns={"100px 1fr 150px 150px"}>
                    <ListRowHeader>
                        <ListCell>Order Id</ListCell>
                        <ListCell>Date</ListCell>
                        <ListCell centerHorizontal>Status</ListCell>
                        <ListCell centerHorizontal>Total price</ListCell>
                    </ListRowHeader>
                    <ListRow padding={"5px 0"}>
                        <ListCell>#32</ListCell>
                        <ListCell>03.04.2025</ListCell>
                        <ListCell centerHorizontal>Pending</ListCell>
                        <ListCell centerHorizontal>124,39 zł</ListCell>
                    </ListRow>
                    <ListRow padding={"5px 0"}>
                        <ListCell>#32</ListCell>
                        <ListCell>03.04.2025</ListCell>
                        <ListCell centerHorizontal><Badge variant={"pending"}>Pending</Badge></ListCell>
                        <ListCell centerHorizontal>124,39 zł</ListCell>
                    </ListRow>
                    <ExpandableRow padding={"5px 0"} content={
                        <List gridTemplateColumns={"50px 3fr 100px 100px"}>
                            <ListRowHeader>
                                <ListCell>#id</ListCell>
                                <ListCell>product</ListCell>
                                <ListCell centerHorizontal>price</ListCell>
                                <ListCell centerHorizontal>quantity</ListCell>
                            </ListRowHeader>
                            <ListRow>
                                <ListCell>#32</ListCell>
                                <ListCell>Akko keyboard</ListCell>
                                <ListCell centerHorizontal>124,39 zł</ListCell>
                                <ListCell centerHorizontal>3</ListCell>
                            </ListRow>
                            <ListRow>
                                <ListCell>#32</ListCell>
                                <ListCell>Akko keyboard</ListCell>
                                <ListCell centerHorizontal>124,39 zł</ListCell>
                                <ListCell centerHorizontal>3</ListCell>
                            </ListRow>
                        </List>
                    }>
                        <ListCell>#32</ListCell>
                        <ListCell>03.04.2025</ListCell>
                        <ListCell centerHorizontal><Badge>Pending</Badge></ListCell>
                        <ListCell centerHorizontal>124,39 zł</ListCell>
                    </ExpandableRow>
                </List>
            </Field>
        </div>
    );
}