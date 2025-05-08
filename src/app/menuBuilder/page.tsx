"use client";

import React, {useState} from 'react';
import {ArrowLeft, CalendarDays, ChevronRight} from 'lucide-react';
import {useSearchParams} from "next/navigation";
import StepIndicator from "@/components/StepIndicator";
import ItemSelector from "@/components/ItemSelector";
import {Menu} from "@/entities/Menu";
import OrderItem from "@/components/OrderItem";
import {Meal} from "@/entities/Meal";

import { useRouter } from "next/navigation";
import {startOfWeek} from "date-fns";
import {useOrder} from "@/contexts/OrderContext";
import {useAuth} from "@/contexts/AuthContext";

type BuildMenu = {
    main_meal: Meal | null;
    dessert_meal: Meal | null;
}

export default function MenuBuilderPage() {


    const router = useRouter();
    const searchParams = useSearchParams();
    const day = searchParams.get('day');

    const initialBuildMenu: BuildMenu = {
        main_meal: null,
        dessert_meal: null,
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { order, handleAddMenu } = useOrder();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { user } = useAuth();

    const [currentStep, setCurrentStep] = useState<string>('main');
    const [buildMenu, setBuildMenu] = useState<BuildMenu>(initialBuildMenu);

    const handleNext = () => {

        switch (currentStep) {
            case 'main':
                setCurrentStep('dessert');
                break
            case 'dessert':
                setCurrentStep('recap');
                break
            // case 'option':
            //     setCurrentStep('recap');
            //     break
        }

    }

    const handleAddSelectedItem = (item: any) => {

        if(currentStep === 'main' || currentStep === 'dessert') {
            switch (item?.type) {
                case 'MAIN_MEAL':
                    setBuildMenu(prev => ({
                        ...prev,
                        main_meal: item as Meal,
                    }));
                    break
                case 'DESSERT_MEAL':
                    setBuildMenu(prev => ({
                        ...prev,
                        dessert_meal: item as Meal,
                    }));
                    break
            }
        }

    }

    const handleConfirmMenu = () => {

        const eat_date = startOfWeek(new Date(), {weekStartsOn: day === 'tuesday' ? 2 : 4});

        const newMenu: Menu = {
            id             : null,
            order_id       : null,
            main_meal_id   : buildMenu.main_meal?.id,
            dessert_meal_id: buildMenu.dessert_meal?.id,

            eat_date: eat_date,

            main_meal    : buildMenu.main_meal as Meal,
            dessert_meal : buildMenu.dessert_meal as  Meal,
        }

        try{
            handleAddMenu(newMenu);
            alert('Menu bien ajouté à votre commande !')
        }catch(e){
            alert('Une erreur est survenue...')
            console.error(e)
        }

        router.push('/daySelection');
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <button className="flex items-center text-orange-600 hover:text-orange-800 transition-colors" >
                        <ArrowLeft size={16} className="mr-1" />
                        Back
                    </button>

                    <h2 className="text-md font-bold text-center text-gray-800">
                       Choisis pour
                        <span className="ml-2 text-xl text-orange-500 font-normal">
                           {day === 'tuesday' ? 'Mardi' : 'Jeudi'}
                        </span>
                    </h2>

                    <div className="w-20"></div>
                </div>

                <StepIndicator currentStep={currentStep} />
            </div>


            { currentStep === 'recap' ? (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="bg-orange-500 p-4 text-white">
                        <h2 className="text-xl font-bold">Récapitulatif de la commande</h2>
                        <p className="text-sm opacity-90">
                            Repas du {day === 'tuesday' ? 'Mardi' : 'Jeudi'}
                        </p>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <OrderItem
                                label="Plat"
                                name={buildMenu?.main_meal?.title ?? 'null'}
                                imageUrl={buildMenu?.main_meal?.image ?? 'null'}
                            />
                            <OrderItem
                                label="Dessert"
                                name={buildMenu?.dessert_meal?.title ?? 'null'}
                                imageUrl={buildMenu?.dessert_meal?.image ?? 'null'}
                            />
                        </div>

                        <div className="mt-8 border-t pt-6">
                            <div className="flex justify-between text-lg font-medium text-gray-800">
                                <span>Total</span>
                                <span>4.50 €</span>
                            </div>

                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">

                                <button className="flex items-center justify-center p-3 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-50 transition-colors"
                                        onClick={handleConfirmMenu}
                                >
                                    <CalendarDays size={18} className="mr-2" />
                                    Confirmer le menu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) :(
                <ItemSelector
                    currentStep={currentStep}
                    onSelectItem={handleAddSelectedItem}
                    buildMenu={buildMenu}
                />
            )}

            { currentStep !== 'recap' ? (
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={() => handleNext()}
                        // disabled={!hasCurrentSelection()}
                        className="flex items-center px-6 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {currentStep === 'option' ? 'Récapitulatif de la commande' : 'Prochaine étape'}
                        <ChevronRight size={18} className="ml-1" />
                    </button>
                </div>
            ) : null}

        </div>
    );

};