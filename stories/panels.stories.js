import React from 'react';

import { storiesOf } from '@storybook/react';
import AddPhotoPanel from '../src/components/AddPhotoPanel';
import InfoPopup  from '../src/components/InfoPopup/';
import ImageContainer from '../src/components/ImageContainer/';

const images = [
    {
        "id":1531,
        "url": "http://37.59.45.180:8010/images/demo_d.jpg",
        "active": true
    },
    {
        "id":1532,
        "url": "http://37.59.45.180:8010/images/demo_b.jpg",
        "active": false
    },
]

storiesOf('Panels', module)
    .add('AddPhotoPanel', () => (
        <div class="text-center">
            <AddPhotoPanel
                valueNow={25}
                valueMin={0}
                valueMax={100}
                imageSrc='http://37.59.45.180:8010/images/demo.jpg'
                imageCount={1}
                imageMaxCount={5}
            />
        </div>
    ))
    .add('InfoPopupAuth', () => (
        <div className="block image-block rounded-sm inherit spacer text-center">
            <InfoPopup
                isActive={true}
                isAuth={true}
                imageSrc='http://37.59.45.180:8010/images/demo.jpg' 
            />
        </div>
    ))
    .add('InfoPopupNotAuth', () => (
        <div className="block image-block rounded-sm inherit spacer text-center">
            <InfoPopup
                isActive={true}
                isAuth={false}
                imageSrc='http://37.59.45.180:8010/images/demo.jpg' 
            />
        </div>
    ))
    .add('ComparePhoto', () => (
        <div class="block image-block rounded-sm inherit spacer app-container">
            <ImageContainer imageSrc='http://37.59.45.180:8010/images/demo.jpg' gemImageArray={images} />
        </div>
    ))
    ;
