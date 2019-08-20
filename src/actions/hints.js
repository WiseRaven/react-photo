export const HIDE_HINT = 'HIDE_HINT';
export const SHOW_HINT = 'SHOW_HINT';

export const hideHint = () => {
    return {
        type: HIDE_HINT,
    }
}

export const showHint = (text, msgId="browse-error") => {
    return {
        type: SHOW_HINT,
        payload: {
            text,
            msgId
        }
    }
}

