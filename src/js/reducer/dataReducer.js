import { randomId } from '../utils/randomId'

export const initialState = {
   data: [],
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
            displayData: [...state.data.filter(e => e.name.toLowerCase().match(new RegExp(action.query.toLowerCase())))]
         }
      }

      case 'SEARCH_CLEAR': {
         return {
            ...state,
            displayData: [...state.data]
         }
      }

      case 'ADD': {
         return {
            ...state,
            data: [...state.data, action.attraction],
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

      default:
         break
   }
   return state
}
