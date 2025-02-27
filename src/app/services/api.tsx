import axios from "axios";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:8080/api/"; // URL de l'API Spring Boot

export function useGetApi(route: string | null) {
    const [data, setData] = useState<[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!route) return;

        axios.get(API_URL + route)
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [route]);

    return { data, loading, error };
}

export async function postApi(route: string, data: any)  {

    try {
        const response = await axios.post(API_URL + route, data);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'ajout.", error);
        throw error;
    }
}

export async function putApi(route: string, data: any)  {

    try {
        const response = await axios.put(API_URL + route, data);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la modification.", error);
        throw error;
    }
}
