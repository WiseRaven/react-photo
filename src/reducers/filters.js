import {
    CHANGE_ACTIVE_FILTER,
} from './../actions/filters';

import { changeActiveFilter } from '../helpers/filters';

const initialState = {
    filtersList: [
        {
            id: 1550,
            caption: '',
            name: 'model',
            url: '',
            active: true,
            locked: false,
            order: 0
        },
        {
            id: 1551,
            caption: 'Emerald',
            name: 'filter1',
            url: 'http://37.59.45.180:8010/images/f_emerald.jpg',
            active: false,
            locked: false,
            order: 1
        },
        {
            id: 1552,
            caption: 'Amber',
            name: 'filter2',
            url: 'http://37.59.45.180:8010/images/f_amber.jpg',
            active: false,
            locked: false,
            order: 2
        },
        {
            id: 1553,
            caption: 'Jade',
            name: 'filter3',
            url: 'http://37.59.45.180:8010/images/f_jade.jpg',
            active: false,
            locked: false,
            order: 3
        },
        {
            id: 1554,
            caption: 'Ester',
            name: 'filter4',
            url: 'http://37.59.45.180:8010/images/f_ester.jpg',
            active: false,
            locked: false,
            order: 4
        },
        {
            id: 1555,
            caption: '',
            name: '',
            url: '',
            active: false,
            locked: true,
            order: 5
        },
        {
            id: 1556,
            caption: '',
            name: '',
            url: '',
            active: false,
            locked: true,
            order: 6
        },
    ]
};

export default (state = initialState, action) => {
    switch (action.type) {
        case '@@redux/INIT':
            return state;
        case CHANGE_ACTIVE_FILTER:
            return {
                ...state,
                filtersList: changeActiveFilter(action.payload, [...state.filtersList])
            }
        default:
            return state;
    }
}
