import React from 'react';

import { storiesOf } from '@storybook/react';

import PhotoIcon from '../src/components/PhotoIcon/';
import LeftPanel from '../src/components/LeftPanel/';
import TopLeftPanel from '../src/components/TopLeftPanel/';
import CloseLink from '../src/components/CloseLink/';
import ProgressBar from '../src/components/ProgressBar/';

const images = [
    {"photo":{
        "id":1531,
        "name":"Screenshot from 2019-04-02 22-36-08.png",
        "url": "http://37.59.45.180:8010/images/demo.jpg",
        }
    },
    {"photo":{
        "id":1532,
        "name":"Screenshot from 2019-04-02 22-36-08.png",
        "url": "http://37.59.45.180:8010/images/demo.jpg",
        }
    },
    {},
    {},
    {},
    {},
    {},
    {},
]

storiesOf('Components', module)
    .add('PhotoIcon', () => (
        <PhotoIcon imageSrc={'http://37.59.45.180:8010/images/demo.jpg'} imageId={1} isActive={true} />
    ))
    .add('PhotoIconAdd', () => (
        <PhotoIcon />
    ))
    .add('PhotoIconLock', () => (
        <PhotoIcon isLocked={true} />
    ))
    .add('LeftPanel', () => (
        <div className="view view-level-2 d-md-inline-block inherit active" id="main"> 
            <div className="d-md-flex inherit align-items-center justify-content-center">
                <div className="block image-block rounded-sm inherit spacer">
                    <div className="block-body inherit">
                        <LeftPanel imageArray={images}/>
                    </div>
                </div>
            </div>
        </div>
    ))
    .add('TopLeftPanel', () => (
        <TopLeftPanel text='Gemia Online Demo'/>
    ))
    .add('CloseLink', () => (
        <CloseLink closeHref='#app/main/compare'/>
    ))
    .add('ProgressBar', () => (
        <ProgressBar valueNow={25} valueMin={0} valueMax={100} />
    ));
