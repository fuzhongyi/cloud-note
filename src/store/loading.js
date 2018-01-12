const SHOWLOADING = 'SHOWLOADING';
const initialState = {
    loading: false
};

export const showLoading = loading => ({
    type: 'SHOWLOADING',
    loading
});

export default function (state = initialState, action) {
    switch (action.type) {
        case SHOWLOADING:
            return Object.assign({}, state, {loading: action.loading});
        default:
            return state;
    }
};