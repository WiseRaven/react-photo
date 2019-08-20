import React from 'react';
import { connect } from 'react-redux';
import RightPanel from '../../components/RightPanel';
import { changeActiveFilter } from '../../actions/filters';
import { changeActiveFilteredPhoto, setFilteredPhotoPreloaded } from '../../actions/photo';
import {showInnerPreloader, hideInnerPreloader} from '../../actions/options';
import { getActivePhoto, photoLoader, getFilteredPhotoByFilterName } from '../../helpers/photo';
import { getAvailableFiltersList } from '../../helpers/filters';

class RightPanelContainer extends React.Component {
    clickByFilterItem(name) {
        const filteredPhoto = getFilteredPhotoByFilterName(name, this.props.activePhoto.retouchedPhotos);
        if (filteredPhoto.preloaded) {
            this.props.changeActiveFilter(name);
            this.props.changeActiveFilteredPhoto(this.props.activePhoto.photoId, name);
        }
        else {
            this.props.showInnerPreloader();
            photoLoader(filteredPhoto.url).then(() => {
                this.props.setFilteredPhotoPreloaded(this.props.activePhoto.photoId, filteredPhoto.id);
                this.props.hideInnerPreloader();
                this.props.changeActiveFilter(name);
                this.props.changeActiveFilteredPhoto(this.props.activePhoto.photoId, name);
            });
        }
    }

    render() {
        if (this.props.activePhoto) {
            return <RightPanel list={getAvailableFiltersList(this.props.filtersList, this.props.activePhoto.retouchedPhotos)} clickByFilterItem={this.clickByFilterItem.bind(this)} />
        }
        else {
            return null;
        }
    }
}

const mapDispatchToProps = {
    changeActiveFilter,
    changeActiveFilteredPhoto,
    setFilteredPhotoPreloaded,
    showInnerPreloader,
    hideInnerPreloader
};

const mapStateToProps = (state) => ({
    filtersList: state.filters.filtersList,
    activePhoto: getActivePhoto(state.photo.photosList),
});

export default connect(mapStateToProps, mapDispatchToProps)(RightPanelContainer);
