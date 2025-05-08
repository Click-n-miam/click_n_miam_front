"use client";

import React from 'react';
import {useGetApi} from "@/app/services/api";
import {Meal} from "@/entities/Meal";
import {Option} from "@/entities/Option";
import ItemCard from "@/components/ItemCard";
import OptionCard from "@/components/OptionCard";


export default function ItemSelector({ currentStep, onSelectItem, buildMenu }: {currentStep: string, onSelectItem: (item: any) => void, buildMenu: any}) {

    const mapped_type_meals = {
        'main': 'MAIN_MEAL',
        'dessert': 'DESSERT_MEAL',
    };

    const type = mapped_type_meals[currentStep as keyof typeof mapped_type_meals];


    const { data: items } = useGetApi<Meal | Option>(
        currentStep === 'option'
            ? `options`
            : (type ? `meals/by-type?type=${type}` : null),
    );


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (

                <div key={item.id}>
                    { currentStep === 'option' ? (
                        <OptionCard item={item as Option} buildMenu={buildMenu} onClick={() => onSelectItem(item)}/>
                    ) : (
                        <ItemCard item={item as Meal} buildMenu={buildMenu} onClick={() => onSelectItem(item)}/>
                    )}
                </div>

            ))}
        </div>
    );
};