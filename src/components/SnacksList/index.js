import React from 'react';

import Item from './Item';

import './styles.css';

const SnacksList = ({ data, title, onItemSelected }) => {

    const list = data || [];

    return (
        <div className="snacks-list-container">
            <h2 className="list-title">{title}</h2>
            {list.map(item => (
                <Item
                    key={item.id}
                    {...item}
                    onItemSelected={({ checked }) => onItemSelected(item, checked)}
                />
            ))}
        </div>
    )
}

export default SnacksList;