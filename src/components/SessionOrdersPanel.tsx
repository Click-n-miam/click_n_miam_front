import {Wallet, Calendar, Clock, AlertTriangle} from "lucide-react";
import { useOrder } from '@/contexts/OrderContext';
import OrderItem from "@/components/OrderItem";
import {Menu} from "@/entities/Menu";
import {FormatDate} from "@/usefuls/FormatDate";
import {useEffect} from "react";

export default function SessionOrdersPanel()
{
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { order, handleRemoveMenu, handleSendOrder } = useOrder();

    useEffect(() => {

    }, [order]);

    return (
        <div className="h-full flex flex-col">
            <div className="p-4 bg-orange-500 text-white">
                <h2 className="font-semibold">Commandes de cette session</h2>
            </div>
            <div className="flex-grow overflow-auto p-4 space-y-4">

                { order?.menus?.length > 0 ? (
                    order?.menus.map((menu: Menu, index: number) => (
                            <div
                                key={index}
                                className='bg-orange-50 rounded-lg p-4 shadow-sm'
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Calendar size={14} className="mr-1" />
                                        <span className="capitalize">{FormatDate(order.datetime_order)}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Clock size={14} className="mr-1" />
                                        <span>
                                            {FormatDate(menu.eat_date)}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <OrderItem
                                        label="Main"
                                        name={menu.main_meal.title}
                                        imageUrl={menu.main_meal.image}
                                    />
                                    <OrderItem
                                        label="Dessert"
                                        name={menu.dessert_meal.title}
                                        imageUrl={menu.dessert_meal.image}
                                    />
                                </div>

                                <div className="mt-4 border-t pt-4 space-y-3">
                                    <div className="flex items-center text-amber-600 mb-2">
                                        <AlertTriangle size={14} className="mr-1" />
                                        <span className="text-xs">Cette action est irréversible</span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="flex-1 py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center"
                                                onClick={() => handleRemoveMenu(menu)}
                                        >
                                            Supprimer le menu
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                ) : (
                    <p className="text-sm text-gray-600 mb-3 text-center">Aucun menu encore ajouté.</p>
                )}
            </div>

            <div className="p-4 border-t bg-white">

                { order?.menus?.length > 0 ? (
                    <div>
                        <p className="text-sm text-gray-600 mb-3 text-center">Confirmer la commande ?</p>
                        <button onClick={handleSendOrder} className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center justify-center w-full">
                            <Wallet size={16} className="mr-2" />
                            Confirmer & commander
                        </button>
                    </div>
                ) : null}

            </div>
        </div>
    );
}

