import { createContext, useEffect, useState } from 'react'

export const DataCtx = createContext()

export const DataProvider = (props) => {
   const [edit, setEdit] = useState({})
   const [remove, setRemove] = useState({})
   const [add, setAdd] = useState({})

   return (
      <DataCtx.Provider
         value={{
            _edit: [edit, setEdit],
            _remove: [remove, setRemove],
            _add: [add, setAdd]
         }}
      >
         {props.children}
      </DataCtx.Provider>
   )
}
