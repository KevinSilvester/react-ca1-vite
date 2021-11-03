import React, { useState, useEffect, useContext, useReducer } from 'react'
import ReactDOM from 'react-dom'
import '@fortawesome/fontawesome-free/css/all.css'
import 'bootstrap'
import './../scss/index.scss'
import { DataCtx, DataProvider } from './contexts/DataCtx'
import { initialState, dataReducer } from './reducer/dataReducer'

import NavBar from './components/Navbar'
import Search from './components/Search'
import Table from './components/Table'
import Filter from './components/Filter'
import Card from './components/Card'
import Sort from './components/Sort'
import { randomId } from './utils/randomId'

const App = () => {
   const { _edit, _remove, _add } = useContext(DataCtx)
   const [edit, setEdit] = _edit
   const [add, setAdd] = _add
   const [remove, setRemove] = _remove

   const [state, dispatch] = useReducer(dataReducer, initialState)
   const { data, displayData, error, loaded } = state

   useEffect(() => {
      fetch('http://localhost:8000/results')
         .then(res => res.json())
         .then(jsonData => {
            let temp = []
            jsonData.map(e => {
               const attraction = {
                  id: randomId(),
                  name: e.name,
                  type: e['@type'],
                  address: {
                     locality: e.address.addressLocality,
                     county: e.address.addressRegion
                  },
                  tags: e.tags,
                  phone: e.telephone,
                  website: e.url
               }
               temp.push(attraction)
            })
            dispatch({ type: 'FETCH_SUCCESS', data: temp })
         })
         .catch(err => dispatch({ type: 'FETCH_FAIL', error: err }))
   }, [])

   useEffect(() => {
      if (Object.keys(edit).length !== 0) {
         dispatch({ type: 'EDIT', attraction: edit })
         setEdit({})
      }
   }, [edit])

   const handleFilterSort = (data, sortVal) => {}

   const handleSearch = query => {
      query.length === 0
         ? dispatch({ type: 'SEARCH_CLEAR' })
         : dispatch({ type: 'SEARCH_QUERY', query: query })
   }

   const handleSort = value => {
      if (value === "1") {
         dispatch({ type: 'SORT_NAME' })
      } else if (value === "2") {
         dispatch({ type: 'SORT_COUNTY' })
      }
   }

   const handleFilter = query => {
      dispatch({ type: 'FILTER_COUNTY', query: query })
   }

   if (error) return <div>Fetch Failed</div>

   if (!loaded) return <div>Loading....</div>

   return (
      <div>
         <Search query={handleSearch} />
         <Sort value={handleSort} />
         <Filter query={handleFilter} />
         <Table>
            {displayData.map(attraction => (
               <Card place={attraction} key={attraction.id} />
            ))}
         </Table>
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
