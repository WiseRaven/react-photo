import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CopyToClipboardContainer from '../../containers/CopyToClipboardContainer'

function ButtonContent() {
    return (<React.Fragment>
        <span className="texticon-share d-md-none"></span>
        <span className="d-none d-md-inline">Share Gems</span>
    </React.Fragment>);
}

function ButtonShare(props) {
    const { isAuth, shareLink } = props;

    return (
        isAuth ?
            <CopyToClipboardContainer link={shareLink}>
                <ButtonContent />
            </CopyToClipboardContainer>
        :
            <Link to="/photo/info-login" className="btn btn-sm btn-dark btn-mb-ic float-left float-md-none mb-left-wrap button-right-offset">
                 <ButtonContent />
            </Link>
    )
}

ButtonShare.propTypes = {
    isAuth: PropTypes.bool,
    shareLink: PropTypes.string.isRequired
};

ButtonShare.defaultProps = {
    isAuth: false,
};

export default ButtonShare;
