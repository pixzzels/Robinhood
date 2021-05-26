import React, { useState, useEffect } from 'react';
import './List.css';

function List({ list }) {

    return (
        <div className="one-list-container">
            <div className="one-list__img"></div>
            <h2>{list.name}</h2>
        </div>
    )
}

export default List;