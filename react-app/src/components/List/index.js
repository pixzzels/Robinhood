import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { removeOneList, updateOneList } from '../../store/watchlist';
import { Modal } from '../../context/Modal';

import './List.css';

function List({ list }) {

    const dispatch = useDispatch()
    const [showDropdown, setShowDropdown] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [inputField, setInputField] = useState("");

    const [editBtn, setEditBtn] = useState(true);
    const [deleteBtn, setDeleteBtn] = useState(true);

    const deleteList = () => {
        const watchlistId = list.id
        setShowDropdown(false)
        dispatch(removeOneList(watchlistId))
    }

    const handleEditSubmit = () => {
        const id = list.id
        const name = inputField
        setShowDropdown(false)
        dispatch(updateOneList({ id, name }))
    }

    const handleDropdown = () => {
        setShowDropdown(!showDropdown)
        setEditBtn(true)
        setDeleteBtn(true)
    }

    const updateList = () => {
        setEditForm(!editForm)
        setEditBtn(false)
        setDeleteBtn(false)
    }

    const handleCancel = () => {
        setEditForm(!editForm)
        setEditBtn(true)
        setDeleteBtn(true)
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
                        <div>
                            {editBtn && <button type="button" onClick={updateList}>Edit list</button>}
                            {editForm &&
                                <form className="new-list-form" onSubmit={handleEditSubmit}>
                                    <div>
                                        <button>emoji</button>
                                        <input
                                            className='list-input'
                                            name='list'
                                            placeholder="List Name"
                                            value={inputField}
                                            onChange={e => setInputField(e.target.value)}
                                        >
                                        </input>
                                    </div>
                                    <footer>
                                        <button className="list-cancel-btn list-form-btn" type="button" onClick={handleCancel}>Cancel</button>
                                        <button className="list-create-btn list-form-btn" type="submit">Save</button>
                                    </footer>
                                </form>
                            }
                        </div>



                        {deleteBtn && <button type="button" onClick={deleteList}>Delete list</button>}
                    </Modal>
                </div>
            }
        </div>
    )
}

export default List;