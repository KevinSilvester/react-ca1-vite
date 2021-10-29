import { useState } from "react";
import Modal from './Modal'

const Card = (props) => {
	const attraction = props.place;
   const [open, setOpen] = useState(false)

   const handleOpen = () => setOpen(!open)

	return (
		<div className="col-md-4">
         {console.log('Card rendered', attraction.id)}
         {open && <Modal attr={attraction} close={handleOpen} mode='edit' />}
			<div className="card">
				<img src={attraction.image} alt={attraction.name} className="card-img-top" />
				<div className="card-body">
					<h5 className="card-title">{attraction.name}</h5>
					<h6 className="card-subtitle mb-2 text-muted">
						{attraction.address.locality}, {attraction.address.county}
					</h6>
					<h6 className="card-subtitle mb-2 text-muted">
						Telephone: {attraction.phone}
					</h6>
					<div className="container">
						<a
							target="_blank"
							className="btn"
							role="button"
							href={attraction.website}
                     disabled
						>
							<i className="fas fa-link" />
							Visit Site
						</a>
						<button className="btn" onClick={() => handleOpen()}>
							<i className="fas fa-edit" />
							Edit
						</button>
						<button className="btn">
							<i className="fas fa-trash-alt" />
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
