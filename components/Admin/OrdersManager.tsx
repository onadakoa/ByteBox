"use client";
import {ManagerButton} from "@/components/Admin/ManagerButton";
import ListRow, {ListRowHeader} from "@/components/Table/ListRow";
import {ListCell} from "@/components/Table/ListCell";
import {Manager} from "@/components/Admin/Manager";
import React, {useEffect, useState} from "react";
import {useDebounce} from "@/hooks/useDebounce";
import {IOrder, OrderStatus} from "@/utils/Order";
import Badge from "@/components/Badge/Badge";
import {ExpandableRow} from "@/components/Table/ExpandableRow";
import {List} from "@/components/Table/List";
import {mutate} from "swr";

export const OrdersManager = (props: {
    dontShowItemsAction?: boolean,
    dontShowAction?: boolean,
}) => {
    const [search, setSearch] = useState("");
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const debouncedSearch = useDebounce(search, 500);

    // Fetch orders
    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/order/all.php${debouncedSearch ? `?search=${debouncedSearch}` : ''}`, {
                    credentials: "include",
                    method: "GET",
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch orders");
                }
                const data = await response.json();
                setOrders(data.d || []);
                setError(null);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setError(error instanceof Error ? error : new Error("Unknown error"));
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [debouncedSearch]);

    // Update order status
    const updateOrderStatus = async (orderId: number, status: OrderStatus) => {
        try {
            const response = await fetch('/api/order/index.php', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    id: orderId,
                    status: status,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update order status');
            }

            // Update local state
            setOrders(orders.map(order =>
                order.order_id === orderId ? {...order, status} : order
            ));

            // Revalidate SWR cache
            mutate('/api/order/index.php');

            return true;
        } catch (error) {
            console.error('Error updating order status:', error);
            return false;
        }
    };

    // Cancel/Delete order
    const cancelOrder = async (orderId: number) => {
        try {
            const response = await fetch(`/api/order/cancel.php?id=${orderId}`, {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to cancel order');
            }

            // Update local state
            setOrders(orders.map(order =>
                order.order_id === orderId ? {...order, status: OrderStatus.canceled} : order
            ));

            // Revalidate SWR cache
            mutate('/api/order/index.php');

            return true;
        } catch (error) {
            console.error('Error canceling order:', error);
            return false;
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

    return (
        <Manager gridTemplateColumns={"100px 1fr 150px 150px 200px"}
                 searchValue={search}
                 setSearchValue={(e) => setSearch(e.target.value)}
                 dontShowAction={props.dontShowAction}
        >
            <ListRowHeader>
                <ListCell>#</ListCell>
                <ListCell>Date</ListCell>
                <ListCell>Total Price</ListCell>
                <ListCell centerHorizontal>Status</ListCell>
                {!props.dontShowItemsAction && <ListCell centerHorizontal>Action</ListCell>}
            </ListRowHeader>
            {(isLoading || error) ? (
                <ListRow>
                    <ListCell centerHorizontal>
                        {isLoading ? "Loading..." : `Error: ${error?.message}`}
                    </ListCell>
                </ListRow>
            ) : orders.length === 0 ? (
                <ListRow>
                    <ListCell centerHorizontal>
                        No orders found
                    </ListCell>
                </ListRow>
            ) : orders.map((order) => (
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
                    {!props.dontShowItemsAction && <ListCell centerHorizontal>
                        {(
                            <>
                                <select
                                    value={order.status}
                                    onChange={(e) => updateOrderStatus(order.order_id, e.target.value as OrderStatus)}
                                    style={{marginRight: '10px'}}
                                >
                                    {Object.values(OrderStatus).map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                                {order.status !== OrderStatus.canceled &&
                                    <ManagerButton onClick={() => cancelOrder(order.order_id)}>Cancel</ManagerButton>}
                            </>
                        )}
                    </ListCell>}
                </ExpandableRow>
            ))}
        </Manager>
    );
};
