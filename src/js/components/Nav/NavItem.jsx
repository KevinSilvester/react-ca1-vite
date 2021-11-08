const NavItem = props => {
   const dropdown = props.dropdown
   const attributes = props.attributes
   const filter = props.filter
   const disabled = props.disabled
   const handleClick = props.click || (() => {return})
   const active = props.active

   return (
      <li className={`nav-item ${dropdown ? 'dropdown' : ''}`}>
         <div
            className={`nav-link ${dropdown ? 'dropdown-toggle' : ''}`}
            {...attributes}
            onClick={() => handleClick()}
            data-disabled={disabled}
            data-active={active}
         >
            {props.children}
         </div>
         {dropdown && filter}
      </li>
   )
}

export default NavItem
