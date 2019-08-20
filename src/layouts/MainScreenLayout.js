import React from 'react';
import { Route, Switch } from "react-router-dom";

import FirstPopupContainer from '../containers/FirstPopup';
import HintMessageContainer from '../containers/HintMessageContainer';
import PhotoScreenLayoutContainer from './../containers/PhotoScreenLayout';

class MainScreenLayout extends React.Component {
    render() {
        return (
            // <div className={'section app-section footer-wrapper inherit view view-level-1 active'}>
                <div className='container-fluid inherit'>
                    <div className='section-body inherit text-center'>
                        <div className='app-container inherit'>
                            <div className='d-flex inherit align-items-center justify-content-center'>
                                <Switch>
                                    <Route exact path='/' >
                                        <FirstPopupContainer />
                                        <HintMessageContainer />
                                    </Route>
                                    <Route path='/photo' >
                                        <PhotoScreenLayoutContainer />
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            // </div>
        );
    }
}


export default MainScreenLayout;
