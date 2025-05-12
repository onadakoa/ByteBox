import {Category} from "@/utils/Category";
import {Attachment} from "@/utils/Attachment";

export interface IProduct {
    product_id: number;
    attachment_id: number | null;
    category_id: number | null;
    author_id: number;
    name: string;
    description: string;
    price: number;
    stock: number
}

export class Product implements IProduct {
    product_id: number = 0;
    attachment_id: number | null = null;
    category_id: number | null = null;
    author_id: number = 0;
    name: string = "";
    description: string = "";
    price: number = 0;
    stock: number = 0;

    fill(product: IProduct) {
        Object.assign(this, product);
    }

    static getFilled(product: IProduct) {
        const prod = new Product();
        prod.fill(product);
        return prod;
    }

    getCategory() {
        if (!this.category_id) return null;
        return Category.getById(this.category_id);
    }

    getAttachment() {
        if (!this.attachment_id) return null;
        return Attachment.getById(this.attachment_id);
    }
}