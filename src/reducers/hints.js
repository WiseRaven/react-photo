import {
    HIDE_HINT,
    SHOW_HINT,
} from './../actions/hints';
const initialState = {
    hint: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case '@@redux/INIT':
            return state;
        case HIDE_HINT:
            return {
                hint: null
            }
        case SHOW_HINT:
            return {
                hint: {
                    text:action.payload.text,
                    msgId:action.payload.msgId,
                }
            }
        default:
            return state;
    }
}
