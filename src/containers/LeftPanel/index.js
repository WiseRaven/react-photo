import React from 'react';
import { connect } from 'react-redux';
import LeftPanel from '../../components/LeftPanel';
import { changeActiveFilter } from '../../actions/filters';
import { uploadPhoto, addPhotoToQueue, setActiveElement, setPhotoPreloaded, clearPhotosList, setInProgress, unsetInProgress, uploadDemoPhoto, addPhotoToUploadQueue, removePhotoFromUploadQueue } from '../../actions/photo';
import { showPreloader, hidePreloader, offDemoMode, onDemoMode } from '../../actions/options';
import { getActivePhoto, createPreviewList, getLastActiveFilterName, getPhotoById } from '../../helpers/photo';
import { getActiveFilterName } from '../../helpers/filters';
import constants from '../../const';
import { withRouter } from 'react-router-dom';
import Photo from './../../services/photo';

class LeftPanelContainer extends React.Component {
    setPhotoActive(photoId) {
        const photo = getPhotoById(photoId, this.props.photosList);
        if (photo.preloaded) {
            this.props.setActiveElement(photoId);
            const lastFilterName = getLastActiveFilterName(this.props.photosList, photoId);
            if (lastFilterName) {
                this.props.changeActiveFilter(lastFilterName);
            }
        }
        else {
            this.props.setActiveElement(photoId);
            this.props.setPhotoPreloaded(photoId);
            const lastFilterName = getLastActiveFilterName(this.props.photosList, photoId);
            if (lastFilterName) {
                this.props.changeActiveFilter(lastFilterName);
            }

        }
    }
    uploadFilesError() {
        this.props.history.push('/photo/info-limit')
    }
    uploadFiles(files) {
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
        Promise.all(promises).finally(() => this.props.unsetInProgress());
    }

    render() {
        return <LeftPanel
            imageArray={this.props.previewList}
            setPhotoActive={this.setPhotoActive.bind(this)}
            activeFilter={this.props.activeFilter}
            uploadFiles={this.uploadFiles.bind(this)}
            uploadFilesError={this.uploadFilesError.bind(this)}
        />
    }
}

const mapDispatchToProps = {
    setActiveElement,
    changeActiveFilter,
    showPreloader,
    hidePreloader,
    setPhotoPreloaded,
    clearPhotosList,
    offDemoMode,
    onDemoMode,
    setInProgress,
    unsetInProgress,
    uploadPhoto,
    addPhotoToQueue,
    uploadDemoPhoto,
    addPhotoToUploadQueue,
    removePhotoFromUploadQueue
};

const mapStateToProps = (state) => ({
    filtersList: state.filters.filtersList,
    activePhoto: getActivePhoto(state.photo.photosList),
    previewList: createPreviewList(state.photo.photosList),
    activeFilter: getActiveFilterName(state.filters.filtersList),
    photosList: state.photo.photosList,
    isAuth: state.options.user !== null,
    demoMode: state.options.demoMode,
    limitReached: constants.PHOTOS_LIMIT - state.photo.photosList.length
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LeftPanelContainer));
