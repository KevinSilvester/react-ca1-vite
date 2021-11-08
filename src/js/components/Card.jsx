import { useState, useRef, useContext } from 'react'
import { DataCtx } from '../contexts/DataCtx'
import img from './../../assets/ireland.svg'
import Modal from './Modal/Modal'
import Button from './Button'

// https://codepen.io/nikki-peel/pen/RwavQer
const Card = props => {
   const attraction = props.place
   const [open, setOpen] = useState(false)
   const [map, setMap] = useState(false)

   const { _remove } = useContext(DataCtx)
   const [remove, setRemove] = _remove

   const linkButton = useRef(null)

   const handleOpen = () => setOpen(!open)

   const handleDelete = () => setRemove(attraction)

   return (
      <div className='col-md-4'>
         {open && <Modal attr={attraction} close={handleOpen} edit />}
         <div className='card'>
            <div
               className='card-img-top card__img-container'
               onClick={() => setMap(true)}
            >
               {!map ? (
                  <img src={img} alt={attraction.name} className='card__img' />
               ) : (
                  <iframe
                     className='card__img--iframe'
                     allowFullScreen
                     src={`https://www.google.com/maps/embed/v1/place?q=${attraction.name.replaceAll(' ', '+')}+${attraction.address.county}&key=AIzaSyDYWfqF0kA-JACNiVeTn4_E7vG4SkCxnoE`}
                  ></iframe>
               )}
            </div>
            <div className='card-body'>
               <h5 className='card-title'>{attraction.name}</h5>
               <h6 className='card-subtitle mb-2 text-muted'>
                  {attraction.address.locality}, {attraction.address.county}
               </h6>
               <h6 className='card-subtitle mb-2 text-muted'>
                  Telephone: {attraction.phone ? attraction.phone : '---'}
               </h6>
               <div className='card__btn-container'>
                  <Button
                     fill
                     attributes={
                        !attraction.website
                           ? {
                                ['data-tooltip']: true,
                                ['data-msg']: 'No Link Available',
                                disabled: true
                             }
                           : { role: 'link' }
                     }
                  >
                     <a
                        target='_blank'
                        className={`card__link ${!attraction.website && 'disabled'}`}
                        href={attraction.website}
                     >
                        {attraction.website ? (
                           <i className='fas fa-link' />
                        ) : (
                           <i className='fas fa-unlink'></i>
                        )}
                        <span>Visit Site</span>
                     </a>
                  </Button>
                  <Button fill click={handleOpen} attributes={{ role: 'button' }}>
                     <i className='fas fa-edit' />
                     <span>Edit</span>
                  </Button>
                  <Button fill click={handleDelete} attributes={{ role: 'button' }}>
                     <i className='fas fa-trash-alt' />
                     <span>Delete</span>
                  </Button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Card
