export const OFF_DEMO_MODE = 'OFF_DEMO_MODE';
export const ON_DEMO_MODE = 'ON_DEMO_MODE';
export const SET_USER = 'SET_USER';
export const SHOW_PRELOADER = 'SHOW_PRELOADER';
export const HIDE_PRELOADER = 'HIDE_PRELOADER';
export const SHOW_INNER_PRELOADER = 'SHOW_INNER_PRELOADER';
export const HIDE_INNER_PRELOADER = 'HIDE_INNER_PRELOADER';

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
}

export const offDemoMode = () => {
    return {
        type: OFF_DEMO_MODE,
    }
}

export const onDemoMode = () => {
    return {
        type: ON_DEMO_MODE,
    }
}

export const showPreloader = () => {
    return {
        type: SHOW_PRELOADER,
    }
}

export const hidePreloader = () => {
    return {
        type: HIDE_PRELOADER,
    }
}

export const showInnerPreloader = () => {
    return {
        type: SHOW_INNER_PRELOADER,
    }
}

export const hideInnerPreloader = () => {
    return {
        type: HIDE_INNER_PRELOADER,
    }
}