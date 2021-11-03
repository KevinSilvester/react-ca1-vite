import { useState, useEffect } from 'react'
import Button from './Button'

const Sort = props => {
   const [val, setVal] = useState('')

   const value = props.value

   useEffect(() => value(val), [val])

   const sortName = () => setVal('1')
   const sortCounty = () => setVal('2')

   return (
      <div className='sort__container'>
         <Button fill large click={sortName}>
            <i class="fas fa-sort-alpha-up"></i>
            <span>Sort By Name</span>
         </Button>
         <Button fill large click={sortCounty}>
            <i class="fas fa-sort-alpha-up"></i>
            <span>Sort By County</span>
         </Button>
      </div>
   )
}

export default Sort
