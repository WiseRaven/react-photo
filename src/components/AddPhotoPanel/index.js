import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from '../ProgressBar';
import BackgroundPhoto from '../BackgroundPhoto';

export default class AddPhotoPanel extends React.Component {
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
        const photos = this.getPhotoToProccess();
        const { imageMaxCount } = this.props;
        const photoRest = imageMaxCount - photos.length;
        const processPercent = this.calculatePercent();
        return (

            <React.Fragment>
                <BackgroundPhoto {...this.props} isCoverBackground={true}/>
                <div className="panel panel-bottom gradient-bg progress-panel rounded-sm">
                    <div className="row inherit align-items-end justify-content-center">
                        <div className="col-12">
                            {this.props.uploadInProgress ?
                                <React.Fragment>
                                    <h3 className="mb-4">Imp<span className="icon fav3d-icon sup-left">o</span>rt Photos</h3>
                                    <p className="note">Uploading...</p>
                                    <ProgressBar valueNow={0} />
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <h3 className="mb-4">Pr<span className="icon fav3d-icon sup-left">o</span>cessing Photos</h3>
                                    <p className="note">{photoRest} of {imageMaxCount}</p>
                                    <ProgressBar valueNow={processPercent ? processPercent : 0} />
                                </React.Fragment>
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

AddPhotoPanel.propTypes = {
    imageCount: PropTypes.number,
    imageMaxCount: PropTypes.number,
    actionAddPhoto: PropTypes.func,
};

AddPhotoPanel.defaultProps = {
    imageCount: 0,
    imageMaxCount: 5,
    actionAddPhoto: () => console.log(`AddPhoto`),
};
