import { API_HOST } from "../utils/constants";

//Funcion para traer todos los pokemones
export const getPokemonsApi = async (endpointUrl) => {
    try {
        const url = `${API_HOST}/pokemon?limit=20&offset=0`;
        const response = await fetch(endpointUrl || url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function getPokemonDetailsApi(url) {
    try {
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function getPokemonDetailsByIdApi(id) {
    try {
        const url = `${API_HOST}/pokemon/${id}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}