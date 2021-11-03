import counties from "../data/counties"

const Filter = props => {

   const query = props.query

   return (
      <div role='form' className='filter__container'>
         {counties.map(county => <button className='filter_search' onClick={() => query(county)} style={{ color: 'black'}}>{county}</button>)}

         <button className='filter__clear' onClick={() => query("")} style={{ color: 'black'}}>
            All Counties
         </button>
      </div>
   )
}

export default Filter
