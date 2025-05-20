export enum OrderStatus {
    pending = "pending",
    paid = "paid",
    shipping = "shipping",
    delivered = "delivered",
    canceled = "canceled",
}

export interface IOrderItem {
    order_item_id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price: number;
    name: string;
}

export interface IOrder {
    order_id: number;
    user_id: number;
    provider_id: number;
    created_at: number;
    status: OrderStatus
    first_name: string;
    last_name: string;
    phone_number: string;
    postal_code: string;
    city: string
    street: string;
    building_number: string;
    apartment_number: string | null;
    total_price: number;

    items: IOrderItem[];
}