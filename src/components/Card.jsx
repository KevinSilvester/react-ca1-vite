import { useState, useRef, useEffect } from 'react'
import Modal from './Modal'
import Button from './Button'

const Card = (props) => {
	const attraction = props.place
	const [open, setOpen] = useState(false)

   const linkButton = useRef(null)

	const handleOpen = () => setOpen(!open)

	return (
		<div className='col-md-4'>
			{console.log('Card rendered', attraction.id)}
			{open && <Modal attr={attraction} close={handleOpen} edit />}
			<div className='card'>
				<img
					src={attraction.image}
					alt={attraction.name}
					className='card-img-top'
				/>
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
								!attraction.website && {
									['data-tooltip']: true,
                           ['data-msg']: 'No Link Available',
                           disabled: true
								}
							}
						>
							<a
								target='_blank'
								className={`card__link ${
									!attraction.website && 'disabled'
								}`}
								href={attraction.website}
							>
								{attraction.website ? (
									<i className='fas fa-link' />
								) : (
									<i class='fas fa-unlink'></i>
								)}
								<span>Visit Site</span>
							</a>
						</Button>
						<Button fill click={handleOpen}>
							<i className='fas fa-edit' />
							<span>Edit</span>
						</Button>
						<Button fill>
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
