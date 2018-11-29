import React, { Component } from 'react';

import List from '../../components/List';
import { getIngredients, getMenu } from '../../services/api';

import './styles.css'

export default class Main extends Component {

    state = {
        ingredients: [],
        menu: [],
        total: 0.00,
    };

    componentDidMount() {
        const menu = getMenu();
        const ingredients = getIngredients();

        this.setState({ menu, ingredients }, this._calcItemsPrice);
    }

    _calcItemsPrice = () => {
        const state = Object.assign(this.state, {});
        const { menu, ingredients } = state;
        let ingredientIndex = 0;
        let itemIngredients = [];
        const menuWithPrice = menu.map(item => {
            itemIngredients = this._getItemIngridients(item.description);
            itemIngredients.forEach((itemIngredient, index) => {
                ingredientIndex = ingredients.findIndex((ingredient) => ingredient.name.toLowerCase() === itemIngredient.toLowerCase());
                if (ingredientIndex >= 0)
                    item.price += ingredients[ingredientIndex].price;
            });
            return item;
        });

        this.setState({ menu: menuWithPrice });
    }

    _getItemIngridients = description => {
        let itemIngredients = description.split(', ');
        let lastItem = itemIngredients.pop() || [];

        itemIngredients = [
            ...itemIngredients,
            ...lastItem.split(' e ')
        ];

        return itemIngredients;
    }

    _onItemSelected = (item, checked) => {
        let total = this.state.total + 0;

        if (checked)
            total += item.price;
        else
            total -= item.price;

        this.setState({ total });
    }


    render() {
        const { menu, total } = this.state;
        return (
            <div className="main-container">
                <h2>Faça seu pedido!</h2>
                <List 
                    data={menu}
                    onItemSelected={this._onItemSelected}
                />
                <div className="main-total-container">
                    <h2>Total: R$ {total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h2>
                </div>
            </div>
        );
    }
}