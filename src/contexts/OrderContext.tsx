"use client";

import {Order} from "@/entities/Order";
import {createContext, ReactNode, useContext, useState} from "react";
import {Menu} from "@/entities/Menu";
import {postApi} from "@/app/services/api";
import {useAuth} from "@/contexts/AuthContext";

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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { user, handleLogout } = useAuth();

    const [order, setOrder] = useState<Order | null>(null);
    const [buildMenu, setBuildMenu] = useState<Menu | null>(null);

    const handleCreateOrder = (order: Order) => {
        setOrder(order);
    }
    const handleRemoveOrder = () => {
        setOrder(null);
    }


    const handleCreateBuildMenu = (menu: Menu) => {
        setBuildMenu(menu);
    }

    const handleAddMenu = (newMenu: Menu) => {
        if (!order) return;

        setOrder(prev => prev ? {
            ...prev,
            menus: [...prev.menus, newMenu],
        } : null);
    }

    const handleRemoveMenu = (oldMenu: Menu) => {
        if (!order) return;

        setOrder(prev => prev ? {
            ...prev,
            menus: prev.menus.filter(menu => menu !== oldMenu),
        } : null)
    }


    // Api area
    const handleSendOrder = async () => {
      
        const data = {
            "reference": order?.reference,
            "email": user?.email,
            "datetime_order": order?.datetime_order,
            "price": order?.price,
            "pay_method": order?.pay_method,
            "paid": order?.paid,
            "menus": []
        }

        order?.menus?.map((menu: Menu) => {

            const menuData = {
                "eat_date": menu.eat_date,
                "mainMeal": menu.main_meal,
                "dessertMeal":  menu.dessert_meal
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            data.menus.push(menuData);
        })

        await postApi(
            `orders/send-order`,
            data
        )
            .then(response => {
                const status = response.status === 201 ? 'Commande passée !' : 'Une erreur est survenue...';

                alert(`${status} \r Référence de votre commande : ${response.data.reference}`);

                if(response.status === 201) {
                    handleRemoveOrder()
                    handleLogout()
                }
            })
    }


    return (
        <OrderContext.Provider value={{ order, buildMenu, handleCreateOrder, handleRemoveOrder, handleCreateBuildMenu, handleAddMenu, handleRemoveMenu, handleSendOrder }}>
            {children}
        </OrderContext.Provider>
    )

}