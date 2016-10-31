import {createStore, combineReducers} from 'redux';
import sections from './reducers/sections';

const devTools = (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default function () {
    return createStore(combineReducers({
        sections,
    }), devTools);
};
