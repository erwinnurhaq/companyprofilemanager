import { combineReducers } from 'redux'
import locationReducer from './location'
import phoneCodeReducer from './phoneCode'
import companyReducer from './company'
import officeReducer from './office'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    phoneCode: phoneCodeReducer,
    companies: companyReducer,
    offices: officeReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
