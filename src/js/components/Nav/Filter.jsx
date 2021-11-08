import { useState } from 'react'
import counties from '../../data/counties'

const Filter = props => {
   const query = props.query
   const [county, setCounty] = useState('All Counties')

   const handleChange = county => {
      setCounty(county)
      query(county)
   }

   return (
      <div className='dropdown-menu' aria-labelledby='dropdown' style={{ left: '-50%', width: '150%' }}>
         <div className='dropdown-item'>
            <div className='form-group'>
               <label htmlFor="select-county">Select County</label>
               <select
                  name='Filter County'
                  className='form-select'
                  value={county}
                  onChange={e => handleChange(e.target.value)}
                  id='select-county'
               >
                  <option value='All Counties'>All Counties</option>
                  {counties.map(county => (
                     <option key={county} value={county}>
                        {county}
                     </option>
                  ))}
               </select>
            </div>
         </div>
      </div>
   )
}

export default Filter
