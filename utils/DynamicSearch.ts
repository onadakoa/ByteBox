import {IProduct, Product} from "@/utils/Product";
import {API_HOSTNAME} from "@/utils/api";
import {OutPacket} from "@/utils/OutPacket";

export interface DynamicSearch {
    id: string;
    type: "category" | "product";
    name: string;
}

export class FilledDynamicSearch implements DynamicSearch {
    id;
    type;
    name;

    constructor(id: string, type: "category" | "product", name: string) {
        this.id = id;
        this.type = type;
        this.name = name;
    }

    public static getFilled(search: DynamicSearch) {
        return new FilledDynamicSearch(search.id, search.type, search.name);
    }
}

export class FilledDynamicProductSearch extends FilledDynamicSearch {
    public async getPrice() {
        if (!this.id) return null;
        if (this.type!="product") return null;

        let res = await fetch(API_HOSTNAME+"?id="+this.id);
        let json = await res.json() as OutPacket<IProduct>;

        console.log(json);
    }
}