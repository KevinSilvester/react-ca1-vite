import { useState, useEffect, useContext, useRef } from 'react'
import { createPortal } from 'react-dom'
import { DataCtx } from '../contexts/DataCtx'
import Button from './Button'
import counties from '../data/counties'
import { deepEqual } from '../utils/compare'

const Modal = (props) => {
	const { e } = useContext(DataCtx)
	const [edit, setEdit] = e

	const close = props.close
	const attraction = props.attr
	const addMode = props.add

	const [name, setName] = addMode ? useState('') : useState(attraction.name)
	const [locality, setLocality] = addMode ? useState('') : useState(attraction.address.locality)
	const [county, setCounty] = addMode ? useState('') : useState(attraction.address.county)
	const [phone, setPhone] = addMode ? useState('') : useState(attraction.phone)
	const [web, setWeb] = addMode ? useState('') : useState(attraction.website)
	const [img, setImg] = addMode ? useState('') : useState(attraction.image)
	const [type, setType] = addMode ? useState('') : useState(attraction.type)
	const [tags, setTabs] = addMode ? useState('') : useState(attraction.tags)

	const [isOpen, setIsOpen] = useState(true)

   useEffect(() => nameInput.current.focus(), [])

	const nameInput = useRef(null)

	const handleClose = () => {
		setIsOpen(false)
		setTimeout(() => close(), 200)
	}

	const handleConfirm = (e) => {
		e.preventDefault()
		const finalEdit = {
			id: attraction.id,
			name: name,
			type: type,
			address: {
				locality: locality,
				county: county
			},
			image: img,
			tags: tags,
			phone: phone,
			website: web
		}
		!deepEqual(finalEdit, attraction) && setEdit(finalEdit)
		handleClose()
	}

	const handleCancel = (e) => {
		e.preventDefault()
		handleClose()
	}

   const expandTags = e => {
      e.preventDefault()
   }

   const expandTypes = e => {
      e.preventDefault()
   }

	return createPortal(
		<div
			className='modal__wrapper'
			onClick={() => handleClose()}
			style={{ animationName: isOpen ? 'modal_open' : 'modal_close' }}
		>
			<form
				onSubmit={() => handleSubmit()}
				onClick={(e) => e.stopPropagation()}
				className='modal__form'
			>
				<h3 className='modal__form-title'>Edit Attraction</h3>
				<div className='modal__form-input-container'>
					<div className='modal__form-group'>
						<span className='modal__form-label'>Name</span>
						<input
							name='name'
							type='text'
							className='modal__form-input'
							placeholder='Name'
							value={name}
							onChange={(e) => setName(e.target.value)}
							ref={nameInput}
						/>
					</div>
					<div className='modal__form-group'>
						<span className='modal__form-label'>Locality</span>

						<input
							name='locality'
							type='text'
							className='modal__form-input'
							placeholder='Locality'
							value={locality}
							onChange={(e) => setLocality(e.target.value)}
						/>
					</div>
					<div className='modal__form-group'>
						<span className='modal__form-label'>County</span>
						<select
							name='county'
							className='modal__form-select'
							value={county}
							onChange={(e) => setCounty(e.target.value)}
						>
							{addMode && (
								<option hidden value='Choose County'>
									Choose County
								</option>
							)}
							{counties.map((e) => (
								<option key={e} value={e}>
									{e}
								</option>
							))}
						</select>
					</div>
					<div className='modal__form-group'>
						<span className='modal__form-label'>Phone No.</span>
						<input
							name='phone'
							type='text'
							className='modal__form-input'
							placeholder='Phone No.'
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
						/>
					</div>
					<div className='modal__form-group'>
						<span className='modal__form-label'>
							Website/Social Media
						</span>
						<input
							name='website'
							type='text'
							className='modal__form-input'
							placeholder='Website/Social Media'
							value={web}
							onChange={(e) => setWeb(e.target.value)}
						/>
					</div>
					<div className='modal__form-group'>
						<span className='modal__form-label'>Image Link</span>
						<input
							name='image'
							type='text'
							className='modal__form-input'
							placeholder='Image Link'
							value={img}
							onChange={(e) => setImg(e.target.value)}
						/>
					</div>
					<div className='modal__form-group'>
						<span className='modal__form-label'>Tags</span>
						<Button fill large click={expandTags}>
							<i className='fas fa-chevron-up'></i>
						</Button>
					</div>
					<div className='modal__form-group'>
						<span className='modal__form-label'>Place Type</span>
						<Button fill large click={expandTypes}>
							<i className='fas fa-chevron-up'></i>
						</Button>
					</div>
				</div>
				<div className='modal__form-btn'>
					<Button fill click={handleConfirm}>
						<i className='fas fa-check'></i>
						<span>Confirm</span>
					</Button>
					<Button fill click={handleCancel}>
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
