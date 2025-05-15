export interface IShippingAddress {
    shipping_address_id: number;
    user_id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    postal_code: string;
    city: string
    street: string;
    building_number: string;
    apartment_number: string | null;
}