"use client";
import React, {useState} from "react";
import useOrders from "@/hooks/useOrders";
import {List} from "@/components/Table/List";
import ListRow, {ListRowHeader} from "@/components/Table/ListRow";
import {ListCell} from "@/components/Table/ListCell";
import Badge from "@/components/Badge/Badge";
import {ExpandableRow} from "@/components/Table/ExpandableRow";
import {OrderStatus} from "@/utils/Order";
import {mutate} from "swr";
import css from "@/app/auth/orders/page.module.css";
import {ManagerButton} from "@/components/Admin/ManagerButton";

export const ClientOrdersManager = () => {
    const {orders, isLoading, error} = useOrders();
    const [cancellingOrders, setCancellingOrders] = useState<Set<number>>(new Set());

    // Cancel order
    const cancelOrder = async (orderId: number) => {
        if (cancellingOrders.has(orderId)) return;

        setCancellingOrders(prev => new Set(prev).add(orderId));

        try {
            const response = await fetch(`/api/order/cancel.php?id=${orderId}`, {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to cancel order');
            }

            // Revalidate SWR cache
            mutate('/order/index.php');
        } catch (error) {
            console.error('Error canceling order:', error);
        } finally {
            setCancellingOrders(prev => {
                const newSet = new Set(prev);
                newSet.delete(orderId);
                return newSet;
            });
        }
    };

    // Format date
    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    };

    // Get badge variant based on status
    const getBadgeVariant = (status: OrderStatus) => {
        switch (status) {
            case OrderStatus.pending:
                return "pending";
            case OrderStatus.paid:
                return "success";
            case OrderStatus.shipping:
                return "info";
            case OrderStatus.delivered:
                return "success";
            case OrderStatus.canceled:
                return "error";
            default:
                return "pending";
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading orders</div>;
    if (!orders || orders.length === 0) return <div>No orders found</div>;

    return (
        <List className={css.list} gridTemplateColumns={"100px 1fr 150px 150px 150px"}>
            <ListRowHeader>
                <ListCell>#</ListCell>
                <ListCell>Date</ListCell>
                <ListCell>Total Price</ListCell>
                <ListCell centerHorizontal>Status</ListCell>
                <ListCell centerHorizontal>Action</ListCell>
            </ListRowHeader>
            {orders.map((order) => (
                <ExpandableRow key={order.order_id} padding={"5px 0"} content={(
                    <List gridTemplateColumns={"50px 3fr 100px 100px"}>
                        <ListRowHeader>
                            <ListCell>#</ListCell>
                            <ListCell>Product</ListCell>
                            <ListCell>Price</ListCell>
                            <ListCell centerHorizontal>Quantity</ListCell>
                        </ListRowHeader>
                        {order.items.map((item) => (
                            <ListRow key={item.order_item_id}>
                                <ListCell>#{item.product_id}</ListCell>
                                <ListCell>{item.name}</ListCell>
                                <ListCell>{item.price} zł</ListCell>
                                <ListCell centerHorizontal>{item.quantity}</ListCell>
                            </ListRow>
                        ))}
                    </List>
                )}>
                    <ListCell>#{order.order_id}</ListCell>
                    <ListCell>{formatDate(order.created_at)}</ListCell>
                    <ListCell>{order.total_price} zł</ListCell>
                    <ListCell centerHorizontal>
                        <Badge variant={getBadgeVariant(order.status)}>{order.status}</Badge>
                    </ListCell>
                    <ListCell centerHorizontal>
                        {order.status !== OrderStatus.canceled && (
                            <ManagerButton
                                onClick={() => cancelOrder(order.order_id)}
                                disabled={cancellingOrders.has(order.order_id)}
                            >
                                {cancellingOrders.has(order.order_id) ? 'Cancelling...' : 'Cancel Order'}
                            </ManagerButton>
                        )}
                    </ListCell>
                </ExpandableRow>
            ))}
        </List>
    );
};
