import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { removeOneList, updateOneList } from '../../store/watchlist';
import { Modal } from '../../context/Modal';

import './List.css';

function List({ list }) {

	const dispatch = useDispatch()
	const [showDropdown, setShowDropdown] = useState(false);
	const [editForm, setEditForm] = useState(false);
	const [inputField, setInputField] = useState(list.name);

	const [editBtn, setEditBtn] = useState(true);
	const [deleteBtn, setDeleteBtn] = useState(true);


	// delete list
	const deleteList = () => {
		let result = window.confirm(`Are you sure you want to delete this list? It'll be gone forever!`)
		if (result) {
			const watchlistId = list.id
			setShowDropdown(false)
			dispatch(removeOneList(watchlistId))
		}
	}

	// submit edit form
	const handleEditSubmit = () => {
		const id = list.id
		const name = inputField
		setShowDropdown(false)
		dispatch(updateOneList({ id, name }))
	}

	// show/hide list options dropdown
	const handleDropdown = () => {
		setShowDropdown(!showDropdown)
		setEditBtn(true)
		setDeleteBtn(true)
	}

	// show edit form
	const updateList = () => {
		setEditForm(!editForm)
		setEditBtn(false)
		setDeleteBtn(false)
	}

	// hide edit form
	const handleCancel = () => {
		setEditForm(!editForm)
		setEditBtn(true)
		setDeleteBtn(true)
	}


	return (
		<div className="one-list">
			<h2 className='single-list-txt'>{list.name}</h2>
			<button className="edit-btn" type="button" onClick={handleDropdown}>
				<i className="fas fa-ellipsis-h"></i>
			</button>
			<button className="edit-btn">
				<i class="fas fa-chevron-down"></i>
			</button>
			{showDropdown &&
				<div>
					<Modal onClose={() => setShowDropdown(false)}>
						<div className='list-edit-modal'>
							<div className="button-flex-container">

								<div className="edit-form-btn-container">
									{editBtn && <i class="fas fa-cog"></i>}
									{editBtn && <button className="edit-form-btn-style" type="button" onClick={updateList}>Edit list</button>}
								</div>

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

								<div className="edit-form-btn-container">
									{editBtn && <i class="far fa-times-circle"></i>}
									{deleteBtn && <button className="edit-form-btn-style" type="button" onClick={deleteList}>Delete list</button>}
								</div>

							</div>
						</div>
					</Modal>
				</div>
			}
		</div>
	)
}

export default List;