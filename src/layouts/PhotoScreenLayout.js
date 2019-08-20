import React from 'react';
import { Route, Switch, Link } from "react-router-dom";

import AddPhotoPanel from '../components/AddPhotoPanel';
import InfoPopup from '../components/InfoPopup';
import TopLeftPanel from '../components/TopLeftPanel';
import HintMessageContainer from '../containers/HintMessageContainer';
import ImageContainer from '../components/ImageContainer';
import LeftPanel from '../containers/LeftPanel';
import RightPanel from '../containers/RightPanel';
import ButtonPanel from '../containers/ButtonPanel';
import { ClipLoader } from 'react-spinners';
import constants from '../const';
class PhotoScreenLayout extends React.Component {
    constructor() {
        super();
        this.timer = null;
        this.alreadyOn = false;
    }
    onDrop(ev) {

        ev.preventDefault();

        if (!ev.dataTransfer) return false;


        let i = 0;
        const files = [];
        while (i < ev.dataTransfer.files.length) {
            files.push(ev.dataTransfer.files[i]);
            i++;
        }

        if (!this.props.demoMode && files.length + this.props.countPhotos > constants.PHOTOS_LIMIT) {
            this.props.dropHandlerError();
        };
        if (this.props.demoMode && files.length > constants.PHOTOS_LIMIT) {
            this.props.dropHandlerError();
        };
        this.alreadyOn = false;
        this.props.dropHandler(files);
    }

    dragStart(event) {
        clearTimeout(this.timer);
        if(this.alreadyOn === false) {
            document.getElementById('filter-tabs').setAttribute('hovered', true);
        }
        this.alreadyOn = true;
    }
    dragEnd(event) {
        this.timer = setTimeout(() => {
            this.alreadyOn = false;
            document.getElementById('filter-tabs').setAttribute('hovered', false);
        }, 100);
    }
  render() {
    const specialClass = this.props.isSpecialSize ? "" : " inherit";
    const loadingCount = this.props.photosList.filter(photo => photo.percent < 100).length;
    const photoClass = (this.props.location.pathname === "/photo" && loadingCount === 0) ? " fullWidth" : "";

    return (
      <div className={"block image-block rounded-sm spacer" + specialClass + photoClass }>
        <div className="block-body inherit">
          <TopLeftPanel />
          <div className="d-md-inline-block inherit">
            <Switch>
              <Route exact path='/photo'>
                {loadingCount === 0 && !this.props.uploadInProgress ?
                  <React.Fragment>
                    <div className="d-md-inline-block inherit" id="filter-tabs" onDrop={this.onDrop.bind(this)} onDragEnter={this.dragStart.bind(this)} onDragOver={this.dragStart.bind(this)} onDragLeave={this.dragEnd.bind(this)}>
                    <LeftPanel />
                    <RightPanel />
                    {
                        this.props.shouldShowPreloader ?
                        <div className='preloder-wrapper'>
                            <ClipLoader
                            sizeUnit={"px"}
                            size={100}
                            color={'#2a2ad8'}
                            loading={true}
                            />
                        </div>
                        :
                        <ImageContainer
                            hideHint={this.props.hideHint}
                            imageSrc={this.props.activePhoto ? this.props.activePhoto.preview : ''}
                            gemImageArray={this.props.activePhoto ? this.props.activePhoto.retouchedPhotos : []}
                            isSpecialSize={this.props.isSpecialSize}
                            isAuth={this.props.isAuth}
                            showInnerPreloader={this.props.showInnerPreloader}
                        />
                    }
                    </div>
                    {
                    this.props.demoMode ? null : <ButtonPanel />
                    }
                    <HintMessageContainer />
                </React.Fragment>
                :
                <AddPhotoPanel
                    uploadInProgress={this.props.uploadInProgress}
                    imageSrc={`${process.env.PUBLIC_URL}/images/demo.jpg`}
                    isSpecialSize={this.props.isSpecialSize}
                    imageMaxCount={this.props.quantityPhotosInQueue}
                    photosList={this.props.photosList}
                />
                }
              </Route>
              <Route exact path='/photo/info-limit' >
                  <InfoPopup imageSrc={`${process.env.PUBLIC_URL}/images/demo.jpg`} isSpecialSize={this.props.isSpecialSize}>
                  <h2>You have run out of demo photo limit</h2>
                  <p className="lead">Get full gemia version to  #gem unlimited photos  and unleash the full potential of gemia technology</p>
                  <nav className="mb-0">
                    <div className="mb-3">
                      <a href={constants.PRICING_LINK} className="btn btn-primary">
                        Pricing Plans
                             </a>
                    </div>
                    <Link to="/photo">
                      <span className="texticon-arr-left mr-2"></span>
                      Back to online demo
                        </Link>
                  </nav>
                </InfoPopup>
              </Route>
              <Route exact path='/photo/info-login' >
                  <InfoPopup imageSrc={`${process.env.PUBLIC_URL}/images/demo.jpg`} isSpecialSize={this.props.isSpecialSize}>
                  <h2>You need to login to try online demo</h2>
                  <p className="lead">Unlock all gemia online demo features or get our amazing gemia single/family license</p>
                  <nav className="mb-0">
                    <div className="mb-3">
                        <a href={constants.PRICING_LINK} className="btn btn-primary">
                            Pricing Plans
                        </a>
                    </div>
                    <a href={constants.AUTH_LINK}>
                        Login to online demo
                    </a>
                  </nav>
                </InfoPopup>
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default PhotoScreenLayout;
