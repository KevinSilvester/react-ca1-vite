import { useState, useEffect, useRef } from 'react'
import { randomId } from '../utils/randomId'

const List = props => {
   const list = props.list
   return (
      <div className='list__container'>
         <ul className='list__body'>
            {list && list.length > 0 ? (
               list.map(item => <li key={randomId()} className='list__item'>{item}</li>)
            ) : (
               <div className='list__no-item'>List is empty</div>
            )}
         </ul>
         <form className="list__form">
            <input type="text" className="list__form-input" />
            <button className="list__form-submit">
               <i class="fas fa-plus"></i>
            </button>
         </form>
      </div>
   )
}

export default List
