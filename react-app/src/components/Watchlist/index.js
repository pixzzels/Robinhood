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
  const [newList, setNewList] = useState('');
  // console.log("Watchlist", allLists)

  useEffect(() => {
    dispatch(loadAllList(user_id))
  }, [dispatch])

  const addList = () => {
    setListForm(!listForm)
  }

  const handleListSubmit = (e) => {
    e.preventDefault();
    const name = newList;
    dispatch(addOneList({ name, user_id }));
  }

  if (!allLists) return null;



  return (
    < div className="watchlist-container" >

      <div className="watchlist__stocks-wrapper">

        <div className="watchlist__stock-header">
          <span>Stocks</span>
          <button className="all-stocks-header-btn btn">
            <svg fill="none" height="24" role="img" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.5 10.5H3.5V13.5H6.5V10.5Z" fill="grey"></path>
              <path d="M13.5 10.5H10.5V13.5H13.5V10.5Z" fill="grey"></path>
              <path d="M17.5 10.5H20.5V13.5H17.5V10.5Z" fill="grey"></path>
            </svg>
          </button>
        </div>

        <StockList />
      </div>


      <div className="watchlist__list-wrapper">
        <div className="watchlist__list-header">
          <span>Lists</span>
          <button className="btn" type="button" onClick={addList}>
            <svg fill="none" height="16" role="img" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.125 8.875V14H8.875V8.875H14V7.125H8.875V2H7.125V7.125H2V8.875H7.125Z" fill="black"></path>
            </svg>
          </button>
        </div>

        <div>
          {listForm &&

            <form className="new-list-form" onSubmit={handleListSubmit}>
              <input
                className="new-list-input"
                name='list'
                placeholder="List Name"
                value={newList}
                onChange={e => setNewList(e.target.value)}
              >
              </input>
              <footer>
                <button className="list-form-btn" type="button">Cancel</button>
                <button className="list-form-btn" type="submit">Create List</button>
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