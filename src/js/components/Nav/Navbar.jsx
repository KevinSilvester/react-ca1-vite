import Toggle from './Toggle'

const NavBar = props => {

   return (
      <nav className='navbar navbar-expand-lg rounded'>
         {props.search}
         <Toggle />
         <div className='collapse navbar-collapse' id='nav-filter'>
            <ul className='navbar-nav ms-auto'>
               {props.children}
            </ul>
         </div>
      </nav>
   )
}

export default NavBar
