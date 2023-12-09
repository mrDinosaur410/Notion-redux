const initialState = {
    loading: false,
    user: null,
    users: [],
    error: null
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "USER/REQUEST/PENDING":
            return {
                ...state,
                loading: true,
                error: null
            }
        case "USER/REQUEST/FULFILLED":
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        case "USERS/REQUEST/FULFILLED":
            return {
                ...state,
                loading: false,
                users: action.payload
            }
        case "USER/REQUEST/REJECTED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}
