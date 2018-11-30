import React from 'react';

import { convertFloatToBRLCurrency } from '../../../helpers';

import './styles.css';

const Item = ({ id, name, add, remove, qtty, price }) => {

    return (
        <div className="order-item-container">
            <div className="ordem-item-info-container">
                <strong className="order-item-name">{name}</strong>
                <label className="order-item-price">R$ {convertFloatToBRLCurrency(price)}</label>
            </div>
            <div className="order-qtty-item-container">
                <button id="remove" onClick={() => remove(id)}>-</button>
                <input
                    className="item-qtty-input"
                    type="text"
                    name="qtty"
                    value={qtty}
                    disabled />
                <button id="add" onClick={() => add(id)}>+</button>
            </div>
        </div>
    );
}

export default Item;