import Axios from 'axios'
// ------------------------------------
// Constants
// ------------------------------------
export const COMPANY_FETCHED = 'COMPANY_FETCHED'
export const COMPANY_LOADING = 'COMPANY_LOADING'

// ------------------------------------
// Actions
// ------------------------------------
export const companyFetch = () => {
    return async dispatch => {
        try {
            dispatch({ type: COMPANY_LOADING })
            const res = await Axios.get('/api/companies')
            console.log('company list: ', res.data)
            dispatch({
                type: COMPANY_FETCHED,
                payload: res.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const createCompany = (company) => {
    return async dispatch => {
        try {
            await Axios.post('/api/companies', company)
            dispatch(companyFetch())
        } catch (err) {
            console.log(err)
        }
    }
}

export const deleteCompany = (id) => {
    return async dispatch => {
        try {
            await Axios.delete(`/api/companies/${id}`)
            dispatch(companyFetch())
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
export default function companyReducer(state = initialState, action) {
    switch (action.type) {
        case COMPANY_LOADING:
            return { ...state, loading: true }
        case COMPANY_FETCHED:
            return { list: action.payload, loading: false }
        default:
            return state
    }
}
