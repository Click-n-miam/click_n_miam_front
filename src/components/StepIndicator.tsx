import React, {JSX} from 'react';
// import { MenuStep } from '../../contexts/OrderContext';
import {UtensilsCrossed, SaladIcon as SaladerIcon, Coffee, IceCream2, Settings} from 'lucide-react';


type StepConfig = {
    label: string;
    icon: JSX.Element;
}

type StepName = 'main' | 'dessert' | 'option';

type StepConfigMap = Record<StepName, StepConfig>

export default function StepIndicator({currentStep}: {currentStep: string}){
    const steps: StepConfigMap = {
        main: {
            label: 'Plat',
            icon: <UtensilsCrossed size={18} />,
        },
        dessert: {
            label: 'Dessert',
            icon: <IceCream2 size={18} />,
        },
        option: {
            label: 'Option',
            icon: <Settings size={18} />,
        },
    };

    // const stepOrder: MenuStep[] = ['main', 'side', 'dairy', 'dessert'];

    return (
        <div className="mt-6">
            <div className="flex justify-between">
                {Object.entries(steps).map(([key, step]) => {
                    const isActive = key === currentStep ;
                    const isCompleted = false;

                    return (
                        <div key={key} className="flex flex-col items-center w-1/4">
                            <div
                                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                                    isActive
                                        ? 'bg-orange-500 text-white'
                                        : isCompleted
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-200 text-gray-500'
                                }`}
                            >
                                {step.icon}
                            </div>
                            <span className={`mt-2 text-xs text-center ${
                                isActive ? 'text-orange-500 font-medium' : 'text-gray-500'
                            }`}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/*<div className="relative flex mt-4">*/}
            {/*    {stepOrder.map((_, index) => {*/}
            {/*        const isCompleted = index < currentIndex;*/}
            {/*        const isLast = index === stepOrder.length - 1;*/}

            {/*        if (isLast) return null;*/}

            {/*        return (*/}
            {/*            <div*/}
            {/*                key={`line-${index}`}*/}
            {/*                className={`flex-grow h-1 ${*/}
            {/*                    isCompleted ? 'bg-green-500' : 'bg-gray-200'*/}
            {/*                }`}*/}
            {/*            />*/}
            {/*        );*/}
            {/*    })}*/}
            {/*</div>*/}
        </div>
    );
};