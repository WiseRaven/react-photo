import React from 'react';
import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';
import { getFileExtension } from '../../helpers/photo';

export default function ForceDownload(props) {
    const { downloadLink } = props;

    const downloadHandler = (downloadLink) => {
        try {
            const ext = getFileExtension(downloadLink);
            saveAs(downloadLink, `image${Date.now()}.${ext}`);
        } catch (err) {
            console.log('Something went wrong', err);
        }
    }
    return (
        <a href='#/' onClick={(e) => {e.preventDefault(); downloadHandler(downloadLink)}} className="btn btn-sm btn-dark btn-mb-ic float-right float-md-none mb-right-wrap">
            {props.children}
        </a>
    )
}

ForceDownload.propTypes = {
    downloadLink: PropTypes.string.isRequired
};
