import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { withRouter } from 'react-router-dom';


class DrugNDropBackground extends React.Component {
    render() {
        const { backgroundSrc } = this.props;

        return (
            <Dropzone>
                {({ getRootProps, getInputProps }) => (
                    <div className="dropzone rounded-sm" {...getRootProps()}>
                        <input type="file" multiple className="custom-file-input" accept="image/*" id="upload-file" name="file" {...getInputProps()} />
                        <img src={backgroundSrc} className="background-image" alt="" />
                    </div>
                )}
            </Dropzone>
        )
    }
}

export default withRouter(DrugNDropBackground)

DrugNDropBackground.propTypes = {
    backgroundSrc: PropTypes.string.isRequired,
    actionAddPhoto: PropTypes.func,
};

DrugNDropBackground.defaultProps = {
    actionAddPhoto: () => console.log(`AddPhoto`),
};
