import css from "./page.module.css"
import {Header} from "@/components/Header/Header";
import {OrderList} from "@/components/Table/OrderList";
import {Field} from "@/components/Field/Field";
import ListRow, {ListRowHeader} from "@/components/Table/ListRow";
import {ListCell} from "@/components/Table/ListCell";
import React from "react";

export default function Page() {

    return (
        <div className={css.mainContainer}>
            <Field padding={"10px"}>
                <Header padding={"5px"}>Orders</Header>
                <OrderList className={css.list} gridTemplateColumns={"100px 1fr 1fr 1fr"}>
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
                </OrderList>
            </Field>
        </div>
    );
}