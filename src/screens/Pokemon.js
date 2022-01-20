import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { getPokemonDetailsByIdApi } from '../api/pokemon';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Header from '../components/Pokemon/Header';
import Type from '../components/Pokemon/Type';
import Stats from '../components/Pokemon/Stats';
import Favorite from '../components/Pokemon/Favorite';
import useAuth from '../hooks/useAuth';

export default function Pokemon(props) {

    const { navigation, route: { params } } = props;
    const [pokemon, setPokemon] = useState(null);
    const { auth } = useAuth();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => auth && <Favorite id={pokemon?.id} />,
            headerLeft: () => (
                <Icon
                    name="arrow-left"
                    size={30}
                    color="#fff"
                    style={{ marginLeft: 20 }}
                    onPress={() => navigation.goBack()} />
            ),
        })
    }, [navigation, params, pokemon])

    useEffect(() => {
        (async () => {
            try {
                const response = await getPokemonDetailsByIdApi(params.id);
                setPokemon(response);
            } catch (error) {
                navigation.goBack();
            }
        })();
    }, [params])

    if (!pokemon) return null;

    return (
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} >
            <Header
                name={pokemon.name}
                order={pokemon.id}
                image={pokemon.sprites.other['official-artwork'].front_default}
                type={pokemon.types[0].type.name} />
            <Type types={pokemon.types} />
            <Stats stats={pokemon.stats} />
        </ScrollView>
    )
}
