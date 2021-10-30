import { createContext, useEffect, useState } from 'react'

export const DataCtx = createContext()

export const DataProvider = (props) => {
   const [edit, setEdit] = useState({})
   const [remove, setRemove] = useState({})
   const [add, setAdd] = useState({})

   return (
      <DataCtx.Provider
         value={{
            e: [edit, setEdit],
            r: [remove, setRemove],
            a: [add, setAdd]
         }}
      >
         {props.children}
      </DataCtx.Provider>
   )
}
