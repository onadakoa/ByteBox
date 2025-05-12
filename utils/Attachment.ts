import {JsonError} from "@/utils/api";

export interface IAttachment {
    attachment_id: number;
    author_id: number;
    creation_date: number;
    images: IImage[];
}

export interface IImage {
    id: number;
    size: number
    type: string;
}

export class Attachment implements IAttachment {
    attachment_id: number = 0;
    author_id: number = 0;
    creation_date: number = 0;
    images: IImage[] = [];

    fill(attachment: IAttachment) {
        Object.assign(this, attachment);
    }

    getImages(): ApiImage[] {
        return this.images.map(img => ApiImage.getFilled(img));
    }

    static getFilled(attachment: IAttachment) {
        const att = new Attachment();
        att.fill(attachment);
        return att;
    }

    static async fetchById(id: number) {
        try {
            const res = await fetch("/api/attachments/index.php?id=" + id);
            const json = await res.json();

            if (!res.ok) {
                throw new JsonError(res.status, json);
            }

            return Attachment.getFilled(json?.d);
        } catch (e) {
            console.error(`Attachment ERROR: ${e}`)
            throw e;
        }
    }
}

export class ApiImage implements IImage {
    id: number = 0;
    size: number = 0;
    type: string = "";

    fill(image: IImage) {
        Object.assign(this, image);
    }

    static getFilled(image: IImage) {
        let img = new ApiImage();
        img.fill(image);
        return img;
    }

    getURL() {
        return "/api/attachments/image.php?id=" + this.id;
    }
}