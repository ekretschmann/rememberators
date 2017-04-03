import React from 'react';
import DesignPane from '../DesignPane/DesignPane.js';
import {Tab, Tabs} from 'react-toolbox/lib/tabs';
import theme from './NavigationPane.css';

class NavigationPane extends React.Component {
    state = {
        index: 0,
        value: '<xml></xml>'
    };

    handleInverseTabChange = (index) => {
        this.setState({index: index});
    };

    handleActive = () => {
        console.log('Special one activated');
    };

    render () {
        return (
            <section>
                <Tabs theme={theme} index={this.state.index} onChange={this.handleInverseTabChange} inverse>
                    <Tab label='Design'>
                        <DesignPane value={this.state.value}/>
                    </Tab>
                    <Tab label='BRD'><small>Second Content</small></Tab>
                    <Tab label='Config'><small>Third Content</small></Tab>
                    <Tab label='QA'><small>Third Content</small></Tab>
                 </Tabs>
            </section>
        );
    }
}
export default NavigationPane;
