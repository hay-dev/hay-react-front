import {LOG_IN, LOG_OUT} from "../actions";

const initialState = {
    token: 'test'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN:
            return Object.assign({}, state, {
                token: action.token
            });
            break;
        case LOG_OUT:
            return {
                token: ''
            };
            break;
        default:
            return state;
    }
};

export default reducer;
