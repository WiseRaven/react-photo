import React from 'react';
import { connect } from 'react-redux';

import ButtonShare from '../../components/ButtonShare';
import ButtonExport from '../../components/ButtonExport';
import { createShareHash } from '../../helpers/photo.js';
import { getSelectedFilteredPhotoUrl } from '../../helpers/photo';
import { getActiveFilterName } from '../../helpers/filters';

class ButtonPanel extends React.Component {
    render() {
        const shareUrl = `${window.location.origin}${process.env.PUBLIC_URL}${this.props.hash}`;
        if (this.props.activeFilter) {
            return (
                <div className="panel panel-top transparent text-md-right">
                    <ButtonShare isAuth={this.props.isAuth} shareLink={shareUrl} />
                    <ButtonExport downloadLink={this.props.selectedFilteredPhotoUrl} />
                </div>
            )
        }
        else {
            return null;
        }
    }
}

const mapDispatchToProps = {};
const mapStateToProps = (state) => ({
    isAuth: state.options.user !== null,
    selectedPhotoURL: state.photo.photosList.reduce((url, photo) => {
        if (photo.isActive) url = photo.url;
        return url;
    }, ''),
    hash: createShareHash(state.photo.photosList),
    selectedFilteredPhotoUrl: getSelectedFilteredPhotoUrl(state.photo.photosList),
    activeFilter: getActiveFilterName(state.filters.filtersList),
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonPanel);

