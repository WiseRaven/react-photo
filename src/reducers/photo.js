import {
    UPLOAD_PHOTO,
    UPLOAD_DEMO_PHOTO,
    CHANGE_STATUS,
    SET_PHOTO_DETAIL,
    CHANGE_UPLOAD_PERCENT,
    SET_ACTIVE_ELEMENT,
    SET_DEFAULT_ACTIVE_ELEMENT,
    CHANGE_ACTIVE_FILTERED_PHOTO,
    CLEAR_PHOTOS_LIST,
    SET_UPLOAD_IN_PROGRESS,
    SET_IS_PROCESSING,
    SET_PHOTO_PRELOADED,
    ADD_PHOTO_TO_QUEUE,
    REMOVE_PHOTO_FROM_QUEUE,
    REMOVE_ALL_PHOTOS_FROM_QUEUE,
    ADD_PHOTO_TO_UPLOAD_QUEUE,
    REMOVE_PHOTO_FROM_UPLOAD_QUEUE,
    REMOVE_ALL_PHOTOS_FROM_UPLOAD_QUEUE,
    DELETE_PHOTO_BY_ID,
    SET_FILTERED_PHOTO_PRELOADED,
} from './../actions/photo';

import { changePhotoItemStatus, setDetailInformationToPhoto, changeUploadPercent, changeActiveElement, changeActiveFilteredPhoto, setPhotoPreloaded, deletePhotoById, uploadDemoPhotos, setFilteredPhotoPreloaded } from './../helpers/photo';

const initialState = {
    isProcessing: false,
    uploadInProgress: false,
    uploadingList: [],
    photosList: [],
    uploadingQueueList: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case '@@redux/INIT':
            return state;
        case UPLOAD_PHOTO:
            return {
                ...state,
                photosList: [...state.photosList, action.payload]
            }
        case UPLOAD_DEMO_PHOTO:
            return {
                ...state,
                photosList: uploadDemoPhotos()
            }
        case CHANGE_STATUS:
            return {
                ...state,
                photosList: changePhotoItemStatus(action.payload.photoId, [...state.photosList], action.payload.newStatus)
            }
        case SET_PHOTO_DETAIL:
            return {
                ...state,
                photosList: setDetailInformationToPhoto(action.payload.photoId, action.payload.url, action.payload.preview, action.payload.retouchedPhotos, [...state.photosList])
            }
        case CHANGE_UPLOAD_PERCENT:
            return {
                ...state,
                photosList: changeUploadPercent(action.payload.id, [...state.photosList], action.payload.percent)
            }
        case SET_DEFAULT_ACTIVE_ELEMENT:
        case SET_ACTIVE_ELEMENT:
            return {
                ...state,
                photosList: changeActiveElement(action.payload, [...state.photosList])
            }
        case CHANGE_ACTIVE_FILTERED_PHOTO:
            return {
                ...state,
                photosList: changeActiveFilteredPhoto(action.payload.photoId, action.payload.filterName, [...state.photosList])
            }
        case CLEAR_PHOTOS_LIST: {
            return {
                ...state,
                photosList: []
            }
        }
        case SET_UPLOAD_IN_PROGRESS: {
            return {
                ...state,
                uploadInProgress: action.payload
            }
        }
        case SET_IS_PROCESSING: {
            return {
                ...state,
                isProcessing: action.payload
            }
        }
        case SET_PHOTO_PRELOADED:
            return {
                ...state,
                photosList: setPhotoPreloaded(action.payload, [...state.photosList])
            }
        case ADD_PHOTO_TO_QUEUE:

            const newList = [...state.uploadingList];
            newList.push(action.payload);
            return {
                ...state,
                uploadingList: newList
            }
        case REMOVE_PHOTO_FROM_QUEUE:
            return {
                ...state,
                uploadingList: state.uploadingList.filter(el => el !== action.payload)
            }
        case REMOVE_ALL_PHOTOS_FROM_QUEUE:
            return {
                ...state,
                uploadingList: []
            }
        case ADD_PHOTO_TO_UPLOAD_QUEUE:
            let uploadList = [...state.uploadingList];
            if (Array.isArray(action.payload)) {
                uploadList = state.uploadingList.concat(action.payload);
            } else {
                uploadList.push(action.payload);
            }
            return {
                ...state,
                uploadingQueueList: uploadList
            }
        case REMOVE_PHOTO_FROM_UPLOAD_QUEUE:
            return {
                ...state,
                uploadingQueueList: state.uploadingQueueList.filter(el => el !== action.payload)
            }
        case REMOVE_ALL_PHOTOS_FROM_UPLOAD_QUEUE:
            return {
                ...state,
                uploadingQueueList: []
            }
        case DELETE_PHOTO_BY_ID:
            const result = deletePhotoById(action.payload, [...state.photosList]);
            return {
                ...state,
                photosList: result.length ? result : uploadDemoPhotos()
            }
        case SET_FILTERED_PHOTO_PRELOADED:
            return {
                ...state,
                photosList: setFilteredPhotoPreloaded(action.payload.photoId, action.payload.filteredPhotoId, [...state.photosList])
            }
        default:
            return state;
    }
}
