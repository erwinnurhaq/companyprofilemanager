import Axios from 'axios'
// ------------------------------------
// Constants
// ------------------------------------
export const OFFICE_FETCHED = 'OFFICE_FETCHED'
export const OFFICE_LOADING = 'OFFICE_LOADING'

// ------------------------------------
// Actions
// ------------------------------------
export const officeFetch = (companyId) => {
    return async dispatch => {
        try {
            dispatch({ type: OFFICE_LOADING })
            const res = await Axios.get('/api/offices', {
                params: { companyId }
            })
            console.log('office list: ', res.data)
            dispatch({
                type: OFFICE_FETCHED,
                payload: res.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const createOffice = (office) => {
    return async dispatch => {
        try {
            await Axios.post('/api/offices', office)
            dispatch(officeFetch(office.companyId))
        } catch (err) {
            console.log(err)
        }
    }
}

export const deleteOffice = (id, companyId) => {
    return async dispatch => {
        try {
            await Axios.delete(`/api/offices/${id}`)
            dispatch(officeFetch(companyId))
        } catch (err) {
            console.log(err)
        }
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    list: [],
    loading: false
}
export default function officeReducer(state = initialState, action) {
    switch (action.type) {
        case OFFICE_LOADING:
            return { ...state, loading: true }
        case OFFICE_FETCHED:
            return { list: action.payload, loading: false }
        default:
            return state
    }
}
