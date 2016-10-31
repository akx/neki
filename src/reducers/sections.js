import findIndex from 'lodash/findIndex';
import concat from 'lodash/concat';
import {addSection, deleteSection, setSectionData, setSectionCollapse} from '../actions/sections';
import {handleActions} from 'redux-actions';

const uid = () => Math.floor(Math.random() * 6666666666).toString(36);

const newSection = (props) => (
    Object.assign(
        {
            id: uid(),
            plugin: null,
            data: '',
            collapse: false,
        },
        props
    )
);

function getDefaultSections() {
    return [
        {
            "id": "1",
            "plugin": null,
            "data": "# asd\n\n* foo\n* bar\n* quux",
            "collapse": false
        },
        {
            "id": "2",
            "plugin": null,
            "data": "## kissat\n\n* kissat koiria?",
            "collapse": false
        },
        {
            "id": "3",
            "plugin": null,
            "data": "## koirat\n\n* koireet kissoja?\n* mitä\n\n![](https://pics.onsizzle.com/this-is-the-supper-pupper-upvote-this-pupper-in-7-87737-2552796.png)",
            "collapse": true
        },
    ];
}

const sectionsReducer = handleActions({
    [deleteSection]: (state, {type, payload}) => (state.filter((s) => s.id !== payload.section.id)),
    [addSection]: (state, {type, payload}) => {
        const {section, rel} = payload;
        const idx = findIndex(state, (s) => s.id === section.id);
        if (idx > -1) {
            const newState = concat([], state);
            const start = idx + (rel === 'after' ? 1 : 0);
            console.log(start);
            newState.splice(start, 0, newSection());
            return newState;
        }
        return state;
    },
    [setSectionData]: (state, {type, payload}) => {
        const {section, data} = payload;
        return state.map((s) => (
            s.id === section.id ? Object.assign({}, section, {data}) : s
        ));
    },
    [setSectionCollapse]: (state, {type, payload}) => {
        const {section, collapse} = payload;
        return state.map((s) => (
            s.id === section.id ? Object.assign({}, section, {collapse}) : s
        ));
    },
}, getDefaultSections());

export default sectionsReducer;
