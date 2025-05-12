import React from "react";

export default function OrderItem({imageUrl, label, name}: {imageUrl: string, label: string, name: string}){

    return (
        <div className="flex items-center space-x-2">
            <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
            </div>
            <div>
                <span className="text-gray-800">{name}</span>
            </div>
        </div>
    )
}