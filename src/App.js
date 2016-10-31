import React, {Component} from 'react';
import {Box, Flex} from 'reflexbox';
import uid from 'lodash/uniqueId';
import './App.css';
import render from './render';
import Button from 'react-bootstrap/lib/Button';

const SectionEditor = ({section, onEdit, onAction}) => {
    const changeData = (e) => onEdit(section, {data: e.target.value});
    const changeCollapse = (e) => onEdit(section, {collapse: !!e.target.checked});
    return (
        <Box p={1} mb={1} style={{background: 'silver'}}>
            <textarea value={section.data} onInput={changeData} onChange={changeData} />
            <Flex>
                <Box flexAuto>
                    <Button bsSize="xsmall" bsStyle="danger" onClick={() => onAction(section, 'delete')}>Delete Section</Button>
                    &nbsp;
                    <Button bsSize="xsmall" onClick={() => onAction(section, 'add-above')}>&uarr; Add Above</Button>
                    &nbsp;
                    <Button bsSize="xsmall" onClick={() => onAction(section, 'add-below')}>&darr; Add Below</Button>
                    &nbsp;
                    <label>
                        <input type="checkbox" checked={!!section.collapse} onChange={changeCollapse} />
                        &nbsp;Layout next to last section
                    </label>
                </Box>
            </Flex>
        </Box>
    );
};

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
    constructor(props) {
        super(props);
        this.state = {
            sections: [
                {
                    id: uid(),
                    plugin: null,
                    data: 'hello, world!',
                },
                {
                    id: uid(),
                    plugin: null,
                    data: 'nnep',
                },
                {
                    id: uid(),
                    plugin: null,
                    data: 'nnep',
                    collapse: true,
                },
            ],
        };
        this.onEditSection = this.onEditSection.bind(this);
        this.onSectionAction = this.onSectionAction.bind(this);
    }

    onEditSection(section, changes) {
        if ('data' in changes) {
            section.data = changes;
        }
        if ('collapse' in changes) {
            section.collapse = !!changes.collapse;
        }
        this.setState({sections: this.state.sections});
    }

    onSectionAction(section, action) {
        
    }

    render() {
        return (
            <Flex>
                <Box col={6}>{this.state.sections.map(
                    (section) => <SectionEditor section={section} key={section.id}
                                                onEdit={this.onEditSection}
                                                onAction={this.onSectionAction}
                    />)}</Box>
                <Box col={6} p={2}>{renderSections(this.state.sections)}</Box>
            </Flex>
        );
    }
}

export default App;
