import {Menu} from "@/entities/Menu";

export type Order = {
    id: number | null,
    paid: boolean,
    price: number,

    pay_method: string,
    reference: string,
    email: string,

    datetime_order: Date,

    //
    menus: Array<Menu>,
}