import React from 'react';
import Dropzone from 'react-dropzone';
import { Link, withRouter } from 'react-router-dom';

class BrowseForm extends React.Component {
    fileChanged(acceptedFiles) {
        if (!this.props.isAuth) {
            this.props.uploadDemoPhoto();
            return this.props.history.push('/photo/info-login');
        }
        if (acceptedFiles.length < this.props.limitReached) {
            let i = 0;
            while (i < acceptedFiles.length) {
                let file = acceptedFiles[i];
                this.props.actionAddPhoto(file);
                i++;
            }
            this.props.setIsProcessing();
        }
        else {
            this.props.uploadDemoPhoto();
            this.props.history.push('/photo/info-limit');
        }
    }
    trySampleClick() {
        this.props.onDemoMode();
        this.props.uploadDemoPhoto();
        this.props.hideHint();
    }
    render() {
        return (
            <Dropzone onDrop={acceptedFiles => this.fileChanged(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                    <form className="browse-form">
                        <div className="dropzone" {...getRootProps()}></div>
                        <div className="spacer">
                            <h3 className="h2 mb-0">Ph<span className="icon icon-l fav3d-icon">o</span>tos</h3>
                            <p className="lead mb-2">Drag here to make a Gem</p>
                            <p className="note mb-3">or</p>
                            <div className="form-group mb-3">
                                <div className="custom-file custom-file-btn">
                                    <input type="file" multiple className="custom-file-input" accept="image/*" id="upload-file" name="file" {...getInputProps()} />
                                    <label className="btn btn-md btn-light" htmlFor="upload-file" {...getRootProps()}>Browse Photos</label>
                                </div>
                            </div>
                            <p>
                                <Link to={"/photo"} onClick={this.trySampleClick.bind(this)} className="text-light demo-link">Try Sample</Link>
                            </p>
                        </div>
                        <p className="note msg-note mb-0">We recommend RAW, PNG, TIFF, JPG <br />at least 1200x800 pixels</p>
                    </form>
                )}
            </Dropzone>
        )
    }
}

export default withRouter(BrowseForm)
