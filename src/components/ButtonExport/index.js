import React from 'react';
import PropTypes from 'prop-types';
import ForceDownload from '../ForceDownload'

function ButtonContent() {
    return (
        <React.Fragment>
            <span className="texticon-arrow-down d-md-none"></span>
            <span className="d-none d-md-inline">Export Gems</span>
        </React.Fragment>
    );
}

function ButtonExport(props) {
    return (
        props.downloadLink ?
            <ForceDownload downloadLink={props.downloadLink}>
                <ButtonContent />
            </ForceDownload>
        :
        null
    )
}

ButtonExport.propTypes = {
    downloadLink: PropTypes.string,
};

export default ButtonExport;
