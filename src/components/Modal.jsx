import { useState, useEffect, useContext, useRef } from "react";
import { createPortal } from "react-dom";
import { DataCtx } from "../contexts/DataCtx";
import Button from "./Button";
import counties from "../data/counties";
import { deepEqual } from "../utils/compare";

const Modal = (props) => {
   const { e } = useContext(DataCtx);
   const [edit, setEdit] = e;

   const close = props.close;
   const attraction = props.attr;
   const mode = props.mode

   const [name, setName] = mode === 'add' ? useState('') : useState(attraction.name);
   const [locality, setLocality] = mode === 'add' ? useState('') : useState(attraction.address.locality);
   const [county, setCounty] = mode === 'add' ? useState('') : useState(attraction.address.county);
   const [phone, setPhone] = mode === 'add' ? useState('') : useState(attraction.phone);
   const [web, setWeb] = mode === 'add' ? useState('') : useState(attraction.website)
   const [img, setImg] = mode === 'add' ? useState('') : useState(attraction.image)
   const [type, setType] = mode === 'add' ? useState('') : useState(attraction.type)
   const [tags, setTabs] = mode === 'add' ? useState('') : useState(attraction.tags)

   const [isOpen, setIsOpen] = useState(true)

   const nameInput = useRef(null)

   const handleClose = () => {
      setIsOpen(false)
      setTimeout(() => close(), 200)
   }

   const handleConfirm = e => {
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

   const handleCancel = e => {
      e.preventDefault()
      handleClose()
   }

   useEffect(() => {
      nameInput.current.focus()
   }, []);

   return createPortal(
      <div className="modal__wrapper" onClick={() => handleClose()} style={{ animationName: isOpen ? 'modal_open' : 'modal_close' }}>
         <form
            onSubmit={() => handleSubmit()}
            onClick={(e) => e.stopPropagation()}
            className="modal__form"

         >
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
                     onChange={(e) => setName(e.target.value)}
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
                     onChange={(e) => setLocality(e.target.value)}
                  />
               </div>
               <div className="modal__form-group">
                  <span className="modal__form-label">County</span>
                  <select
                     name="county"
                     className="modal__form-select"
                     value={county}
                     onChange={(e) => setCounty(e.target.value)}
                  >
                     {mode === 'add' && <option hidden value="Choose County">Choose County</option>}
                     {counties.map((e) => (
                        <option
                           key={e}
                           value={e}
                        >
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
                     onChange={(e) => setPhone(e.target.value)}
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
                     onChange={(e) => setWeb(e.target.value)}
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
                     onChange={(e) => setImg(e.target.value)}
                  />
               </div>
               <div className="modal__form-group">
                  <span className="modal__form-label">Tags</span>
                  <Button fill large>
                     <i class="fas fa-chevron-up"></i>
                  </Button>
               </div>
               <div className="modal__form-group">
                  <span className="modal__form-label">Place Type</span>
                  <Button fill large>
                     <i class="fas fa-chevron-up"></i>
                  </Button>
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

export default Modal;
