import AsyncStorage from '@react-native-async-storage/async-storage';
import { FAVORITE_STORAGE } from '../utils/constants';

export async function getPokemonsFavoriteApi() {
    try {
        const favorites = await AsyncStorage.getItem(FAVORITE_STORAGE);
        return JSON.parse(favorites || '[]');
    } catch (error) {
        console.error(error);
    }
}

export async function addPokemonFavoriteApi(id) {
    try {
        const favorites = await getPokemonsFavoriteApi();
        favorites.push(id);
        await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(favorites));
    } catch (error) {
        console.error(error);
    }
}

export async function isPokemonFavoriteApi(id) {
    try {
        const favorites = await getPokemonsFavoriteApi();
        return favorites.includes(id);
    } catch (error) {
        console.error(error);
    }
};

export async function removePokemonFavoriteApi(id) {
    try {
        const favorites = await getPokemonsFavoriteApi();
        const newFavorites = favorites.filter(item => item !== id);
        await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(newFavorites));
    } catch (error) {
        console.error(error);
    }
};