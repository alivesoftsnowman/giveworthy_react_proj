import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';

const styles = {
    bar:{
        width:"100%",
        borderWidth:3,
        borderStyle: "solid",
        margin:10,
    },
    active:{
        borderColor: '#757575'
    },
    inactive:{
        borderColor: '#BDBDBD'
    }
}

export class Step extends PureComponent {
    constructor() {
        super();
    }
    render() {
        const { 
            active,
            flexGrow
        } = this.props;
        var barColor=active?styles.active:styles.inactive;
        return (
        <hr
            style={{flexGrow:flexGrow,...styles.bar,...barColor}}
        />
        );
    }
}

export default hot(module)(Step);