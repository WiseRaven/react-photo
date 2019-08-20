export const CHANGE_ACTIVE_FILTER = 'CHANGE_ACTIVE_FILTER';

export const changeActiveFilter = (id) => {
    return {
        type: CHANGE_ACTIVE_FILTER,
        payload: id
    }
}
