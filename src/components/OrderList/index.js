import React from 'react';

import Item from './Item';

import './styles.css';

const renderList = (list = [], itemSelected) => (
    <div className="order-list-container">
        {renderItemSelected(itemSelected)}
        {list.map(item => <Item {...item} key={item.id} />)}
    </div>
);

const renderItemSelected = ({ name, description, onCancel}) => (
    <div className="order-item-container">
        <div className="order-item-title-container">
            <strong className="order-item-name">{name}</strong>
            <label className="order-item-description">{description}</label>
        </div>
        <button className="order-item-cancel-button" onClick={() => onCancel()}>X</button>
    </div>
);


const OrderList = ({ item, data }) => {
    return (
        <div className="order-container">
            {renderList(data, item)}
        </div>
    )
}

export default OrderList;