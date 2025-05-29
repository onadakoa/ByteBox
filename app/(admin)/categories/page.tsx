"use client";
import React from "react";
import {CategoriesManager} from "@/components/Admin/CategoriesManager";

export default function CategoriesPage() {
    return (
        <div>
            <h1 style={{margin: '20px', fontSize: '24px', fontWeight: 'bold'}}>Categories Management</h1>
            <CategoriesManager/>
        </div>
    );
}