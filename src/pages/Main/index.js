import React, { Component } from 'react';

import SnacksList from '../../components/SnacksList';
import OrderList from '../../components/OrderList';
import { getIngredients, getMenu } from '../../services/api';

import { isObjEmpty, convertFloatToBRLCurrency } from '../../helpers';

import './styles.css';

export default class Main extends Component {

    state = {
        title: 'Faça seu pedido!',
        ingredients: [],
        menu: [
            {
                id: 999,
                name: "Monte seu lanche",
                description: "Escolha todos os ingredientes que desejar.",
                price: 0.00,
            },
        ],
        itemSelected: null,
        total: 0.00,
    };

    componentDidMount() {
        const menu = [...this.state.menu, ...getMenu()];
        const ingredients = getIngredients();

        this.setState({ menu, ingredients }, this._calcItemsPrice);
    }

    _calcItemsPrice = () => {
        const state = Object.assign(this.state, {});
        const { menu } = state;
        const menuWithPrice = menu.map(item => {
            item.price = this._calcItemPrice(item);
            return item;
        });

        this.setState({ menu: menuWithPrice });
    }

    _calcItemPrice = (item) => {
        const { ingredients } = this.state;
        let total = 0;
        let ingredientIndex = 0;
        let itemIngredients = [];
        itemIngredients = this._getItemIngridients(item.description);
        itemIngredients.forEach(itemIngredient => {
            ingredientIndex = ingredients.findIndex((ingredient) => ingredient.name.toLowerCase() === itemIngredient.toLowerCase());
            if (ingredientIndex >= 0)
                total += ingredients[ingredientIndex].price;
        });

        return total;
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

    _getQttyIngridient = (ingridient, ingridients) => {
        return ingridients.filter(item => item.toLowerCase() === ingridient.toLowerCase()).length;
    }

    _addIngridient = (id) => {
        const ingredients = Object.assign(this.state.ingredients, []);
        const ingredientIndex = ingredients.findIndex(ingredient => ingredient.id === id);
        let total = this.state.total + 0;

        if (ingredientIndex >= 0) {
            ingredients[ingredientIndex].qtty++;
            total += ingredients[ingredientIndex].price;
        }

        this.setState({ ingredients, total });
    }

    _removeIngridient = (id) => {
        const ingredients = Object.assign(this.state.ingredients, []);
        const ingredientIndex = ingredients.findIndex(ingredient => ingredient.id === id);
        let total = this.state.total + 0;

        if (ingredientIndex >= 0 && ingredients[ingredientIndex].qtty > 0) {
            ingredients[ingredientIndex].qtty--;
            total -= ingredients[ingredientIndex].price;
        }



        this.setState({ ingredients, total });
    }

    _onItemSelected = (item) => {
        let total = this.state.total;
        const itemIngredients = this._getItemIngridients(item.description);
        const ingridients = this.state.ingredients.map(item => {
            item.qtty = this._getQttyIngridient(item.name, itemIngredients);
            item.add = this._addIngridient;
            item.remove = this._removeIngridient;

            return item;
        });

        total += item.price;
        item.onCancel = () => this._onCancel();

        this.setState({ total, itemSelected: item, ingridients, title: 'Selecione os adicionais!' });
    }

    _onCancel = () => {
        const ingredients = getIngredients();
        this.setState({ itemSelected: null, total: 0.00, ingredients });
    }

    _saveOrder = () => {
        const { total } = this.state;
        if (total === 0)
            alert('Nenhum ingrediente adicionado para o item selecionado!');
        else
            alert('Item adicionado!');
    }

    _resetInfo = () => {
        this.setState({ ingredients: getIngredients(), total: 0.00, itemSelected: null });
    }

    _renderList = () => {
        const { menu, itemSelected, ingredients } = this.state;

        if (!isObjEmpty(itemSelected)) {
            return <OrderList item={itemSelected} data={ingredients} />
        }

        return (
            <SnacksList
                data={menu}
                onItemSelected={this._onItemSelected}
            />
        );
    }

    _renderTotal = () => {
        const { total } = this.state;
        return (
            <div className="main-total-container">
                {/* <h2>Total: R$ {total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h2> */}
                <h2>Total: R$ {convertFloatToBRLCurrency(total)}</h2>
            </div>
        );
    }

    _renderOptionButtons = () => {
        const { itemSelected } = this.state;
        return (
            !isObjEmpty(itemSelected) && <div className="main-option-buttons-container">
                <button className="main-option-buttons cancel" onClick={this._onCancel}>Cancelar</button>
                <button className="main-option-buttons add" onClick={this._saveOrder}>Adicionar</button>
            </div>
        )
    }


    render() {
        const { title } = this.state;
        return (
            <div className="main-container">
                <h2>{title}</h2>
                {this._renderList()}
                {this._renderTotal()}
                {this._renderOptionButtons()}
            </div>
        );
    }
}