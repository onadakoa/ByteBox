"use client";

import useOrders from "@/hooks/useOrders";
import {List} from "@/components/Table/List";
import css from "@/app/auth/orders/page.module.css";
import ListRow, {ListRowHeader} from "@/components/Table/ListRow";
import {ListCell} from "@/components/Table/ListCell";
import Badge from "@/components/Badge/Badge";
import {ExpandableRow} from "@/components/Table/ExpandableRow";
import React from "react";

export const OrdersList = () => {
    const {orders, isLoading, error} = useOrders();

    if (isLoading || error) return ("loading");

    return (
        <List className={css.list} gridTemplateColumns={"100px 1fr 150px 150px"}>
            <ListRowHeader>
                <ListCell>#</ListCell>
                <ListCell>Date</ListCell>
                <ListCell centerHorizontal>Status</ListCell>
                <ListCell centerHorizontal>Total price</ListCell>
            </ListRowHeader>
            {orders.map((order) => {
                const date = new Date(order.created_at);
                const formatedDate = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;

                return (
                    <ExpandableRow key={order.order_id} padding={"5px 0"} content={(
                        <List gridTemplateColumns={"50px 3fr 100px 100px"}>
                            <ListRowHeader>
                                <ListCell>#</ListCell>
                                <ListCell>product</ListCell>
                                <ListCell>price</ListCell>
                                <ListCell centerHorizontal>quantity</ListCell>
                            </ListRowHeader>
                            {order.items.map((item) => {
                                return (
                                    <ListRow key={item.order_item_id}>
                                        <ListCell>#{item.product_id}</ListCell>
                                        <ListCell>{item.name}</ListCell>
                                        <ListCell>{item.price} zł</ListCell>
                                        <ListCell centerHorizontal>{item.quantity}</ListCell>
                                    </ListRow>)
                            })}
                        </List>
                    )}>
                        <ListCell>#{order.order_id}</ListCell>
                        <ListCell>{formatedDate}</ListCell>
                        <ListCell centerHorizontal><Badge variant={"pending"}>{order.status}</Badge></ListCell>
                        <ListCell centerHorizontal>{order.total_price}</ListCell>
                    </ExpandableRow>
                )
            })}
        </List>
    );
};