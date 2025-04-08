import css from "./page.module.css"
import {Header} from "@/components/Header/Header";
import {List} from "@/components/Table/List";
import {Field} from "@/components/Field/Field";
import ListRow, {ListRowHeader} from "@/components/Table/ListRow";
import {ListCell} from "@/components/Table/ListCell";
import React from "react";
import {ExpandableRow} from "@/components/Table/ExpandableRow";

export default function Page() {

    return (
        <div className={css.mainContainer}>
            <Field padding={"10px"}>
                <Header padding={"5px"}>Orders</Header>
                <List className={css.list} gridTemplateColumns={"100px 1fr 1fr 1fr"}>
                    <ListRowHeader>
                        <ListCell>Order Id</ListCell>
                        <ListCell>Date</ListCell>
                        <ListCell>Status</ListCell>
                        <ListCell>Total price</ListCell>
                    </ListRowHeader>
                    <ListRow padding={"5px 0"}>
                        <ListCell>#32</ListCell>
                        <ListCell>03.04.2025</ListCell>
                        <ListCell>Pending</ListCell>
                        <ListCell>124,39 zł</ListCell>
                    </ListRow>
                    <ListRow padding={"5px 0"}>
                        <ListCell>#32</ListCell>
                        <ListCell>03.04.2025</ListCell>
                        <ListCell>Pending</ListCell>
                        <ListCell>124,39 zł</ListCell>
                    </ListRow>
                    <ExpandableRow padding={"5px 0"} content={
                        <List gridTemplateColumns={"50px 1fr 1fr 1fr"}>
                            <ListRow>
                                <ListCell>#32</ListCell>
                                <ListCell>03.04.2025</ListCell>
                                <ListCell>Pending</ListCell>
                                <ListCell>124,39 zł</ListCell>
                            </ListRow>
                        </List>
                    }>
                        <ListCell>#32</ListCell>
                        <ListCell>03.04.2025</ListCell>
                        <ListCell>Pending</ListCell>
                        <ListCell>124,39 zł</ListCell>
                    </ExpandableRow>
                </List>
            </Field>
        </div>
    );
}