"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

import { useOrder } from '@/contexts/OrderContext';
import {Sun, Moon} from 'lucide-react';
import DayCard from "@/components/DayCard";

export default function DaySelectionPage() {
    // const { setDay, order, canOrderForDay, getConfirmedOrderForDay } = useOrder();
    const router = useRouter();

    // const handleDaySelect = (selectedDay: 'tuesday' | 'thursday') => {
    //     if (!canOrderForDay(selectedDay)) {
    //         return;
    //     }
    //     setDay(selectedDay);
    //     navigate('/menu-builder/main');
    // };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-800">Select Your Meal Day</h2>
                <p className="text-gray-600 mt-2">Choose when you'd like your meal delivered</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <DayCard
                    day="tuesday"
                    label="Mardi"
                    weather={<Sun className="text-yellow-500" size={24} />}
                    specialMenu="Chef's Special: Beef Stroganoff"
                    isSelected={false}
                    isDisabled={false}
                    confirmedOrder={false}
                />

                <DayCard
                    day="thursday"
                    label="Jeudi"
                    weather={<Moon className="text-blue-400" size={24} />}
                    specialMenu="Seafood Special: Grilled Salmon"
                    isSelected={false}
                    isDisabled={false}
                    confirmedOrder={false}
                />

            </div>
        </div>
    );
};