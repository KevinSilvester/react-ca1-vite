import Search from './Search'

const NavBar = props => {
   const searchTerm = props.searchTerm

   return (
      <nav className="navbar navbar-expand-md rounded">
         <div className="navbar-brand">
            <Search searchTerm={searchTerm}/>
         </div>
         <button className="navbar-toggler" type='button' data-toggle='collapse' data-target='#nav-filter' aria-controls='#nav-filter' aria-expanded='false' aria-label='Toggle Navigation'></button>
         <div className="collapse navbar-collapse" id="nav-filter">
         <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">Disabled</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="http://example.com" id="dropdown09" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
              <div className="dropdown-menu" aria-labelledby="dropdown09">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
          </ul>
         </div>
      </nav>
   )
}

export default NavBar