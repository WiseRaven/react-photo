import constants from './../const';

export const UPLOAD_PHOTO = 'UPLOAD_PHOTO';
export const UPLOAD_DEMO_PHOTO = 'UPLOAD_DEMO_PHOTO';
export const CHANGE_STATUS = 'CHANGE_STATUS';
export const SET_PHOTO_DETAIL = 'SET_PHOTO_DETAIL';
export const CHANGE_UPLOAD_PERCENT = 'CHANGE_UPLOAD_PERCENT';
export const SET_ACTIVE_ELEMENT = 'SET_ACTIVE_ELEMENT';
export const SET_DEFAULT_ACTIVE_ELEMENT = 'SET_DEFAULT_ACTIVE_ELEMENT';
export const CHANGE_ACTIVE_FILTERED_PHOTO = 'CHANGE_ACTIVE_FILTERED_PHOTO';
export const CLEAR_PHOTOS_LIST = 'CLEAR_PHOTOS_LIST';
export const SET_UPLOAD_IN_PROGRESS = 'SET_UPLOAD_IN_PROGRESS';
export const SET_IS_PROCESSING = 'SET_IS_PROCESSING';
export const SET_PHOTO_PRELOADED = 'SET_PHOTO_PRELOADED';
export const ADD_PHOTO_TO_QUEUE = 'ADD_PHOTO_TO_QUEUE';
export const REMOVE_PHOTO_FROM_QUEUE = 'REMOVE_PHOTO_FROM_QUEUE';
export const REMOVE_ALL_PHOTOS_FROM_QUEUE = 'REMOVE_ALL_PHOTOS_FROM_QUEUE';
export const ADD_PHOTO_TO_UPLOAD_QUEUE = 'ADD_PHOTO_TO_UPLOAD_QUEUE';
export const REMOVE_PHOTO_FROM_UPLOAD_QUEUE = 'REMOVE_PHOTO_FROM_UPLOAD_QUEUE';
export const REMOVE_ALL_PHOTOS_FROM_UPLOAD_QUEUE = 'REMOVE_ALL_PHOTOS_FROM_UPLOAD_QUEUE';
export const DELETE_PHOTO_BY_ID = 'DELETE_PHOTO_BY_ID';
export const SET_FILTERED_PHOTO_PRELOADED = 'SET_FILTERED_PHOTO_PRELOADED';

export const uploadPhoto = (id) => {
    const photoItem = {
        photoId: id,
        status: constants.UPLOAD,
        url: null,
        preview: null,
        percent: 0,
        isActive: false,
        preloaded: false
    };
    return {
        type: UPLOAD_PHOTO,
        payload: photoItem
    }
};

export const uploadDemoPhoto = () => {
    return {
        type: UPLOAD_DEMO_PHOTO
    }
}

export const changeStatus = (photoId, newStatus) => {
    return {
        type: CHANGE_STATUS,
        payload: {
            photoId,
            newStatus
        }
    }
}

export const setPhotoDetail = (photoId, url, preview, retouchedPhotos) => {
    return {
        type: SET_PHOTO_DETAIL,
        payload: {
            photoId,
            url,
            preview,
            retouchedPhotos
        }
    }
}

export const changeUploadPercent = (id, percent) => {
    return {
        type: CHANGE_UPLOAD_PERCENT,
        payload: {
            id,
            percent
        }
    }
}

export const setActiveElement = (id) => {
    return {
        type: SET_ACTIVE_ELEMENT,
        payload: id
    }
}

export const setActivePhotoIfHavenyActive = () => {
    return {
        type: SET_DEFAULT_ACTIVE_ELEMENT,
        payload: null
    }
}

export const setInProgress = () => {
    return {
        type: SET_UPLOAD_IN_PROGRESS,
        payload: true
    }
}
export const unsetInProgress = () => {
    return {
        type: SET_UPLOAD_IN_PROGRESS,
        payload: false
    }
}
export const setIsProcessing = () => {
    return {
        type: SET_IS_PROCESSING,
        payload: true
    }
}
export const unsetIsProcessing = () => {
    return {
        type: SET_IS_PROCESSING,
        payload: false
    }
}




export const changeActiveFilteredPhoto = (photoId, filterName) => {
    return {
        type: CHANGE_ACTIVE_FILTERED_PHOTO,
        payload: {
            photoId,
            filterName
        }
    }
}

export const clearPhotosList = () => {
    return {
        type: CLEAR_PHOTOS_LIST
    }
}

export const setPhotoPreloaded = (photoId) => {
    return {
        type: SET_PHOTO_PRELOADED,
        payload: photoId
    }
}

export const addPhotoToQueue = (id) => {
    return {
        type: ADD_PHOTO_TO_QUEUE,
        payload: id
    }
}
export const removePhotoFromQueue = (id) => {
    return {
        type: REMOVE_PHOTO_FROM_QUEUE,
        payload: id
    }
}
export const removeAllPhotosFromQueue = () => {
    return {
        type: REMOVE_ALL_PHOTOS_FROM_QUEUE,
        payload: null
    }
}

export const addPhotoToUploadQueue = (id) => {
    return {
        type: ADD_PHOTO_TO_UPLOAD_QUEUE,
        payload: id
    }
}
export const removePhotoFromUploadQueue = (id) => {
    return {
        type: REMOVE_PHOTO_FROM_UPLOAD_QUEUE,
        payload: id
    }
}
export const removeAllPhotosFromUploadQueue = () => {
    return {
        type: REMOVE_ALL_PHOTOS_FROM_UPLOAD_QUEUE,
        payload: null
    }
}

export const deletePhotoById = (id) => {
    return {
        type: DELETE_PHOTO_BY_ID,
        payload: id
    }
}

export const setFilteredPhotoPreloaded = (photoId, filteredPhotoId) => {
    return {
        type: SET_FILTERED_PHOTO_PRELOADED,
        payload: {
            photoId,
            filteredPhotoId
        }
    }
}
