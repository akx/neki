import React, {Component} from 'react';
import {Box, Flex} from 'reflexbox';
import './App.css';
import render from './render';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import {connect} from 'react-redux';
import {addSection, deleteSection, setSectionData, setSectionCollapse} from './actions/sections';

const SectionEditor = connect()(({dispatch, section}) => {
    const changeData = (e) => dispatch(setSectionData(section, e.target.value));
    return (
        <Box p={1} mb={1} style={{background: 'silver'}}>
            <textarea value={section.data} onInput={changeData} onChange={changeData} />
            <ButtonGroup>
                <Button bsSize="xsmall" bsStyle="danger" onClick={() => dispatch(deleteSection(section))}>Delete</Button>
                <Button bsSize="xsmall" onClick={() => dispatch(addSection(section, 'before'))}>&uarr; Add Above</Button>
                <Button bsSize="xsmall" onClick={() => dispatch(addSection(section, 'after'))}>&darr; Add Below</Button>
                <Button bsSize="xsmall" onClick={() => dispatch(setSectionCollapse(section, !section.collapse))} selected={section.collapse}>
                    Layout next to last section
                </Button>
            </ButtonGroup>
        </Box>
    );
});

const renderSections = (sections) => {
    const rows = [[]];
    sections.forEach((section) => {
        const content = render(section);
        if (!section.collapse) {
            rows.push([]);
        }
        rows[rows.length - 1].push({section, content});
    });

    return <div>{
        rows.map((cells, r) => (
            <Flex key={r}>
                {cells.map((cell, c) => (
                    <Box flexAuto key={cell.section.id} dangerouslySetInnerHTML={{__html: cell.content}} />))}
            </Flex>
        ))
    }</div>;
};

class App extends Component {
    render() {
        const {sections} = this.props;
        return (
            <Flex>
                <Box col={6}>{sections.map((section) => <SectionEditor section={section} key={section.id} />)}</Box>
                <Box col={6} p={2}>{renderSections(sections)}</Box>
            </Flex>
        );
    }
}

export default connect(
    (state) => ({sections: state.sections})
)(App);
