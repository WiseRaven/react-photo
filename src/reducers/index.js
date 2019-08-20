import { combineReducers } from 'redux';
import photo from './photo';
import options from './options';
import filters from './filters';
import hints from './hints';

export default combineReducers({
    photo,
    options,
    filters,
    hints,
});
