import React from 'react';

import './styles.css';

const Item = ({ name, description, price, onItemSelected }) => (
    <label className="item-container">
        <div className="item-title-container">
            <strong className="item-name">{name}</strong>
            <label className="item-description">{description}</label>
        </div>
        <label className="item-price">R$ {price}</label>

        <input type="checkbox" name="check" onClick={evt => onItemSelected(evt.target)} className="item-check"/>
    </label>
);

export default Item;