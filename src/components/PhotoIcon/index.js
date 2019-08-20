import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import constants from '../../const';

function SpanCover(props) {
    return (<span className="icon icon-m text-icon bordered-icon icon-xs-xl icon-md-3xl thumb-icon thumb-cover">
        {props.children}
    </span>);
}
class PhotoIcon extends React.Component {
    fileChanged(ev) {
        ev.preventDefault();

        if (!ev.target) return false;

        let i = 0;
        const files = [];
        while (i < ev.target.files.length) {
            files.push(ev.target.files[i]);
            i++;
        }

        if (!this.props.demoMode && files.length + this.props.countPhotos > constants.PHOTOS_LIMIT) {
            this.props.dropHandlerError();
        };
        if (this.props.demoMode && files.length > constants.PHOTOS_LIMIT) {
            this.props.dropHandlerError();
        };
        this.alreadyOn = false;
        this.props.uploadFiles(files);
    }

    setPhotoActive(event, photoId) {
        event.preventDefault();
        this.props.setPhotoActive(photoId);
    }
    render() {
        const { imageSrc, isActive, photoId, isLocked } = this.props;
        const activeClass = isActive ? 'active' : null;

        return (
            <li className="d-block">
                {isLocked ?
                    <Link to={"/photo/info-limit"} className="thumb rounded-sm disabled">
                        <SpanCover><span className="texticon texticon-xs texticon-pswd"></span></SpanCover>
                    </Link>
                    :
                    imageSrc ?
                        <a href="#photo" onClick={(event) => this.setPhotoActive(event, photoId)} className={['thumb', 'rounded-sm', activeClass].join(' ')}>
                            <SpanCover><img src={imageSrc} alt="Original" /></SpanCover>
                        </a>
                        :
                        <div to="/" className="thumb rounded-sm disabled">
                            <input multiple type='file' className="upload-file" id='uploadFile' onChange={(e) => this.fileChanged(e)} />
                            <label htmlFor='uploadFile' className='upload-file-label' />
                            <SpanCover><span className="btn btn-sm btn-ic btn-dark"><span className="texticon-xxs texticon-plus"></span></span></SpanCover>
                        </div>
                }
            </li>
        )
    }
}

export default PhotoIcon;

PhotoIcon.propTypes = {
    photoId: PropTypes.string,
    imageSrc: PropTypes.string,
    isActive: PropTypes.bool,
    isLocked: PropTypes.bool,
    setPhotoActive: PropTypes.func,
};
PhotoIcon.defaultProps = {
    photoId: null,
    imageSrc: null,
    isActive: false,
    isLocked: false,
    setPhotoActive: (id) => console.log(`Click by ${id}`)
};
