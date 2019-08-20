import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class CloseLink extends React.Component {
    render() {
        const { closeHref } = this.props;

        return (
            <div className="panel panel-top panel-right transparent">
                <Link to={closeHref} className="btn btn-sm btn-ic btn-dark">
                    <span className="texticon-xxs texticon-cross"></span>
                </Link>
            </div>
        )
    }
}

CloseLink.propTypes = {
    closeHref: PropTypes.string,
};

CloseLink.defaultProps = {
    closeHref: '/photo',
};
