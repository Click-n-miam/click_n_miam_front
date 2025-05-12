"use client";

import React, {useEffect, useState} from 'react';

import { useOrder } from '@/contexts/OrderContext';
import {Sun, Moon} from 'lucide-react';
import DayCard from "@/components/DayCard";

import { Order } from "@/entities/Order";
import {useAuth} from "@/contexts/AuthContext";

import { startOfWeek } from "date-fns";

export default function DaySelectionPage() {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { order, handleCreateOrder } = useOrder();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { user } = useAuth();

    const monday  = startOfWeek(new Date(), {weekStartsOn: 1});
    const tuesday = startOfWeek(new Date(), {weekStartsOn: 2});
    const thursday= startOfWeek(new Date(), {weekStartsOn: 4});

    const [orderSetTuesday, setOrderSetTuesday] = useState(false);
    const [orderSetThursday, setOrderSetThursday] = useState(false);

    useEffect(() => {

        if(!order)
        {
            const beginNewOrder: Order = {
                id: null,
                paid: false,
                price: 4.50,

                pay_method: 'CASH',
                reference: 'CMD_' + user?.email.substring(0,10) + '_' + monday.getTime() ,
                email: user?.email,

                datetime_order: monday,

                menus: []
            };

            handleCreateOrder(beginNewOrder);
        }else{
            setOrderSetTuesday(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                order?.menus.some(menu => menu.eat_date.toDateString() === tuesday.toDateString())
            )

            setOrderSetThursday(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                order?.menus.some(menu => menu.eat_date.toDateString() === thursday.toDateString())
            )
        }




    }, [order?.menus])

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-800">Sélectionner le jour de votre menu</h2>
                <p className="text-gray-600 mt-2">sous titre</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">



                <DayCard
                    day="tuesday"
                    label="Mardi"
                    weather={<Sun className="text-yellow-500" size={24} />}
                    specialMenu="Chef's Special: Beef Stroganoff"
                    isSelected={ false}
                    isDisabled={ orderSetTuesday }
                    confirmedOrder={ orderSetTuesday }
                />

                <DayCard
                    day="thursday"
                    label="Jeudi"
                    weather={<Moon className="text-blue-400" size={24} />}
                    specialMenu="Seafood Special: Grilled Salmon"
                    isSelected={false}
                    isDisabled={ orderSetThursday }
                    confirmedOrder={ orderSetThursday }
                />

            </div>
        </div>
    );
};