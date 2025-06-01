import {Card} from "@/components/Field/Card";
import {poppins} from "@/utils/font";
import React from "react";
import css from "./page.module.css";
import {OrdersManager} from "@/components/Admin/OrdersManager";

export default function OrdersPage() {
    return (
        <div className={[poppins.className, css.container].join(" ")}>
            <h1>Orders Management</h1>
            <Card>
                <OrdersManager />
            </Card>
        </div>
    );
}
