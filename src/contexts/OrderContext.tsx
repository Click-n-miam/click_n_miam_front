"use client";

import {Order} from "@/entities/Order";
import {createContext, ReactNode, useContext, useState} from "react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const OrderContext = createContext();

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const OrderProvider= ({children}: {children: ReactNode}) => {

    const [order, setOrder] = useState<Order | null>(null);

    const handleCreateOrder = (order: Order) => {
        setOrder(order);
    }

    const handleRemoveOrder = () => {
        setOrder(null);
    }


    return (
        <OrderContext.Provider value={{ order, handleCreateOrder, handleRemoveOrder }}>
            {children}
        </OrderContext.Provider>
    )

}