import React from 'react';
import PropTypes from 'prop-types';

export default class ProcessPhoto extends React.Component {
    render() {
        const { processPercent } = this.props;

        return (
            <React.Fragment>
                <span className="icon icon-4xl icon-xl-6xl fav3d-icon spin"></span>
                    <h3 className="my-4 mx-xl-4">Processing Gems</h3>
                    <div className="spacer-xl">
                    {this.props.uploadInProgress ?
                        <p className="note mb-0"><span>Uploading...</span> <span className="suffix">refining faces</span></p>
                        :
                        <p className="note mb-0"><span>{processPercent}%</span> <span className="suffix">refining faces</span></p>
                    }

                    </div>
            </React.Fragment>
        )
    }
}

ProcessPhoto.propTypes = {
    processPercent: PropTypes.number,
};

ProcessPhoto.defaultProps = {
    processPercent: 0,
};
