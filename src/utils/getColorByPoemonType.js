import {POKEMON_TYPE_COLORS} from './constants';

const getCOlorByPokemonType = (type) => {
    return POKEMON_TYPE_COLORS[type.toLowerCase()];
}

export default getCOlorByPokemonType;