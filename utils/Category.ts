import {JsonError} from "@/utils/api";

export interface ICategory {
    id: number;
    name: string;
    alias: ICategoryAlias[]
}

export interface ICategoryAlias {
    alias_id: number;
    name: string;
}

export class Category implements ICategory {
    alias: ICategoryAlias[] = [];
    id: number = 0;
    name: string = "";

    fill(category: ICategory) {
        Object.assign(this, category);
    }

    static getFilled(category: ICategory) {
        const cat = new Category();
        cat.fill(category);
        return cat;
    }

    static async getById(id: number) {
        const res = await fetch("/api/categories/index.php?id=" + id);

        let json = null;
        try {
            json = await res.json();
        } catch (e) {
            console.error(`Category ERROR: ${e}`)
        }
        if (!res.ok) {
            console.error(`Category ERROR: ${json}`)
            throw new JsonError(res.status, json);
        }

        return Category.getFilled(json?.d);
    }
}