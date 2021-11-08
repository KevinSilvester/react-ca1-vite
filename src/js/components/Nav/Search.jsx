import { useState } from 'react'

const Search = props => {
   const [val, setVal] = useState('')

   const query = props.query

   const handleChange = e => {
      query(e.target.value)
      setVal(e.target.value)
   }

   const handleClick = () => {
      query('')
      setVal('')
   }

   return (
      <div role='form' className='search__container d-flex my-2 my-md-0'>
         <input
            className='search__input form-control'
            type='search'
            onChange={e => handleChange(e)}
            value={val}
            placeholder='Search'
            aria-label='Search'
         />
         <button className='search__btn' onClick={() => handleClick()}>
            <i className='fas fa-times'></i>
         </button>
      </div>
   )
}

export default Search
