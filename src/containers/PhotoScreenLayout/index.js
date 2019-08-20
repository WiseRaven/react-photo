import React from 'react';
import { connect } from 'react-redux';
import PhotoScreenLayout from '../../layouts/PhotoScreenLayout';
import { getActivePhoto, createPreviewList, isSpecialSize } from '../../helpers/photo';
import { getActiveFilterName } from '../../helpers/filters';
import { changeActiveFilter } from '../../actions/filters';
import {
    uploadPhoto, clearPhotosList, uploadDemoPhoto, setActiveElement,
    unsetIsProcessing, setPhotoPreloaded, setInProgress, unsetInProgress,
    addPhotoToQueue, setActivePhotoIfHavenyActive, changeActiveFilteredPhoto,
    addPhotoToUploadQueue, removePhotoFromUploadQueue
} from './../../actions/photo';
import { withRouter } from 'react-router-dom';
import { showPreloader, hidePreloader, offDemoMode, onDemoMode } from '../../actions/options';

import { hideHint } from './../../actions/hints';
import Photo from './../../services/photo';
import constants from '../../const';


class PhotoScreenLayoutContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            isSpecialSize: false
        };
        this.timer = false;
        this.checkSpecialSize = this.checkSpecialSize.bind(this)
    }
    componentDidMount() {
        this.props.unsetIsProcessing();
        window.addEventListener('resize', this.checkSpecialSize);
        this.setSpecialSize();
        if (this.props.photosList.length === 0) {
            this.props.onDemoMode();
            this.props.uploadDemoPhoto();
        }
    }
    componentWillMount() {
        if (this.props.photosList.length === 0) {
            this.props.onDemoMode();
            this.props.uploadDemoPhoto();
        }
    }
    setDefaultFilterActive(photoId) {
        this.props.changeActiveFilter('model');
        this.props.changeActiveFilteredPhoto(photoId, 'model');
    }
    setPhotoActive(photoId) {
        this.props.setActiveElement(photoId);
        this.props.changeActiveFilteredPhoto(photoId, this.props.activeFilter);
    }
    componentWillUnmount() {
        clearTimeout(this.timer);
        window.removeEventListener('resize', this.checkSpecialSize);
    }
    checkSpecialSize() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.setSpecialSize();
        }, 100);
    }
    setSpecialSize() {
        if (isSpecialSize() === this.state.isSpecialSize) return false;
        this.setState({
            isSpecialSize: isSpecialSize(),
        });
    }
    dropHandler(files) {
        if (!this.props.isAuth) {
            this.props.history.push('/photo/info-login')
            return;
        }
        if (this.props.demoMode) {
            this.props.clearPhotosList();
            this.props.offDemoMode();
        }
        this.props.setInProgress();
        const promises = [];
        // cut array to fit in limits
        const allowToLoad = constants.PHOTOS_LIMIT - this.props.photosList.length;
        const overlimit = allowToLoad - files.length;
        const allowLimit = overlimit < 0 ? allowToLoad : files.length;
        //upload on server
        const fileNames = files.slice(0, allowLimit).map(file => file.path);
        this.props.addPhotoToUploadQueue(fileNames);

        files.slice(0, allowLimit).map((file) => {
            promises.push(new Promise(async (resolve, reject) => {
                try {
                    const id = await Photo.uploadPhoto(file);
                    this.props.removePhotoFromUploadQueue(file.path);
                    this.props.uploadPhoto(id);
                    this.props.addPhotoToQueue(id);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            }));
            return file;
        });
        Promise.all(promises).finally(() => this.props.unsetInProgress())
    }


    dropHandlerError() {
        this.props.history.push('/photo/info-limit')
    }

    render() {
        return <PhotoScreenLayout {...this.props}
            isSpecialSize={this.state.isSpecialSize}
            dropHandler={this.dropHandler.bind(this)}
            dropHandlerError={this.dropHandlerError.bind(this)}
            demoMode={this.props.demoMode}
            countPhotos={this.props.photosList.length}
        />
    }
}

const mapDispatchToProps = {
    setActiveElement,
    unsetIsProcessing,
    hideHint,
    clearPhotosList,
    onDemoMode,
    offDemoMode,
    uploadPhoto,
    uploadDemoPhoto,
    showPreloader,
    hidePreloader,
    setPhotoPreloaded,
    setInProgress,
    unsetInProgress,
    addPhotoToQueue,
    setActivePhotoIfHavenyActive,
    changeActiveFilter,
    changeActiveFilteredPhoto,
    addPhotoToUploadQueue,
    removePhotoFromUploadQueue
};

const mapStateToProps = (state) => ({
    photosList: state.photo.photosList,
    activePhoto: getActivePhoto(state.photo.photosList),
    previewList: createPreviewList(state.photo.photosList),
    activeFilter: getActiveFilterName(state.filters.filtersList),
    demoMode: state.options.demoMode,
    shouldShowPreloader: state.photo.photosList.some(photo => photo.preloaded !== true),
    quantityPhotosInQueue: state.photo.uploadingList.length,
    isAuth: state.options.user !== null,
    uploadInProgress: !!state.photo.uploadingQueueList.length,
    showInnerPreloader: state.options.showInnerPreloader
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PhotoScreenLayoutContainer));
