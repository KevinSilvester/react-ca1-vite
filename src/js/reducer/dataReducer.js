export const initialState = {
   data: [],
   filterData: [],
   displayData: [],
   error: null,
   loaded: false
}

export const dataReducer = (state, action) => {
   switch (action.type) {
      case 'FETCH_SUCCESS': {
         return {
            ...state,
            data: [...action.data],
            filterData: [...action.data],
            displayData: [...action.data],
            loaded: true
         }
      }

      case 'FETCH_FAIL': {
         return {
            ...state,
            loaded: true,
            error: action.error
         }
      }

      case 'SEARCH_QUERY': {
         return {
            ...state,
            displayData: [...state.filterData.filter(e => e.name.toLowerCase().match(new RegExp(action.query.toLowerCase())))]
         }
      }

      case 'SEARCH_CLEAR': {
         return {
            ...state,
            displayData: [...state.filterData]
         }
      }
      
      case 'SORT_NAME': {
         return {
            ...state,
            displayData: [...state.filterData.sort((a, b) => (a.name < b.name ? -1 : 1))]
         }
      }

      case 'SORT_COUNTY': {
         return {
            ...state,
            displayData: [...state.filterData.sort((a, b) => (a.address.county < b.address.county ? -1 : 1))]
         }
      }

      case 'FILTER_COUNTY': {
         return {
            ...state,
            filterData: [...state.data.filter(e => e.address.county.toLowerCase().match(new RegExp(action.query.toLowerCase())))],
            displayData: [...state.data.filter(e => e.address.county.toLowerCase().match(new RegExp(action.query.toLowerCase())))]
         }
      }

      case 'FILTER_CLEAR': {
         return {
            ...state,
            filterData: [...state.data],
            displayData: [...state.data]
         }
      }

      case 'ADD': {
         return {
            ...state,
            data: [...state.data, action.attraction],
            filterData: [...state.filterData, action.attraction],
            displayData: [...state.data, action.attraction]
         }
      }

      // https://stackoverflow.com/questions/45673783/replace-array-entry-with-spread-syntax-in-one-line-of-code
      case 'EDIT': {
         return {
            ...state,
            data: [
               ...state.data.slice(
                  0,
                  state.data.findIndex(e => e.id === action.attraction.id)
               ),
               action.attraction,
               ...state.data.slice(
                  state.data.findIndex(e => e.id === action.attraction.id) + 1
               )
            ],
            filterData: [
               ...state.filterData.slice(
                  0,
                  state.filterData.findIndex(e => e.id === action.attraction.id)
               ),
               action.attraction,
               ...state.filterData.slice(
                  state.filterData.findIndex(e => e.id === action.attraction.id) + 1
               )
            ],
            displayData: [
               ...state.displayData.slice(
                  0,
                  state.displayData.findIndex(e => e.id === action.attraction.id)
               ),
               action.attraction,
               ...state.displayData.slice(
                  state.displayData.findIndex(e => e.id === action.attraction.id) + 1
               )
            ]
         }
      }

      case 'REMOVE': {
         return {
            ...state,
            data: [
               ...state.data.slice(
                  0,
                  state.data.findIndex(e => e.id === action.attraction.id)
               ),
               ...state.data.slice(
                  state.data.findIndex(e => e.id === action.attraction.id) + 1
               )
            ],
            filterData: [
               ...state.filterData.slice(
                  0,
                  state.filterData.findIndex(e => e.id === action.attraction.id)
               ),
               ...state.filterData.slice(
                  state.filterData.findIndex(e => e.id === action.attraction.id) + 1
               )
            ],
            displayData: [
               ...state.displayData.slice(
                  0,
                  state.displayData.findIndex(e => e.id === action.attraction.id)
               ),
               ...state.displayData.slice(
                  state.displayData.findIndex(e => e.id === action.attraction.id) + 1
               )
            ]
         }
      }

      default:
         break
   }
   return state
}
