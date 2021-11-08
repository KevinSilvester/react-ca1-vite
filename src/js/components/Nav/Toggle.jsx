const Toggle = () => {
   return (
      <button
         className='navbar-toggler collapsed'
         type='button'
         data-bs-toggle='collapse'
         data-bs-target='#nav-filter'
         aria-controls='nav-filter'
         aria-expanded='false'
         aria-label='Toggle navigation'
      >
         <span className='navbar-toggler-icon'>
            <i className='fas fa-bars'></i>
         </span>
      </button>
   )
}

export default Toggle
