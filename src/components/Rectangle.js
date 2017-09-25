import React, { Component } from 'react';

class Rectangle extends Component {

    render () {
        return (
            <div 
                key={this.props.id} 
                id={"rect_" + this.props.id} 
                className="rectangle"
                style={{position: 'absolute', backgroundColor: this.props.bgColor, top: this.props.topPosition + "px", left: this.props.leftPosition + "px", width: this.props.width + 'px', height: this.props.height + 'px', border: '1px solid #000000', display: 'block', float: 'left'}}>

            </div>
        )
    }
}


export default Rectangle;