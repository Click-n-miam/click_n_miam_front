import {AlertCircle, Calendar, Check, ChevronRight} from "lucide-react";
import React, {ReactNode} from "react";
import {useRouter} from "next/navigation";

export default function DayCard({
    day,
    label,
    weather,
    specialMenu,
    isSelected,
    isDisabled,
    confirmedOrder,
}: {
    day: string;
    label: string;
    weather: ReactNode;
    specialMenu: string;
    isSelected: boolean;
    isDisabled: boolean;
    confirmedOrder?: any;
})
{
    const router = useRouter();

    const handleMenuCreation = (day: string) => {
        router.push(`/menuBuilder?day=${day}`);
    }

    return (
        <div
            className={`
            relative overflow-hidden rounded-xl transition-all duration-300
            ${isDisabled
                ? 'bg-gray-100 cursor-not-allowed opacity-75'
                : isSelected
                    ? 'bg-orange-50 ring-2 ring-orange-500 cursor-pointer'
                    : 'bg-white hover:bg-orange-50 cursor-pointer'
            }
            transform hover:scale-[1.02] group
          `}
            onClick={() => handleMenuCreation(day)}
        >
            <div className="absolute top-0 right-0 mt-4 mr-4">
                {weather}
            </div>

            <div className="p-6">
                <div className="flex items-center mb-4">
                    <Calendar size={20} className="text-orange-500 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-800 capitalize">
                        {label}
                    </h3>
                </div>

                {isDisabled && confirmedOrder ? (
                    <div className="space-y-3">
                        <div className="flex items-center text-green-600">
                            <Check size={16} className="mr-2" />
                            <span className="font-medium">Order Confirmed</span>
                        </div>
                        <div className="text-sm text-gray-600">
                            <p>Main: {confirmedOrder.items.mainDish.name}</p>
                            <p>Side: {confirmedOrder.items.sideDish.name}</p>
                            <p>Dessert: {confirmedOrder.items.dessert.name}</p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <p className="text-orange-600 font-medium">
                            {specialMenu}
                        </p>

                        <div className="text-sm text-gray-600">
                            <p>• Options supplémentaire disponible</p>
                            <p>• Inclus une sélection de dessert</p>
                        </div>
                    </div>
                )}

                {isDisabled ? (
                    <div className="mt-6 flex items-center text-gray-500">
                        <AlertCircle size={16} className="mr-2" />
                        <span className="text-sm">Une commande pour ce jour a déjà été passée</span>
                    </div>
                ) : (
                    <div className="mt-6 flex items-center text-orange-500 group-hover:text-orange-600">
                        <span className="font-medium">Choisir ce jour</span>
                        <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                )}
            </div>
        </div>
    )
}