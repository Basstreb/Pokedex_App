import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { addPokemonFavoriteApi, isPokemonFavoriteApi, removePokemonFavoriteApi } from '../../api/favorite';

export default function Favorite(props) {

    const { id } = props;
    const [isFavorite, setIsFavorite] = useState(undefined);
    const [reloadCheck, setReloadCheck] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const isFavorite = await isPokemonFavoriteApi(id);
                setIsFavorite(isFavorite);
            } catch {
                setIsFavorite(false);
            }
        })()
    }, [id, reloadCheck]);

    const onReloadCheckFavorite = () => {
        setReloadCheck(!reloadCheck);
    }

    const addFavorite = async () => {
        try {
            await addPokemonFavoriteApi(id)
            onReloadCheckFavorite();
        } catch (error) {
            console.error(error);
        }
    };

    const removeFavorite = async () => {
        try {
            await removePokemonFavoriteApi(id)
            onReloadCheckFavorite();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Icon
            name="heart"
            size={30}
            color='#FFFFFF'
            onPress={isFavorite ? removeFavorite : addFavorite}
            style={{ marginRight: 20 }}
            solid={isFavorite}
        />
    )
}
