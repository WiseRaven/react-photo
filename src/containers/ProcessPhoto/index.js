import React from 'react';
import { connect } from 'react-redux';
import ProcessPhoto from '../../components/ProcessPhoto';
import { Redirect } from 'react-router-dom';
import { hideHint } from './../../actions/hints';

class ProcessPhotoContainer extends React.Component {
    getPhotoToProccess() {
        return this.props.photosList.filter(photo => photo.percent < 100);
    }
    calculatePercent() {
        const photos = this.getPhotoToProccess();
        const totalPercent = photos.reduce((min, item) => {
            if (min > item.percent) min = item.percent;
            return min;
        }, Number.MAX_SAFE_INTEGER);
        return totalPercent === Number.MAX_SAFE_INTEGER ? 0 : totalPercent;
    }


    render() {
        const count = this.getPhotoToProccess().length;
        const processPercent = this.calculatePercent();
        if (count === 0 && !this.props.uploadInProgress) {
            this.props.hideHint();
            return <Redirect to='/photo' />
        }
        else {
            return <ProcessPhoto uploadInProgress={this.props.uploadInProgress} processPercent={processPercent ? processPercent : 0} />;
        }
    }
}

const mapDispatchToProps = {
    hideHint
};

const mapStateToProps = (state) => ({
    photosList: state.photo.photosList,
    uploadInProgress: !!state.photo.uploadingQueueList.length || state.photo.uploadInProgress,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProcessPhotoContainer);
