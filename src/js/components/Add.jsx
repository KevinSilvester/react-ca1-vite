import { useState } from 'react'
import Modal from './Modal/Modal'

// https://codepen.io/nikki-peel/pen/RwavQer
const Add = () => {
   const [open, setOpen] = useState(false)

   const handleOpen = () => setOpen(!open)

   return (
      <div className='col-md-4'>
         {open && <Modal close={handleOpen} add />}
         <div className='card add__wrapper' onClick={() => handleOpen()}>
            <div className='add__container'>
               <i className='fas fa-plus'></i>
            </div>
         </div>
      </div>
   )
}

export default Add
