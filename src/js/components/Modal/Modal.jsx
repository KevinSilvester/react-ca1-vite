import { useState, useEffect, useContext, useRef } from 'react'
import { createPortal } from 'react-dom'
import { DataCtx } from './../../contexts/DataCtx'
import Button from './../Button'
import List from './List'
import FormGroup from './FormGroup'
import Label from './Label'
import counties from './../../data/counties'
import { deepEqual } from './../../utils/compare'
import { randomId } from '../../utils/randomId'

const Modal = props => {
   const { _edit, _add } = useContext(DataCtx)
   const [edit, setEdit] = _edit
   const [add, setAdd] = _add

   const close = props.close
   const attraction = props.attr
   const addMode = props.add

   const [name, setName] = addMode ? useState('') : useState(attraction.name)
   const [locality, setLocality] = addMode
      ? useState('')
      : useState(attraction.address.locality)
   const [county, setCounty] = addMode
      ? useState('')
      : useState(attraction.address.county)
   const [phone, setPhone] = addMode ? useState('') : useState(attraction.phone)
   const [web, setWeb] = addMode ? useState('') : useState(attraction.website)
   const [type, setType] = addMode ? useState([]) : useState(attraction.type)
   const [tags, setTags] = addMode ? useState([]) : useState(attraction.tags)

   const [modalOpen, setModalOpen] = useState(true)
   const [tagListOpen, setTagListOpen] = useState(false)
   const [typeListOpen, setTypeListOpen] = useState(false)

   const nameInput = useRef(null)

   useEffect(() => nameInput.current.focus(), [])

   const handleClose = () => {
      setModalOpen(false)
      setTimeout(() => close(), 200)
   }

   const handleConfirm = e => {
      e.preventDefault()
      if (name.length === 0 || locality.length === 0 || county.length === 0) return
      if (addMode) {
         const finalEdit = {
            id: randomId(),
            name: name,
            type: type,
            address: {
               locality: locality,
               county: county
            },
            tags: tags,
            phone: phone,
            website: web
         }
         setAdd(finalEdit)
      } else {
         const finalEdit = {
            id: attraction.id,
            name: name,
            type: type,
            address: {
               locality: locality,
               county: county
            },
            tags: tags,
            phone: phone,
            website: web
         }
         !deepEqual(finalEdit, attraction) && setEdit(finalEdit)
      }
      handleClose()
   }

   const handleCancel = e => {
      e.preventDefault()
      handleClose()
   }

   const expandTags = e => {
      e.preventDefault()
      setTagListOpen(!tagListOpen)
      typeListOpen && setTypeListOpen(false)
   }

   const expandTypes = e => {
      e.preventDefault()
      setTypeListOpen(!typeListOpen)
      tagListOpen && setTagListOpen(false)
   }

   const addTag = (e, newTag) => {
      e.preventDefault()
      if (newTag.length > 0 && !tags.includes(newTag)) setTags([...tags, newTag])
   }
   const removeTag = (e, index) => {
      e.preventDefault()
      setTags([...tags.slice(0, index), ...tags.slice(index + 1)])
   }

   const addType = (e, newType) => {
      e.preventDefault()
      if (newType.length > 0 && !type.includes(newType)) setType([...type, newType])
   }
   const removeType = (e, index) => {
      e.preventDefault()
      setType([...type.slice(0, index), ...type.slice(index + 1)])
   }

   return createPortal(
      <div
         className='modal__wrapper'
         onClick={() => handleClose()}
         style={{ animationName: modalOpen ? 'modal_open' : 'modal_close' }}
      >
         <form
            onSubmit={() => handleSubmit()}
            onClick={e => {
               e.stopPropagation()
               typeListOpen && setTypeListOpen(false)
               tagListOpen && setTagListOpen(false)
            }}
            className='modal__form'
         >
            <h3 className='modal__form-title'>
               {addMode ? 'Add Attraction' : 'Edit Attraction'}
            </h3>
            <div className='modal__form-input-container'>
               <FormGroup>
                  <Label>Name</Label>
                  <input
                     name='name'
                     type='text'
                     className='modal__form-input'
                     placeholder='Name'
                     value={name}
                     onChange={e => setName(e.target.value)}
                     ref={nameInput}
                  />
               </FormGroup>
               <FormGroup>
                  <Label>Locality</Label>
                  <input
                     name='locality'
                     type='text'
                     className='modal__form-input'
                     placeholder='Locality'
                     value={locality}
                     onChange={e => setLocality(e.target.value)}
                  />
               </FormGroup>
               <FormGroup>
                  <Label>County</Label>
                  <select
                     name='county'
                     className='modal__form-select'
                     value={county}
                     onChange={e => setCounty(e.target.value)}
                  >
                     {addMode && (
                        <option hidden value='Choose County'>
                           Choose County
                        </option>
                     )}
                     {counties.map(county => (
                        <option key={county} value={county}>
                           {county}
                        </option>
                     ))}
                  </select>
               </FormGroup>
               <FormGroup>
                  <Label>Phone No.</Label>
                  <input
                     name='phone'
                     type='text'
                     className='modal__form-input'
                     placeholder='Phone No.'
                     value={phone}
                     onChange={e => setPhone(e.target.value)}
                  />
               </FormGroup>
               <FormGroup>
                  <Label>Website/Social Media</Label>
                  <input
                     name='website'
                     type='text'
                     className='modal__form-input'
                     placeholder='Website/Social Media'
                     value={web}
                     onChange={e => setWeb(e.target.value)}
                  />
               </FormGroup>
               <FormGroup>
                  <Label>Tags</Label>
                  {tagListOpen && <List list={tags} add={addTag} remove={removeTag} />}
                  <Button
                     fill
                     large
                     click={expandTags}
                     attributes={{ role: 'button', id: 'tag-button' }}
                     active={tagListOpen}
                  >
                     <i className={`fas fa-chevron-${tagListOpen ? 'down' : 'up'}`}></i>
                  </Button>
               </FormGroup>
               <FormGroup>
                  <Label>Place Type</Label>
                  {typeListOpen && <List list={type} add={addType} remove={removeType} />}
                  <Button
                     fill
                     large
                     click={expandTypes}
                     attributes={{ role: 'button', id: 'type-button' }}
                     active={typeListOpen}
                  >
                     <i className={`fas fa-chevron-${typeListOpen ? 'down' : 'up'}`}></i>
                  </Button>
               </FormGroup>
            </div>
            <div className='modal__form-btn'>
               <Button fill click={handleConfirm} attributes={{ role: 'button' }}>
                  <i className='fas fa-check'></i>
                  <span>Confirm</span>
               </Button>
               <Button fill click={handleCancel} attributes={{ role: 'button' }}>
                  <i className='fas fa-times'></i>
                  <span>Cancel</span>
               </Button>
            </div>
         </form>
      </div>,
      document.getElementById('modal')
   )
}

export default Modal
