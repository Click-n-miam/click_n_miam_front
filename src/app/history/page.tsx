"use client";

import React, {useState} from 'react';

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useGetApi } from "../services/api";
import {Order} from "@/entities/Order";
import {FormatDate} from "@/usefuls/FormatDate";


export default function HistoryPage() {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [email, setEmail] = useState<string>("");
    const [searchEmail, setSearchEmail] = useState<string>(""); // Déclencheur API
    const [emailError, setEmailError] = useState<string>("");

    const { data: orders } = useGetApi<Order>(
        searchEmail ? `orders/by-email?email=${searchEmail}` : null
    );

    const validateEmail = (email: string) => {
        if (!email.endsWith("@lycee-ndduroc.com")) {
            setEmailError("L'email doit se terminer par @lycee-ndduroc.com");
            return false;
        }
        setEmailError("");
        return true;
    };

    const handleEmailSubmit = () => {
        if (validateEmail(email)) {
            setSearchEmail(email);
        }
    };

    return (

        <section className="bg-white dark:bg-gray-900">
            <div className="mt-16 py-8 lg:py-16 mx-auto max-w-screen-xl px-4">

                <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                    <div className="mt-12">

                        {/* Form to get history (& make a new order) */}
                        <div className="space-y-4 mb-14">
                            <h2 className="text-2xl font-semibold text-green-600 mb-6 text-center">
                                Entrez votre email
                            </h2>
                            <Card className="p-6 max-w-md mx-auto">
                                <div className="space-y-4">
                                    <div>
                                        <Input
                                            type="email"
                                            placeholder="votre.email@lycee-ndduroc.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className={emailError ? "border-red-500" : ""}
                                        />
                                    </div>
                                    <Button
                                        onClick={handleEmailSubmit}
                                        className="w-full bg-orange-500 hover:bg-orange-600"
                                    >
                                        Commencer la commande
                                    </Button>
                                </div>
                            </Card>
                        </div>

                        {/* History of orders */}
                        <div>
                            <h2 className="text-2xl font-semibold text-green-600 mb-6 text-center">
                                Vos commandes précédentes
                            </h2>
                            {orders.length > 0 ? (
                                <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                                    <div className="flex p-4">
                                        {orders.map((order) => (
                                            <Card
                                                key={order.id}
                                                onClick={() => setSelectedOrder(order)}
                                                className="p-4 mr-4 min-w-[250px] bg-white border-green-200 cursor-pointer hover:shadow-lg transition-shadow"
                                            >
                                                <div className="space-y-2">
                                                    <p className="font-medium text-orange-500">
                                                        Commande de {FormatDate(order.datetime_order)}
                                                    </p>
                                                    <p className="text-sm">Ref: {order.reference}</p>
                                                    <p className="text-sm">{order.paid ? 'Oui' : 'Non'}</p>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </ScrollArea>
                            ) : (
                                <p className="text-center text-gray-500">
                                    Vous nave pas encore passé de commande avec cet email.
                                </p>
                            )}
                        </div>


                        {/* Modal informations */}
                        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Détails de la commande</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-medium text-gray-500">Date et heure:</h3>
                                        <p>{FormatDate(selectedOrder?.datetime_order)}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-500">Email:</h3>
                                        <p>{selectedOrder?.email}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-500">Status:</h3>
                                        <p>{selectedOrder?.paid ? 'Oui' : 'Non'}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-500">Prix:</h3>
                                        <p>{selectedOrder?.price}</p>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </section>

            </div>
        </section>

    );
};

