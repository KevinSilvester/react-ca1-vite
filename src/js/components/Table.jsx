const Table = props => {
   return (
      <div className='container mx-auto mt-4'>
         <div className='row'>
            {props.children}
         </div>
      </div>
   )
}

export default Table
