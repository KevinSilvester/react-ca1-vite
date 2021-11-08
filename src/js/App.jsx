import React, { useState, useEffect, useContext, useReducer, useCallback } from 'react'
import ReactDOM from 'react-dom'
import '@fortawesome/fontawesome-free/css/all.css'
import 'bootstrap'
import './../scss/index.scss'
import { DataCtx, DataProvider } from './contexts/DataCtx'
import { initialState, dataReducer } from './reducer/dataReducer'

import NavBar from './components/Nav/Navbar'
import Search from './components/Nav/Search'
import NavItem from './components/Nav/NavItem'
import Table from './components/Table'
import Filter from './components/Nav/Filter'
import Card from './components/Card'
import { randomId } from './utils/randomId'
import Container from './components/Container'
import Add from './components/Add'

const App = () => {
   const { _edit, _remove, _add } = useContext(DataCtx)
   const [edit, setEdit] = _edit
   const [add, setAdd] = _add
   const [remove, setRemove] = _remove

   const [state, dispatch] = useReducer(dataReducer, initialState)
   const { data, filterData, displayData, error, loaded } = state

   const [disabled, setDisabled] = useState(false)
   const [active, setActive] = useState('')

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
                  phone: e?.telephone,
                  website: e?.url
               }
               temp.push(attraction)
            })
            dispatch({ type: 'FETCH_SUCCESS', data: temp })
         })
         .catch(err => dispatch({ type: 'FETCH_FAIL', error: err }))
   }, [])

   useEffect(() => {
      if (Object.keys(add).length !== 0) {
         console.log(add)
         dispatch({ type: 'ADD', attraction: add })
         setAdd({})
      }
   }, [add])

   useEffect(() => {
      if (Object.keys(edit).length !== 0) {
         dispatch({ type: 'EDIT', attraction: edit })
         setEdit({})
      }
   }, [edit])

   useEffect(() => {
      if (Object.keys(remove).length !== 0) {
         dispatch({ type: 'REMOVE', attraction: remove })
         setRemove({})
      }
   }, [remove])

   const handleSearch = query => {
      query.length === 0
         ? dispatch({ type: 'SEARCH_CLEAR' })
         : dispatch({ type: 'SEARCH_QUERY', query: query })
   }

   const sortName = () => (dispatch({ type: 'SORT_NAME' }), setActive('name'))

   const sortCounty = () => {
      !disabled && (dispatch({ type: 'SORT_COUNTY' }), setActive('county'))
   }

   const handleFilter = query => {
      setActive('')
      query === 'All Counties'
         ? (dispatch({ type: 'FILTER_CLEAR' }), setDisabled(false))
         : (dispatch({ type: 'FILTER_COUNTY', query: query }), setDisabled(true))
   }

   if (error) return <div>Fetch Failed</div>

   if (!loaded) return <div>Loading....</div>

   return (
      <Container>
         <NavBar search={<Search query={handleSearch} />}>
            <NavItem click={sortName} active={active === 'name'}>
               Sort by Name
               <i className='fas fa-sort-alpha-down'></i>
            </NavItem>
            <NavItem click={sortCounty} disabled={disabled} active={active === 'county'}>
               Sort by County
               <i className='fas fa-sort-alpha-down'></i>
            </NavItem>
            <NavItem
               dropdown
               attributes={{
                  id: 'dropdown',
                  ['data-bs-toggle']: 'dropdown',
                  ['aria-expanded']: false,
                  role: 'button'
               }}
               filter={<Filter query={handleFilter} />}
            >
               Filter by County
               <i className='fas fa-sort-down'></i>
            </NavItem>
         </NavBar>
         <Table>
            <Add />
            {displayData.map(attraction => (
               <Card place={attraction} key={attraction.id} />
            ))}
         </Table>
      </Container>
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
