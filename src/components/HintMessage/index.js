import React from 'react';
import PropTypes from 'prop-types';

import ExclamationMark from '../ExclamationMark';
import CloseHint from '../CloseHint';


function HintMessage(props) {
    const { text, msgId } = props;
    const classIf_1 = (msgId === 'msg-1') ? 'mt-4' : null;
    const classIf_2 = (msgId === 'browse-error') ? 'alert-dismissible' : null;
    return (
        text.length ?
        <div className={['panel', 'panel-bottom', 'panel-msg', classIf_1 ].join(' ')}>
            <div className={['alert alert-info', 'alert-sm', 'fade', 'show', 'rounded-sm', 'text-left', classIf_2].join(' ')} role="alert" id={msgId}>

                { msgId === 'browse-error'
                    ?
                        <React.Fragment>
                            <div className="d-flex flex-nowrap alert-icon-container">
                                <ExclamationMark />
                                <p className="mb-0" style={{maxWidth: 231}}>{text}</p>
                            </div>
                            <CloseHint actionClick={props.hideHint} />
                        </React.Fragment>
                    :
                        <p className="mb-0">{text}</p>
                }

            </div>
        </div>
        :
        null
    )
}


HintMessage.propTypes = {
    text: PropTypes.string,
    msgId: PropTypes.string,
};

HintMessage.defaultProps = {
    text: null,
    msgId: null,
};

export default HintMessage;
