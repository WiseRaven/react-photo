import React from 'react';
import PropTypes from 'prop-types';

import FilterIcon from '../FilterIcon';


export default class RightPanel extends React.Component {
    render() {
        const { list } = this.props;

        return (
            <div className="panel panel-right filters-panel inherit panel-collapsed">
                <div className="scroll-wrapper inherit">
                    <div className="scroll inherit scroll-y">
                        <div className="scroll-container">
                            <ul className="list-unstyled thumbs text-right">
                                {
                                    list.map((item) => {
                                        return <FilterIcon
                                            imageSrc={item.url}
                                            imageCaption={item.caption}
                                            imageId={item.id}
                                            name={item.name}
                                            key={item.id}
                                            isActive={item.active}
                                            isLocked={item.locked}
                                            actionClick={this.props.clickByFilterItem}
                                        />
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

RightPanel.propTypes = {
    list: PropTypes.array
};

RightPanel.defaultProps = {
    list: []
};
