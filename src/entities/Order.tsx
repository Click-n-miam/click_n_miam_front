export type Order = {
    id: number,
    paid: boolean,
    price: number,

    pay_method: string,
    reference: string,
    email: string,

    datetime_order: Date,
}