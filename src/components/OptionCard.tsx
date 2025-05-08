import {Check} from "lucide-react";
import React from "react";
import {Option} from "@/entities/Option";


export default function OptionCard({item, buildMenu, onClick}: {item: Option, buildMenu: any, onClick: () => void}) {

    return (
        <div
            key={item.id}
            onClick={onClick}
            className={`relative bg-white border rounded-lg shadow-sm overflow-hidden transition-all duration-200 transform hover:scale-[1.02] cursor-pointer ${
                buildMenu?.main_meal?.id === item.id
                    ? 'border-orange-500 ring-2 ring-orange-500'
                    : 'border-gray-200 hover:border-orange-300'
            }`}
        >

            <div className="p-4">
                <h3 className="font-medium text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
            </div>

            {buildMenu?.main_meal?.id === item.id && (
                <div className="absolute top-2 right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <Check className="text-white" size={16} />
                </div>
            )}
        </div>
    )
}