import React from 'react';

import BackgroundPhoto from '../BackgroundPhoto';
import CloseLink from '../CloseLink';


export default function InfoPopup(props) {
    return (
        <React.Fragment>
            <BackgroundPhoto {...props} isCoverBackground={true}/>
            <CloseLink  closeHref='/photo' />
            <div className="panel muted rounded-sm inherit">
                <div className="row inherit align-items-center justify-content-center">
                    <div className="col-auto msg-container">
                        {props.children}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
