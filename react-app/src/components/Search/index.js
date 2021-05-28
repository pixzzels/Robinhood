import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Search.css';

function Search() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([]);

  const setTerm = (e) => setSearchTerm(e.target.value);
  console.log(searchTerm)
  let results;

  useEffect( async (e)=> {
    const iex_api_key = 'pk_7f972a2636b841c489f3cf32f9a06575'
    const res = await fetch(`https://cloud.iexapis.com/stable/search/${searchTerm}?token=${iex_api_key}`)
    const response = await res.json()
    setSearchResults(response.filter(i => i['name'].includes(searchTerm.toUpperCase()) || i['symbol'].includes(searchTerm.toUpperCase()) && !i['symbol'].includes('-')))

    console.log(results)
  })

  // const handleClick = async (e) => {
  //   e.preventDefault()
  //   if( searchTerm == '') {
  //     return
  //   } else {
  //     const iex_api_key = 'pk_7f972a2636b841c489f3cf32f9a06575'
  //     const res = await fetch(`https://cloud.iexapis.com/stable/search/${searchTerm}?token=${iex_api_key}`)
  //     const response = await res.json()
  //     console.log(response)
  //   }
  // }

  // iex_api_key = 'pk_7f972a2636b841c489f3cf32f9a06575'
  // api_url = `https://cloud.iexapis.com/stable/search/${searchTerm}?token=${iex_api_key}`

  const handleClick = () => {

  }

  console.log(results)

  return (
    <>
      <form>
        <input
          className='portfolio-search'
          type='text'
          placeholder='Search'
          onChange={setTerm}
          value={searchTerm}
          // required
        />
      </form>
      <div>
        {searchResults.map((result) => {
          return (
            <a href={`/stocks/${result.symbol}`} onClick={handleClick} value={result.symbol}>
              {result.symbol} {result.name}
            </a>
          )
        })}
      </div>
    </>
  )
}

export default Search;
