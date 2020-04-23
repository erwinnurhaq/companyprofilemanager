import Axios from 'axios'
// ------------------------------------
// Constants
// ------------------------------------
export const PHONE_CODE_FETCHED = 'PHONE_CODE_FETCHED'

// ------------------------------------
// Actions
// ------------------------------------
export const phoneCodeFetch = () => {
    return async dispatch => {
        try {
            const res = await Axios.get('https://restcountries.eu/rest/v2/all?fields=name;callingCodes')
            const data = res.data.map(i => {
                return { callingCodes: i.callingCodes[0].replace(' ', ''), name: i.name }
            })
            console.log('phone code list: ', data)
            dispatch({
                type: PHONE_CODE_FETCHED,
                payload: data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []
export default function phoneCodeReducer(state = initialState, action) {
    return action.type === PHONE_CODE_FETCHED
        ? action.payload
        : state
}
