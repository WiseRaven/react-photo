import React from 'react';
import { connect } from 'react-redux';
import Photo from '../../services/photo';
import { setActiveElement, changeStatus, setPhotoDetail, changeUploadPercent, uploadPhoto, setIsProcessing, setActivePhotoIfHavenyActive, removeAllPhotosFromQueue, deletePhotoById, setPhotoPreloaded, setFilteredPhotoPreloaded } from '../../actions/photo';
import { parseShareHash, getProcessingPercent, photoLoader } from '../../helpers/photo.js';
import { showHint, hideHint } from './../../actions/hints';
import constant from '../../const';


class FirstPopupContainer extends React.Component {
    constructor() {
        super();
        this.timeout = 2000;
        this.timer = null;
        this.lastQueueLength = 0;
    }

    componentDidMount() {
        this.getInitionalStates();
        this.checkStatus();
    }

    componentWillUnmount() {
        this.props.hideHint();
    }

    getInitionalStates() {
        const initHashes = parseShareHash(window.location.hash);
        if (initHashes.length) {
            initHashes.map(id => {
                this.props.uploadPhoto(id);
                return id;
            });
            this.props.setIsProcessing();
        }
    }

    checkStatus() {
        const statusesList = [];
        this.props.photosList.map(image => {
            if (image.status === 'upload') {
                const statusPromise = new Promise((resolve, reject) => {
                    Photo.getStatus(image.photoId).then(res => {
                        if (res.state.state === 'finished') {
                            if (res.state.status === 'success') {
                                this.props.changeStatus(image.photoId, constant.SUCCESS);
                                Photo.getResult(image.photoId).then(res => {
                                    this.props.setPhotoDetail(image.photoId, res.photo.url, res.photo.preview, res.photo.models);
                                    this.props.changeUploadPercent(image.photoId, 100);
                                    this.props.setActivePhotoIfHavenyActive();
                                    photoLoader(res.photo.preview).then(() => {
                                        photoLoader(res.photo.models[0].url).then(() => {
                                            this.props.setPhotoPreloaded(image.photoId);
                                            this.props.setFilteredPhotoPreloaded(image.photoId, res.photo.models[0].id);
                                        });
                                    });
                                })
                            }
                            else {
                                this.props.changeStatus(image.photoId, constant.FAIL);
                                this.props.deletePhotoById(image.photoId);
                                this.props.showHint('Photo browsing failed');
                            }
                        } else {
                            this.props.changeUploadPercent(image.photoId, getProcessingPercent(res.state));
                        }
                        resolve(image.photoId);
                    }).catch(e => reject(e));
                });
                statusesList.push(statusPromise);
            }
            return image;
        });
        if (statusesList.length === 0) {
            setTimeout(() => this.checkStatus(), this.timeout);
            if (this.lastQueueLength !== statusesList.length) {
                this.props.setActiveElement(this.props.uploadingList[0]);
                this.props.removeAllPhotosFromQueue();
            }
        } else {
            Promise.all(statusesList).then(() => {
                setTimeout(() => this.checkStatus(), this.timeout);
            });
        }
        this.lastQueueLength = statusesList.length;
        return;
    }

    render() {
        return this.props.children;
    }
}

const mapDispatchToProps = {
    changeStatus,
    setPhotoDetail,
    changeUploadPercent,
    uploadPhoto,
    setIsProcessing,
    showHint,
    hideHint,
    setActivePhotoIfHavenyActive,
    removeAllPhotosFromQueue,
    setActiveElement,
    deletePhotoById,
    setPhotoPreloaded,
    setFilteredPhotoPreloaded
};

const mapStateToProps = (state) => ({
    photosList: state.photo.photosList,
    hint: state.hints.hint,
    uploadingList: state.photo.uploadingList,
});

export default connect(mapStateToProps, mapDispatchToProps)(FirstPopupContainer);
