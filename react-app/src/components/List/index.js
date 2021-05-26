import React, { useState, useEffect } from 'react';
import './List.css';

function List({ list }) {

    return (
        <div className="one-list">
            <h2 className='single-list-txt'>{list.name}</h2>
            <button>
                <i className="fas fa-ellipsis-h"></i>
            </button>
        </div>
    )
}

export default List;