import React from 'react';
import PropTypes from 'prop-types';

export default class ProgressBar extends React.Component {
    render() {
        const { valueNow, valueMin, valuemax } = this.props;

        return (
            <p className="progress">
                <span className="progress-bar bg-light" role="progressbar"  style={{width: `${valueNow}%`}} aria-valuenow={valueNow} aria-valuemin={valueMin} aria-valuemax={valuemax}></span>
            </p>
        )
    }
}

ProgressBar.propTypes = {
    valueNow: PropTypes.number,
    valueMin: PropTypes.number,
    valuemax: PropTypes.number,
};

ProgressBar.defaultProps = {
    valueNow: 0,
    valueMin: 0,
    valuemax: 100,
};
