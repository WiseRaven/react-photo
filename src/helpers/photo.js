import { changeActiveFilter } from './filters';
import constants from './../const';

export const changePhotoItemStatus = (photoId, list, status) => {
    return list.map((item) => {
        if (item.photoId === photoId) {
            return {
                ...item,
                status: status
            }
        }
        else {
            return {
                ...item
            }
        }
    })
};

export const setDetailInformationToPhoto = (photoId, url, preview, retouchedPhotos, photoList) => {
    return photoList.map((item) => {
        if (item.photoId === photoId) {
            return {
                ...item,
                url: url,
                preview: preview,
                retouchedPhotos: filterRetouchPhotosList(retouchedPhotos)
            }
        }
        else {
            return {
                ...item
            }
        }
    })
}

function filterRetouchPhotosList(list) {
    const filteredList = list.map(item => {
        if (item.name === 'model') {
            return {
                id: item.id,
                url: item.url,
                active: true,
                name: item.name,
                preloaded: false
            }
        }
        else {
            return {
                id: item.id,
                url: item.url,
                active: false,
                name: item.name,
                preloaded: false
            }
        }
    });
    return filteredList;
}

export const changeUploadPercent = (id, list, percent) => {
    return list.map((item) => {
        if (item.photoId === id) {
            return {
                ...item,
                percent: percent
            }
        }
        else {
            return {
                ...item
            }
        }
    })
}

export const getActivePhoto = (list) => {
    return list.find(photo => photo.isActive) || null;
}

export const changeActiveElement = (id, list) => {

    if (!id) {
        const res = [...list];
        res[0].isActive = true;
        return res;
    }
    if (!list.some(photo => photo.photoId === id)) return list;
    return list.map(item => {
        if (item.photoId === id) {
            return {
                ...item,
                isActive: true
            }
        }
        else {
            return {
                ...item,
                isActive: false
            }
        }
    })
}

export const changeActiveFilteredPhoto = (photoId, filterName, list) => {
    return list.map(item => {
        if (item.photoId === photoId) {
            return {
                ...item,
                retouchedPhotos: changeActiveFilter(filterName, item.retouchedPhotos)
            }
        }
        else {
            return { ...item };
        }

    })
}

export const createPreviewList = photoList => {
    let previewList = Array(8).fill({});
    previewList = previewList.map((item, index) => {
        if (photoList[index]) {
            return {
                photo: {
                    id: photoList[index].photoId,
                    name: '',
                    preview: photoList[index].preview,
                    isActive: photoList[index].isActive,
                }
            }
        }
        else {
            return {}
        }
    });
    return previewList;
}

export const isSpecialSize = () => {
    const mobileSize = 767;
    const desktopSize = 1024;

    return window.innerWidth > mobileSize && window.innerWidth <= desktopSize;
}


export const createShareHash = (photos) => {
    const ids = photos.map(photo => photo.photoId).join(',');
    return `#uploads=${ids}`;
}
export const parseShareHash = (hash) => {
    //#uploads=FFEFEFF8FF,DD039DDSD,KEKFI837FDFHD
    const regex = /uploads=([^&]+)/gim;
    const res = regex.exec(hash);
    if (res) {
        return res[1].split(',')
    }
    return [];
}
export const getSelectedFilteredPhotoUrl = (list) => {
    const selectedPhoto = list.find(photo => photo.isActive) || null;
    if (selectedPhoto) {
        const retouchedPhoto = selectedPhoto.retouchedPhotos.find(item => item.active) || null;
        return retouchedPhoto ? retouchedPhoto.url : null;
    }
    else {
        return null;
    }
}

export const getLastActiveFilterName = (list, photoId) => {
    const selectedPhoto = list.find(photo => photo.photoId === photoId) || null;
    if (selectedPhoto) {
        const retouchedPhoto = selectedPhoto.retouchedPhotos.find(item => item.active) || null;
        return retouchedPhoto ? retouchedPhoto.name : null;
    }
    else {
        return null;
    }
}

export const getProcessingPercent = (data) => {
    const { status, percent } = data;
    switch (status) {
        case 'in_queue':
            return Math.floor(percent / 3);
        case 'sending':
            return 33 + Math.floor(percent / 3);
        case 'modeling':
            return 66 + Math.ceil(percent / 3);
        default:
            return percent ? Math.floor(percent) : 0;
    }
}


export const photoLoader = (url) => {
    return new Promise((resolve, reject) => {
        const image = document.createElement('img');
        image.src = url;
        image.onload = () => resolve(image);
        image.onerror = () => reject('Image load failed');
    });
}

