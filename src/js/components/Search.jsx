import { useState, useEffect } from 'react'

const Search = (props) => {
   const [val, setVal] = useState('')

   const searchTerm = props.searchTerm

   useEffect(() => searchTerm(val), [val])

   return (
      <div role='form' className='search__container'>
         <input
            className='search__input'
            type='text'
            onChange={(e) => setVal(e.target.value)}
            value={val}
            placeholder='Search'
         />
         <button className='search__clear' onClick={() => setVal('')}>
            <i className='fas fa-times'></i>
         </button>
      </div>
   )
}

export default Search
