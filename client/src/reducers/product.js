import {FETCHED_DETAILED_PRODUCT} from '../actions/products'

export default function (state = null, action) {
  switch (action.type) {
    case FETCHED_DETAILED_PRODUCT:
      return action.payload

    default:
      return state
  }
}
