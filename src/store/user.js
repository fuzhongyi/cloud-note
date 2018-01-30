const SETUSER = 'SETUSER';
const initialState = {
    user: null
};

export const setUser = user => ({
    type: 'SETUSER',
    user
});

export default function (state = initialState, action) {
    switch (action.type) {
        case SETUSER:
            return Object.assign({}, state, {user: action.user});
        default:
            return state;
    }
};