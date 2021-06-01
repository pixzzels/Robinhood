import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { removeOneList, updateOneList } from '../../store/watchlist';
import { Modal } from '../../context/Modal';

import './List.css';

function List({ list }) {

	const upIcon = "fas fa-chevron-up"
	const downIcon = "fas fa-chevron-down"

	const dispatch = useDispatch()
	const [editForm, setEditForm] = useState(false);
	const [inputField, setInputField] = useState(list.name);

	const [showDropdown, setShowDropdown] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	const [editBtn, setEditBtn] = useState(true);
	const [deleteBtn, setDeleteBtn] = useState(true);

	const [showStocks, setShowStocks] = useState(false);

	const ref = useRef(null);

	// list logic to be continued
	const allLists = useSelector(state => {
		const lists = Object.values(state.watchlist)
		return lists
	})

	const userWatchlists = allLists.map((list => list.name))
	userWatchlists.shift()

	// console.log(allLists)
	// 


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
		// setIsVisible(false)
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

	const handleArrowClick = () => {
		setShowStocks(true);
	}

	// const handleClickOutside = (event) => {
	// 	if (ref.current && !ref.current.contains(event.target)) {
	// 		setIsVisible(false);
	// 	}
	// };

	// useEffect(() => {
	// 	document.addEventListener('click', handleClickOutside, true);
	// 	return () => {
	// 		document.removeEventListener('click', handleClickOutside, true);
	// 	};
	// }, []);


	return (
		<div className="one-list">
			<div className='list-text-container'>
				<i className="fa fa-building check-symbol" aria-hidden="true"></i>
				<h2 className='single-list-txt'>{list.name}</h2>
			</div>

			<div className='list-all-btns-container'>
				<button className="edit-btn" type="button" onClick={() => {
					handleDropdown()
					setIsVisible(!isVisible)
				}}>
					<i className="fas fa-ellipsis-h"></i>
				</button>
				<button className="edit-btn" onClick={handleArrowClick}>
					<i className={showStocks ? upIcon : downIcon}></i>
					{
						showStocks &&
						<div className='dropdown-all-stocks'>
							{/* {allLists.map((list => list.name))} */}
							{/* hello */}
						</div>
					}
				</button>
			</div>

			{
				showDropdown && isVisible &&
				<div className='edit-options-dropdown' ref={ref}>
					{/* <Modal onClose={() => setShowDropdown(false)}> */}
					<div className='list-edit-modal'>
						<div className="button-flex-container">

							<div className="edit-form-btn-container">
								{editBtn && <i className="fas fa-cog"></i>}
								{editBtn && <button className="edit-form-btn-style" type="button" onClick={updateList}>Edit list</button>}
							</div>

							{editForm &&
								<Modal>
									<div className='edit-modal-content'>
										<form className="edit-list-form" onSubmit={handleEditSubmit}>
											<div>
												<h2 className='edit-list-txt'>Edit List</h2>
												{/* <button>emoji</button> */}
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
												<button className="list-cancel-btn edit-form-btn" type="button" onClick={handleCancel}>Cancel</button>
												<button className="list-create-btn edit-form-btn" type="submit">Save</button>
											</footer>
										</form>
									</div>
								</Modal>

							}

							<div className="edit-form-btn-container">
								{editBtn && <i className="far fa-times-circle"></i>}
								{deleteBtn && <button className="edit-form-btn-style" type="button" onClick={deleteList}>Delete list</button>}
							</div>

						</div>
					</div>
					{/* </Modal> */}
				</div>
			}
		</div >
	)
}

export default List;