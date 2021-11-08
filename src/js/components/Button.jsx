const Button = props => {
   const handleClick = props.click || (() => {return})
   const large = props.large
   const fill = props.fill
   const attributes = props.attributes
   const active = props.active

   return (
      <button
         className={`btn__wrapper btn__wrapper--${large ? 'lg' : 'sm'}  ${active && 'active'}`}
         onClick={e => handleClick(e)}
         {...attributes}
      >
         <div className={`btn__body btn__body--${fill ? 'pink' : 'grey'}`}>
            {props.children}
         </div>
      </button>
   )
}

export default Button