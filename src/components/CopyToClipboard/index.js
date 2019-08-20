import React from 'react';
import PropTypes from 'prop-types';

function CopyToClipboard(props) {
    const { link, showHint, hideHint } = props;

    const shareHandler = (link) => {
        navigator.clipboard.writeText(link)
        .then(() => {
            showHint('Your share link was copied to clipboard', 'msg-1');
            setTimeout(()=>hideHint(), 5000);
        })
        .catch(err => {
            console.log('Something went wrong', err);
        });
    }
    return (
        <a href="#/" onClick={(event) => { event.preventDefault(); shareHandler(link); } } className="btn btn-sm btn-dark btn-mb-ic float-left float-md-none mb-left-wrap button-right-offset">
            {props.children}
        </a>
    )
}

CopyToClipboard.propTypes = {
    link:  PropTypes.string.isRequired,
};

export default CopyToClipboard;
