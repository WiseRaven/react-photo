import {
    OFF_DEMO_MODE,
    ON_DEMO_MODE,
    SET_USER,
    SHOW_PRELOADER,
    HIDE_PRELOADER,
    SHOW_INNER_PRELOADER,
    HIDE_INNER_PRELOADER
} from './../actions/options';

const initialState = {
    demoMode: true,
    user: null,
    preloader: false,
    showInnerPreloader: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case '@@redux/INIT':
            return state;
        case OFF_DEMO_MODE:
            return {
                ...state,
                demoMode: false
            }
        case ON_DEMO_MODE:
            return {
                ...state,
                demoMode: true
            }
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }
        case SHOW_PRELOADER:
            return {
                ...state,
                preloader: true
            }
        case HIDE_PRELOADER:
            return {
                ...state,
                preloader: false
            }
        case SHOW_INNER_PRELOADER:
            return {
                ...state,
                showInnerPreloader: true
            }
        case HIDE_INNER_PRELOADER:
            return {
                ...state,
                showInnerPreloader: false
            }
        default:
            return state;
    }
}
