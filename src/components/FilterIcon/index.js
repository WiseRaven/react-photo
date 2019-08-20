import React from 'react';
import PropTypes from 'prop-types';


function SpanCover(props) {
    return (
        <span className="icon text-icon bordered-icon icon-xs-m icon-md-3xl thumb-cover">
            {props.children}
        </span>
    )
}

function FilterIcon(props) {
    const { imageSrc, imageCaption, isActive, imageId, isLocked, name } = props;
    const activeClass = isActive ? 'active': null;
    return (
        <li className="d-block">
            {
                !isLocked ?
                    <a href="#filter-emerald" onClick={(e) => {e.preventDefault(); props.actionClick(name)}} className={['thumb', 'rounded-sm', 'filter-thumb', activeClass].join(' ')} data-toggle="" data-toggle-callback="setTab">
                        <SpanCover>
                            <img src={imageSrc} imageid={imageId} className={[isActive ? 'null' : 'rounded-sm']} alt="" />
                        </SpanCover>
                        <span className="thumb-caption">{imageCaption}</span>
                    </a>
                :
                    <span className="thumb rounded-sm filter-thumb disabled">
                        <SpanCover>
                            <span className="texticon texticon-xs texticon-pswd"></span>
                        </SpanCover>
                    </span>

            }
        </li>
    )
}

FilterIcon.propTypes = {
    imageId: PropTypes.number,
    imageSrc: PropTypes.string,
    imageCaption: PropTypes.string,
    isActive: PropTypes.bool,
    isLocked: PropTypes.bool,
    actionClick: PropTypes.func
};

FilterIcon.defaultProps = {
    imageId: null,
    imageSrc: null,
    imageCaption: null,
    isActive: false,
    isLocked: false,
    actionClick: (id) => console.log(`Click by ${id}`)
};


export default FilterIcon;
