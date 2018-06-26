import {FETCHED_ALL_PRODUCTS} from '../actions/products'
import {ADD_PRODUCT} from '../actions/products'
import {REMOVE_PRODUCT} from '../actions/products'
import {UPDATE_PRODUCT} from '../actions/products'


export default function(state = [], action) {
  switch (action.type) {
    case FETCHED_ALL_PRODUCTS:
      return action.payload
    case ADD_PRODUCT:
      return [
        ...state,
        action.payload
      ]
    case REMOVE_PRODUCT:
      return state.filter(product => {
        return product.id !== action.payload.id
      })
      case UPDATE_PRODUCT:
          return state.map(product => {
            if (product.id===action.payload.id) {return action.payload}
            else return product
          })
      default:
      return state
  }
}
