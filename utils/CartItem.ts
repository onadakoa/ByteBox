import {Attachment} from "@/utils/Attachment";

export interface ICartItem {
    cart_item_id: number;
    user_id: number;
    product_id: number;
    quantity: number;
    name: string;
    price: number;
    attachment_id: number | null;
}

export class CartItem implements ICartItem {
    attachment_id: number | null = null;
    cart_item_id: number = 0;
    name: string = "";
    price: number = 0;
    product_id: number = 0;
    quantity: number = 0;
    user_id: number = 0;

    fill(cartItem: ICartItem) {
        Object.assign(this, cartItem);
    }

    public static getFilled(cartItem: ICartItem) {
        const cart = new CartItem();
        cart.fill(cartItem);
        return cart;
    }

    fetchAttachment() {
        if (!this.attachment_id) return null;
        return Attachment.fetchById(this.attachment_id);
    }
}