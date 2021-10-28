import { useState, useEffect, useContext, useRef } from "react";
import { createPortal } from "react-dom";
import { DataCtx } from "../contexts/DataCtx";
import Button from "./Button";
import counties from "../data/counties";

const Edit = (props) => {
	const { e } = useContext(DataCtx);
	const [edit, setEdit] = e;

	const close = props.close;
	const attraction = props.attr;

	const [name, setName] = useState(attraction.name);
	const [locality, setLocality] = useState(attraction.address.locality);
	const [county, setCounty] = useState(attraction.address.county);
	const [phone, setPhone] = useState(attraction.phone);
   const [web, setWeb] = useState(attraction.website)
   const [img, setImg] = useState(attraction.image)

	const [finalEdit, setFinalEdit] = useState(null);

	const nameInput = useRef(null)

   const handleConfirm = e => {
      e.preventDefault()
   }

   const handleCancel = e => {
      e.preventDefault()
      close()
   }

	useEffect(() => {
      nameInput.current.focus()
		setEdit({ msg: "hello" });
		return () => {
			setEdit({ msg: "bye" });
		};
	}, []);

	return createPortal(
		<div className="modal__wrapper" onClick={() => close()}>
			<form onSubmit={() => handleSubmit()} onClick={e => e.stopPropagation()} className="modal__form">
				<h3 className="modal__form-title">Edit Attraction</h3>
				<div className="modal__form-input-container">
					<div className="modal__form-group">
						<span className="modal__form-label">Name</span>
						<input
							name="name"
							type="text"
							className="modal__form-input"
							placeholder="Name"
                     value={name}
                     onChange={e => setName(e.target.value)}
                     ref={nameInput}
						/>
					</div>
					<div className="modal__form-group">
						<span className="modal__form-label">Locality</span>

						<input
							name="locality"
							type="text"
							className="modal__form-input"
							placeholder="Locality"
                     value={locality}
                     onChange={e => setLocality(e.target.value)}
						/>
					</div>
					<div className="modal__form-group">
						<span className="modal__form-label">County</span>
						<select name="county" className="modal__form-select" value={county}
                     onChange={e => setCounty(e.target.value)}>
							{counties.map((e) => (
								<option key={e} value={e} selected={e === attraction.address.county}>
									{e}
								</option>
							))}
						</select>
					</div>
					<div className="modal__form-group">
						<span className="modal__form-label">Phone No.</span>
						<input
							name="phone"
							type="text"
							className="modal__form-input"
							placeholder="Phone No."
                     value={phone}
                     onChange={e => setPhone(e.target.value)}
						/>
					</div>
					<div className="modal__form-group">
						<span className="modal__form-label">
							Website/Social Media
						</span>
						<input
							name="website"
							type="text"
							className="modal__form-input"
							placeholder="Website/Social Media"
                     value={web}
                     onChange={e => setWeb(e.target.value)}
						/>
					</div>
					<div className="modal__form-group">
						<span className="modal__form-label">Image Link</span>
						<input
							name="image"
							type="text"
							className="modal__form-input"
							placeholder="Image Link"
                     value={img}
                     onChange={e => setImg(e.target.value)}
						/>
					</div>
				</div>
				<Button handleClick={handleConfirm}>
					<i className="fas fa-check"></i>
					Confirm
				</Button>
				<Button handleClick={handleCancel}>
					<i className="fas fa-times"></i>
					Cancel
				</Button>
			</form>
		</div>,
		document.getElementById("modal")
	);
};

export default Edit;
