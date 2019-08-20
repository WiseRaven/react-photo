import React from 'react';
import PropTypes from 'prop-types';

class TopLeftPanel extends React.Component {
    render() {
        const { text } = this.props;

        return (
            <div className="panel panel-top panel-left d-none d-md-block transparent text-center">
                <em className="block-caption float-left">{text}</em>
            </div>
        )
    }
}

TopLeftPanel.propTypes = {
    text: PropTypes.string.isRequired
};

TopLeftPanel.defaultProps = {
    text: 'Gemia Online Demo'
};

export default TopLeftPanel;