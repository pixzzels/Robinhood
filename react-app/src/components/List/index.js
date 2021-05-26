import React, { useState, useEffect } from 'react';
import './List.css';

function List({ list }) {

    return (
        <div className="one-list">
            {/* <div className="one-list__img"></div> */}
            <h2 className='single-list-txt'>{list.name}</h2>
        </div>
    )
}

export default List;