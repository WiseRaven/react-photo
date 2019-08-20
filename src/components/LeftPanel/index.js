import React from 'react';
import PropTypes from 'prop-types';
import PhotoIcon from '../PhotoIcon';

export default class LeftPanel extends React.Component {
    render() {
        const { imageArray, imageMaxCount } = this.props;
        const activeFilterClass = this.props.activeFilter ? 'filter-is-active' : null;

        return (
            <div className={["panel panel-left panel-collapsed inherit", activeFilterClass].join(' ')}>
                <div className="scroll-wrapper inherit">
                    <div className="scroll scroll-y inherit">
                        <div className="scroll-container">
                            <ul className="list-unstyled thumbs float-right text-left">
                                {
                                    imageArray.map((item, index) => (
                                        item.photo ?
                                            <PhotoIcon
                                                imageSrc={item.photo.preview}
                                                photoId={item.photo.id}
                                                key={index}
                                                setPhotoActive={this.props.setPhotoActive}
                                                isActive={item.photo.isActive}
                                            />
                                            :
                                            <PhotoIcon
                                                key={index}
                                                isLocked={index < imageMaxCount ? false : true}
                                                uploadFiles={this.props.uploadFiles}
                                                dropHandlerError={this.props.uploadFilesError}
                                            />
                                    )
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

LeftPanel.propTypes = {
    imageArray: PropTypes.array.isRequired,
    imageMaxCount: PropTypes.number,
};

LeftPanel.defaultProps = {
    imageMaxCount: 5,
};
