import React from 'react';
import PropTypes from 'prop-types';
import DrugNDropBackground from '../DrugNDropBackground';
import { ClipLoader } from 'react-spinners';

export default class ImageContainer extends React.Component {
    constructor() {
        super();
        this.cocoenWrapper = null;
    }
    componentDidMount() {
        this.cocoenWrapper = document.querySelector('figure.cocoen');
        const compareOpts = {
            dragLabels: ['raw', 'gem']
        };
        if (window.Cocoen) {
            new window.Cocoen(this.cocoenWrapper, compareOpts);
        }
        setTimeout(() => window.dispatchEvent(new Event('resize')), 200);
        this.props.hideHint();
    }
    componentDidUpdate() {
        const { imageSrc, gemImageArray } = this.props;
        const secondaryItem = gemImageArray.filter(el => el.active === true).shift();
        document.getElementById('cocoen-original-photo').src = imageSrc;
        document.getElementById('cocoen-retouch-photo').src = secondaryItem ? secondaryItem.url : imageSrc;
        setTimeout(() => window.dispatchEvent(new Event('resize')), 200);
        setTimeout(() => window.dispatchEvent(new Event('resize')), 600);
        setTimeout(() => window.dispatchEvent(new Event('resize')), 1000);
    }

    render() {
        const { imageSrc, gemImageArray } = this.props;
        const secondaryItem = gemImageArray.filter(el => el.active === true).shift();
        const specialClass = this.props.isSpecialSize ? "" : " inherit";
        return (
            <React.Fragment>
                <div className="image-container rounded-sm inherit">
                    <figure className={"cocoen example h6 mb-0" + specialClass} >
                        <img ref={this.mainPhoto} src={imageSrc} id="cocoen-original-photo" className="rounded-sm" alt="Original" />
                        {secondaryItem ? <img src={secondaryItem.url} className="rounded-sm" alt="Modified" id="cocoen-retouch-photo" /> : <img src={imageSrc} className="rounded-sm" alt="Modified !!!!!" id="cocoen-retouch-photo" />}
                    </figure>
                </div>
                <DrugNDropBackground
                    backgroundSrc={imageSrc}
                    isAuth={this.props.isAuth}
                />
                {
                    this.props.showInnerPreloader ?
                        <div className='preloder-wrapper'>
                            <ClipLoader
                                sizeUnit={"px"}
                                size={100}
                                color={'#2a2ad8'}
                                loading={true}
                            />
                        </div>
                        : null
                }
            </React.Fragment>
        )
    }
}

ImageContainer.propTypes = {
    imageSrc: PropTypes.string,
    gemImageArray: PropTypes.array
};

ImageContainer.defaultProps = {
    imageSrc: null,
    gemImageArray: null
};
