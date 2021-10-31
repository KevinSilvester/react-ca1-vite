import React, { useState, useEffect, useContext, useMemo, useCallback } from 'react'
import ReactDOM from 'react-dom'
import './../scss/index.scss'
import 'bootstrap'
import '@fortawesome/fontawesome-free/css/all.css'
import { DataCtx, DataProvider } from './contexts/DataCtx'
import NavBar from './components/Navbar'
import Search from './components/Search'
import Table from './components/Table'
import { randomId } from './utils/randomId'

const App = () => {
   const { _edit, _remove, _add } = useContext(DataCtx)
   const [edit, setEdit] = _edit
   const [add, setAdd] = _add
   const [remove, setRemove] = _remove
   const [error, setError] = useState(null)
   const [data, setData] = useState(null)
   const [displayData, setDisplayData] = useState(null)

   useEffect(() => {
      fetch('http://localhost:8000/results')
         .then((res) => res.json())
         .then((jsonData) => {
            let temp = []
            jsonData.map((e) => {
               const place = {
                  id: randomId(),
                  name: e.name,
                  type: e['@type'],
                  address: {
                     locality: e.address.addressLocality,
                     county: e.address.addressRegion
                  },
                  image: e.image.url,
                  tags: e.tags,
                  phone: e.telephone,
                  website: e.url
               }
               temp.push(place)
            })
            setData([...temp])
            setDisplayData([...temp])
         })
         .catch((err) => setError(err))
   }, [])

   const handleFilterSort = (data, sortVal) => { }

   const handleSearch = (searchTerm) => {
      if (searchTerm.length === 0) {
         setDisplayData([...data])
         return
      }
      setDisplayData([
         ...data.filter((place) =>
            place.name.toLowerCase().match(new RegExp(searchTerm.toLowerCase()))
         )
      ])
   }

   const TableComp = useMemo(() => <Table data={displayData} />, [displayData])

   if (error) return <div>Fetch Failed</div>

   if (displayData === null) return <div>Loading....</div>

   return (
      <div>
         {console.log(edit, add, remove)}
         <Search searchTerm={handleSearch} />
         {TableComp}
      </div>
   )
}

ReactDOM.render(
   <React.StrictMode>
      <DataProvider>
         <App />
      </DataProvider>
   </React.StrictMode>,
   document.getElementById('root')
)
