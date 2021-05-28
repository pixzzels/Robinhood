import React, { useState, useEffect } from 'react';
import './Search.css';

function Search() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([]);

  const setTerm = (e) => setSearchTerm(e.target.value);
  console.log(searchTerm)
  let results;

  // const ref = useRef(null);

  useEffect(async (e) => {
    const iex_api_key = 'pk_7f972a2636b841c489f3cf32f9a06575'
    const res = await fetch(`https://cloud.iexapis.com/stable/search/${searchTerm}?token=${iex_api_key}`)
    const response = await res.json()
    setSearchResults(response.filter(i => i['name'].includes(searchTerm.toUpperCase()) || i['symbol'].includes(searchTerm.toUpperCase()) && !i['symbol'].includes('-')))

    console.log(results)
  })

  // useEffect(() => {
  //   document.addEventListener('click', handleClickOutside, true);
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside, true);
  //   };
  // }, []);


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
        />
      </form>

      <div className='results-container'>
        {searchResults.map((result) => {
          return (
            <div>
              <a href={`/stocks/${result.symbol}`} value={result.symbol} className='results-text'>
                <div className="result-text-container">
                  <div>{result.symbol}</div>
                  <div>{result.name}</div>
                </div>
              </a>
            </div>
          )
        })}
      </div>

    </>
  )
}

export default Search;
