import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// import 'https://fonts.googleapis.com/css?family=Montserrat:400,500,700,800';
import '../public/css/bootstrap/dist/css/bootstrap.min.css';

import '../public/css/icons.css';
import '../public/css/base.css';
import '../public/css/main.css';
import '../public/css/section.css';
import '../public/css/animate.css';

import '../public/css/assets/cocoen.css';
import '../public/css/assets/demo.css';
//only for storybook
import '../public/css/story.css';
import '../public/css/App.css';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(
  withInfo({
    header: false, // Global configuration for the info addon across all of your stories.
  })
);

configure(loadStories, module);
