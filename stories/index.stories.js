import React from 'react';

import { storiesOf } from '@storybook/react';

import FilterIcon from '../src/components/FilterIcon';
import RightPanel from '../src/components/RightPanel';
import ButtonShare from '../src/components/ButtonShare';
import ButtonExport from '../src/components/ButtonExport';
import ButtonPanel from '../src/components/ButtonPanel';
import HintMessage from '../src/components/HintMessage';
import ExclamationMark from '../src/components/ExclamationMark';
import CloseHint from '../src/components/CloseHint';
import ImageContainer from '../src/components/ImageContainer';
import ProcessPhoto from '../src/components/ProcessPhoto';


const filters = [
  {
    "filter":
      {
        "id":1550,
        "caption":"Emerald",
        "url": "http://37.59.45.180:8010/images/f_emerald.jpg",
        "active": true,
        "locked": false,
      }
  },
  {
    "filter":
      {
        "id":1551,
        "caption":"Amber",
        "url": "http://37.59.45.180:8010/images/f_amber.jpg",
        "active": false,
        "locked": false,
      }
  },
  {
    "filter":
      {
        "id":1552,
        "caption":"",
        "url": "",
        "active": false,
        "locked": true,
      }
  },
  {
    "filter":
      {
        "id":1553,
        "caption":"",
        "url": "",
        "active": false,
        "locked": true,
      }
  },
  {
    "filter":
      {
        "id":1554,
        "caption":"",
        "url": "",
        "active": false,
        "locked": true,
      }
  },
  {
    "filter":
      {
        "id":1555,
        "caption":"",
        "url": "",
        "active": false,
        "locked": true,
      }
  }
]


storiesOf('Components', module)
    .add('FilterIconActive', () => (
        <FilterIcon imageSrc={'http://37.59.45.180:8010/images/f_emerald.jpg'} imageCaption={'Emerald'} imageId={1} isActive={true} />
    ))
    .add('FilterIcon', () => (
        <FilterIcon imageSrc={'http://37.59.45.180:8010/images/f_amber.jpg'} imageCaption={'Amber'} imageId={2} />
    ))
    .add('FilterIconLock', () => (
        <FilterIcon imageId={3} isLocked={true} />
    ))
    .add('RightPanel', () => (
      <div className="view view-level-2 d-md-inline-block inherit active" id="main"> 
            <div className="d-md-flex inherit align-items-center justify-content-center">
                <div className="block image-block rounded-sm inherit spacer">
                    <div className="block-body inherit">
                      <RightPanel list={filters} />
                    </div>
                </div>
            </div>
        </div>
    ))
    .add('ButtonShare', () => (
      <ButtonShare />
    ))
    .add('ButtonExport', () => (
      <ButtonExport />
    ))
    .add('ButtonPanel', () => (
      <ButtonPanel />
    ))
    .add('HintMessage-ShareLink', () => (
      <HintMessage 
        text={'Your share link was copied to clipboard'} 
        msgId='msg-1' 
      />
    ))
    .add('HintMessage-WeRecommended', () => (
      <HintMessage 
        text={'We recommend RAW, PNG, TIFF, JPG at least 1200x800 pixels'}
        msgId='browse-error'
       />
    ))
    .add('ExclamationMark', () => (
      <ExclamationMark />
    ))
    .add('CloseHint', () => (
      <CloseHint />
    ))
    .add('ImageContainer', () => (
      <ImageContainer imageSrc='http://37.59.45.180:8010/images/demo.jpg' />
    ))
    .add('ProcessPhoto', () => (
      <ProcessPhoto />
    ))
    ;