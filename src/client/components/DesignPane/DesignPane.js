import React from 'react';
import SuccessButton from '../Buttons/SuccessButton.js';
import {render} from 'react-dom';
import AceEditor from 'react-ace';
import brace from 'brace';

import 'brace/mode/xml';
import 'brace/theme/github';
import 'brace/theme/monokai';
import 'brace/theme/cobalt';
import 'brace/theme/solarized_light';
import 'brace/ext/language_tools';

class DesignPane extends React.Component {



    onChange = (newValue) => {
        console.log('change', newValue);
        this.setState({value: newValue});
    };

    render() {
        return (
            <div>
                <h1 style={{marginLeft: '1%'}}>Request </h1>
                {this.state.value}
                <div style={{ textAlign: 'center'}}>
                    {/*<div className="design-request">*/}
                    <AceEditor
                        style={{width: '98%', marginLeft: '1%'}}
                        mode="xml"
                        value={this.state.value}
                        theme="solarized_light"
                        onChange={this.onChange}
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{$blockScrolling: true}}
                    />
                    <div style={{paddingTop: '10px'}}>
                        <SuccessButton label='Try' primary raised/>
                    </div>
                </div>
            </div>
        );
    }
}

export default DesignPane;
