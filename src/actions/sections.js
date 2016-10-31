import {createAction} from 'redux-actions';

export const deleteSection = createAction('deleteSection', (section) => ({section}));
export const addSection = createAction('addSection', (section, rel) => ({section, rel}));
export const setSectionData = createAction('setSectionData', (section, data) => ({section, data}));
export const setSectionCollapse = createAction('setSectionCollapse', (section, collapse) => ({section, collapse}));
