import { useState, useEffect, useRef } from 'react'

const List = props => {
   const [val, setVal] = useState('')

   const list = props.list
   const add = props.add
   const remove = props.remove

   return (
      <div onClick={e => e.stopPropagation()} className='list__container'>
         <ul className='list__body'>
            {list && list.length > 0 ? (
               list.map((item, index) => (
                  <li key={index} className='list__item'>
                     <span>{item}</span>
                     <button className="list__btn list__btn--remove" onClick={e => remove(e, index)}>
                        <i className="fas fa-times"></i>
                     </button>
                  </li>))
            ) : (
               <div className='list__no-item'>
                  List is empty
               </div>
            )}
         </ul>
         <div role='form' className="list__form">
            <input type="text" className="list__input" value={val} onChange={e => setVal(e.target.value)} />
            <button className="list__btn list__btn--submit" onClick={e => add(e, val)}>
               <i className="fas fa-plus"></i>
            </button>
         </div>
      </div>
   )
}

export default List
