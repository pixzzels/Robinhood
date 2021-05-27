import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addOneList, loadAllList } from '../../store/watchlist';
import List from '../List';
import StockList from '../StockList';
import './Watchlist.css';

function Watchlist() {
  const dispatch = useDispatch();
  const user_id = useSelector(state => state.session.user.id)
  const allLists = useSelector(state => {
    const lists = Object.values(state.watchlist)
    return lists
  })

  const [listForm, setListForm] = useState(false);
  const [inputField, setInputField] = useState("")


  useEffect(() => {
    dispatch(loadAllList(user_id))
  }, [dispatch])

  const addList = () => {
    setListForm(!listForm)
  }

  const handleListSubmit = (e) => {
    e.preventDefault();
    const name = inputField;
    setListForm(!listForm)
    setInputField("")
    dispatch(addOneList({ name, user_id }));
  }

  const handleListCancel = (e) => {
    e.preventDefault();
    setInputField("")
    setListForm(!listForm)
  }

  if (!allLists) return null;

  return (
    <div className="watchlist-container">

      <div className="watchlist__stocks-wrapper">

        <div className="watchlist__stock-header">
          <span>Stocks</span>
          <button className="non-edit-btn all-stocks-header-btn">
            <i className="fas fa-ellipsis-h"></i>
          </button>
        </div>

        <StockList />
      </div>


      <div className="watchlist__list-wrapper">

        <div className="watchlist__list-header">
          <span>Lists</span>
          <button className="add-btn" type="button" onClick={addList}>
            <i class="fas fa-plus"></i>
          </button>
        </div>

        <div>
          {listForm &&
            <form className="new-list-form" onSubmit={handleListSubmit}>
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
                <button className="list-cancel-btn list-form-btn" type="button" onClick={handleListCancel}>Cancel</button>
                <button className="list-create-btn list-form-btn" type="submit">Create List</button>
              </footer>
            </form>
          }
        </div>

        {allLists && allLists.map((list) => {
          return (
            <List list={list} />
          )
        })}

      </div>

    </div >
  )
}

export default Watchlist;