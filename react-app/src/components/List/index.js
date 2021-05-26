import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';

import './List.css';

function List({ list }) {

    const [showDropdown, setShowDropdown] = useState(false);

    const handleDropdown = () => {
        setShowDropdown(!showDropdown)
    }

    return (
        <div className="one-list">
            <h2 className='single-list-txt'>{list.name}</h2>
            <button type="button" onClick={handleDropdown}>
                <i className="fas fa-ellipsis-h"></i>
            </button>
            {showDropdown &&
                <Modal>
                    hello
                </Modal>
            }
        </div>
    )
}

export default List;