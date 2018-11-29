import menu from '../data/menu';
import ingredients from '../data/ingredients';

export const getMenu = () => {
    return menu;
};

export const getIngredients = () => {
    return ingredients;
};

export default {
    getMenu,
    getIngredients,
};