export const getImageUrl = (id, list) => {
    const img = list.find(photo => photo.photoId === id) || null;
    return img ? img.url : null;
}

export const getPhotoById = (photoId, list) => {
    return list.find(photo => photo.photoId === photoId) || null;
}

export const setPhotoPreloaded = (id, list) => {
    return list.map(item => {
        if (item.photoId === id) {
            return {
                ...item,
                preloaded: true
            }
        }
        else {
            return {
                ...item
            }
        }
    })
}

export const isAnyNotPreloadedPhoto = (list) => {
    const photo = list.find(item => !item.preloaded) || null;
    return photo ? true : false;
}

export const getNotPreloadedPhoto = (list) => {
    return list.map(item => {
        if (!item.preloaded) {
            return {
                ...item
            }
        }
        return item;
    })
}

export const deletePhotoById = (photoId, list) => {
    const newList = [];
    list.map(photo => {
        if (photo.photoId !== photoId) {
            newList.push(photo);
        }
        return photo;
    });
    return newList;
}

export const uploadDemoPhotos = () => {
    return [
        {
            photoId: '123',
            status: constants.SUCCESS,
            url: 'http://37.59.45.180:8010/images/demo.jpg',
            preview: 'http://37.59.45.180:8010/images/demo.jpg',
            percent: 100,
            isActive: true,
            preloaded: true,
            retouchedPhotos: [
                {
                    id: 16,
                    url: 'http://37.59.45.180:8010/images/demo_a.jpg',
                    active: true,
                    name: 'model',
                    preloaded: true
                },
                {
                    id: 17,
                    url: 'http://37.59.45.180:8010/images/demo_d.jpg',
                    active: false,
                    name: 'filter1',
                    preloaded: false
                },
                {
                    id: 18,
                    url: 'http://37.59.45.180:8010/images/demo_b.jpg',
                    active: false,
                    name: 'filter2',
                    preloaded: false
                },
                {
                    id: 19,
                    url: 'http://37.59.45.180:8010/images/demo_c.jpg',
                    active: false,
                    name: 'filter3',
                    preloaded: false
                },
            ]
        },
        {
            photoId: '321',
            status: constants.SUCCESS,
            url: 'https://retouch.arvilab.com/storage/app/uploads/F5G9vCh7n6onP2RdJMWbLNdLp1kKTYPUx1B6jf0H.jpg',
            preview: 'https://retouch.arvilab.com/storage/app/uploads/F5G9vCh7n6onP2RdJMWbLNdLp1kKTYPUx1B6jf0H_preview.jpg',
            percent: 100,
            isActive: false,
            preloaded: true,
            retouchedPhotos: [
                {
                    id: 15,
                    url: 'https://retouch.arvilab.com/storage/app/uploads/F5G9vCh7n6onP2RdJMWbLNdLp1kKTYPUx1B6jf0H_model.jpg',
                    active: true,
                    name: 'model',
                    preloaded: true
                },
                {
                    id: 16,
                    url: 'https://retouch.arvilab.com/storage/app/uploads/Tbs4J9rmwP59u6evqqxdI6NQdxarxgnj9vmB3YmG_filter1.jpg',
                    active: false,
                    name: 'filter1',
                    preloaded: false
                },
                {
                    id: 17,
                    url: 'https://retouch.arvilab.com/storage/app/uploads/F5G9vCh7n6onP2RdJMWbLNdLp1kKTYPUx1B6jf0H_filter2.jpg',
                    active: false,
                    name: 'filter2',
                    preloaded: false
                },
            ]
        }
    ];
}

export const setFilteredPhotoPreloaded = (photoId, filteredPhotoId, list) => {
    return list.map(photo => {
        if (photo.photoId === photoId) {
            return {
                ...photo,
                retouchedPhotos: photo.retouchedPhotos.map(filteredPhoto => {
                    if (filteredPhoto.id === filteredPhotoId) {
                        return {
                            ...filteredPhoto,
                            preloaded: true
                        }
                    }
                    else {
                        return {
                            ...filteredPhoto
                        }
                    }
                })
            }
        }
        else {
            return {
                ...photo
            }
        }
    });
}

export const getFilteredPhotoByFilterName = (filterName, list) => {
    return list.find(photo => photo.name === filterName) || null;
}


export function getFileExtension(path) {
    const regex = /.(jpe?g|png)/gmi;
    const res = regex.exec(path);
    if(res) {
        return res.pop();
    }
    return null;
}
