import React from 'react';
import PropTypes from 'prop-types';

export default class BackgroundPhoto extends React.Component {
    render() {
        const { imageSrc } = this.props;
        const specialClass = this.props.isSpecialSize ? "" : " inherit";
        const isCoverClass = this.props.isCoverBackground ? " covered" : "";
        return (
            <div className="image-container rounded-sm inherit">
                <figure className={"cocoen example h6 mb-0" + specialClass} >
                    <img  src={imageSrc} id="cocoen-original-photo" className={"rounded-sm" + isCoverClass} alt="Original" />
                </figure>
            </div>
        )
    }
}

BackgroundPhoto.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    isCoverBackground: PropTypes.bool,
};

BackgroundPhoto.defaultProps = {
    isCoverBackground: false,
};
