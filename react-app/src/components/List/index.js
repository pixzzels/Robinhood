import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { removeOneList } from '../../store/watchlist';
import { Modal } from '../../context/Modal';

import './List.css';

function List({ list }) {

    const dispatch = useDispatch()
    const [showDropdown, setShowDropdown] = useState(false);
    // const [watchlistId, setWatchlistId] = useState(0)

    // useEffect(() => {
    //     if (watchlistId)
    // })

    const handleDropdown = () => {
        setShowDropdown(!showDropdown)
    }

    const deleteList = (watchlistId) => {
        // const listId = watchlistId
        dispatch(removeOneList(watchlistId))
    }

    return (
        <div className="one-list">
            <h2 className='single-list-txt'>{list.name}</h2>
            <button type="button" onClick={handleDropdown}>
                <i className="fas fa-ellipsis-h"></i>
            </button>
            {showDropdown &&
                <div>
                    <Modal onClose={() => setShowDropdown(false)}>
                        <button>
                            Edit list
                    </button>
                        <button type="button" onClick={() => deleteList(list.id)}>
                            Delete list
                    </button>
                    </Modal>
                </div>
            }
        </div>
    )
}

export default List;