import {Meal} from "@/entities/Meal";

export type Menu = {
    id: number | null,

    order_id       : number | null,
    main_meal_id   : number | undefined,
    dessert_meal_id: number | undefined,

    eat_date: Date,

    //
    main_meal: Meal,
    dessert_meal: Meal,
}