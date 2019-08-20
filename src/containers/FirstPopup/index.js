import React from 'react';
import { connect } from 'react-redux';
import FirstPopup from '../../components/FirstPopup';
import Photo from './../../services/photo';
import {
    uploadPhoto, clearPhotosList, setInProgress, unsetInProgress,
    uploadDemoPhoto, setIsProcessing, unsetIsProcessing, addPhotoToQueue,
    addPhotoToUploadQueue, removePhotoFromUploadQueue
} from './../../actions/photo';
import { offDemoMode, onDemoMode } from './../../actions/options';
import constants from '../../const';
import { showHint, hideHint } from './../../actions/hints';

class FirstPopupContainer extends React.Component {
    constructor() {
        super();
        this.fileWasUploaded = this.fileWasUploaded.bind(this);
    }
    componentDidMount() {
        this.props.showHint('We recommend RAW, PNG, TIFF, JPG at least 1200x800 pixels');
    }
    async fileWasUploaded(file) {
        if (this.props.demoMode) {
            this.props.clearPhotosList();
            this.props.offDemoMode();
        }
        this.props.setInProgress();
        this.props.addPhotoToUploadQueue(file.path);
        const id = await Photo.uploadPhoto(file);
        this.props.removePhotoFromUploadQueue(file.path);
        this.props.uploadPhoto(id);
        this.props.addPhotoToQueue(id);
        this.props.unsetInProgress();
    }

    render() {
        return <FirstPopup
            fileWasUploaded={this.fileWasUploaded}
            uploadDemoPhoto={this.props.uploadDemoPhoto}
            limitReached={constants.PHOTOS_LIMIT - this.props.photosList.length}
            hideHint={this.props.hideHint}
            isProcessing={this.props.isProcessing}
            setIsProcessing={this.props.setIsProcessing.bind(this)}
            unsetIsProcessing={this.props.unsetIsProcessing.bind(this)}
            isAuth={this.props.isAuth}
            onDemoMode={this.props.onDemoMode}
        />;
    }
}

const mapDispatchToProps = {
    uploadPhoto,
    clearPhotosList,
    offDemoMode,
    setInProgress,
    unsetInProgress,
    uploadDemoPhoto,
    showHint,
    hideHint,
    setIsProcessing,
    unsetIsProcessing,
    onDemoMode,
    addPhotoToQueue,
    addPhotoToUploadQueue,
    removePhotoFromUploadQueue
};

const mapStateToProps = (state) => ({
    demoMode: state.options.demoMode,
    photosList: state.photo.photosList,
    isProcessing: state.photo.isProcessing,
    isAuth: state.options.user !== null,
});

export default connect(mapStateToProps, mapDispatchToProps)(FirstPopupContainer);
