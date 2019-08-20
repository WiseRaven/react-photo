import React from 'react';
import PropTypes from 'prop-types';
import BrowseForm from '../BrowseForm';
import ProcessPhotoContainer from '../../containers/ProcessPhoto/';

export default class FirstPopup extends React.Component {
    setIsProcessing() {
        setTimeout(() => {
            this.props.setIsProcessing();
        }, 100);
    }
    render() {
        return (
            <div className="block browse-block rounded-sm spacer">
                <div className="block-body">
                    <div className="block-header spacer">
                        <span className="icon icon-s brand-icon">gemia</span>
                    </div>
                    <div className="view view-level-3 active">
                        {
                            this.props.isProcessing ?
                                <ProcessPhotoContainer />
                                :
                                <BrowseForm
                                    actionAddPhoto={this.props.fileWasUploaded}
                                    setIsProcessing={this.setIsProcessing.bind(this)}
                                    uploadDemoPhoto={this.props.uploadDemoPhoto}
                                    limitReached={this.props.limitReached}
                                    hideHint={this.props.hideHint}
                                    isAuth={this.props.isAuth}
                                    onDemoMode={this.props.onDemoMode}
                                />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

FirstPopup.propTypes = {
    isProcessing: PropTypes.bool,
};

FirstPopup.defaultProps = {
    isProcessing: null,
};
