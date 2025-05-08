import {Ingredient} from "@/entities/Ingredient";

export type Meal = {
    id: number,

    title: string,
    description: string,
    image: string,
    type: string,

    proposed_at: Date,

    ingredients: Ingredient[],
}