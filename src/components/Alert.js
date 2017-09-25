import React, { Component } from 'react';
import './Alert.css';

class Alert extends Component {
    render () {
        return (
            <div className={"messages " + this.props.type} >
                {this.props.message}
            </div>
        )
    }
}

export default Alert;