import React from 'react';

import { convertFloatToBRLCurrency } from '../../../helpers';

import './styles.css';

const Item = ({ name, description, price, onItemSelected, checked }) => (
    <div className="item-container">
        <div className="item-title-container">
            <strong className="item-name">{name}</strong>
            <label className="item-description">{description}</label>
        </div>
        <label className="item-price">{convertFloatToBRLCurrency(price)}</label>

        <input type="checkbox" id={`check-${name}`} onClick={evt => onItemSelected(evt.target)} checked={checked} className="item-check"/>
        <label htmlFor={`check-${name}`} className="checker"></label>
    </div>
);

export default Item;