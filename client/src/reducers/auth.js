import { LOGIN_USER, LOGOUT_USER } from '../actions/types';

const initState = {
    cur: [],
    token: null,
    isAuthincated: false
}

const authReducer = (state = initState, action) => {
    const { type, token } = action;
    switch (type) {
        case LOGIN_USER: {
            localStorage.setItem('Token', token);
            console.log('user is authorized');
            return { ...state, token, isAuthincated: true };
        }
        case LOGOUT_USER: {
            localStorage.removeItem('Token');
            return { ...state, token: null, isAuthincated: false }
        }
        default: return state;
    }
}
export default authReducer