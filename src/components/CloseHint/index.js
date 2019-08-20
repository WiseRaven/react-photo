import React from 'react';
import PropTypes from 'prop-types';

function CloseHint(props) {
    return (
        <button 
            type="button" 
            className="close rounded-sm" 
            data-dismiss="alert" 
            aria-label="Close" 
            data-toggle="d-none" 
            data-toggle-target="#browse-error"
            onClick={(e) => props.actionClick(e)}
        >
            <span aria-hidden="true">×</span>
        </button>
    )
}

CloseHint.propTypes = {
    actionClick: PropTypes.func
};

CloseHint.defaultProps = {
    actionClick: (e) => console.log(`Click by ${e.currentTarget}`)
};

export default CloseHint;
