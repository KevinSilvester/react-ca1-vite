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
      <div role='form' className='search__container'>
         <input
            className='search__input'
            type='text'
            onChange={e => handleChange(e)}
            value={val}
            placeholder='Search'
         />
         <button className='search__clear' onClick={() => handleClick()}>
            <i className='fas fa-times'></i>
         </button>
      </div>
   )
}

export default Search
