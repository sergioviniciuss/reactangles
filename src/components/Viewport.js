import React, { Component } from 'react';
import Rectangle from "./Rectangle";
import Alert from "./Alert";
import './Viewport.css';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';


const rectangles_cookie_key = 'USER_RECTANGLES';
const sum_of_rectangles_width_cookie_key = 'SUM_OF_RECTANGLES_WIDTH';
const available_width_on_screen_cookie_key = 'AVAILABLE_WIDTH_ON_SCREEN';
const max_number_of_rectangles_cookie_key = 'MAX_NUMBER_RECTANGLES';
const max_number_of_rectangles = 5;
class Viewport extends Component {
    constructor(props) {
        super(props);
        let maxNumberOfRectanglesToBeAdded = (max_number_of_rectangles - read_cookie(rectangles_cookie_key).length);
        this.state = {
            rectangleList : read_cookie(rectangles_cookie_key).length ? read_cookie(rectangles_cookie_key) : [],
            rectanglesOnScreen: read_cookie(rectangles_cookie_key).length ? read_cookie(rectangles_cookie_key).length : 0,
            availableWidth: document.cookie.indexOf(available_width_on_screen_cookie_key) > -1 ? read_cookie(available_width_on_screen_cookie_key) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
            viewportWidth: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
            sumOfRectanglesWidth: document.cookie.indexOf(sum_of_rectangles_width_cookie_key) > -1 ? read_cookie(sum_of_rectangles_width_cookie_key) : 0,
            rectId: 0,
            rectangleWidth: 0,
            rectangleHeight: 0,
            topPosition: 0,
            leftPosition: 0,
            bgColor: "#000000",
            disableAddRectangle: (read_cookie(rectangles_cookie_key).length + 1) <= max_number_of_rectangles ? false : true,
            alertMessage: `You can add ${maxNumberOfRectanglesToBeAdded} rectangles to the screen`,
            alertType: "info"
        }

        this.addRectangle = this.addRectangle.bind(this);
        this.reset = this.reset.bind(this);
    }
    
    addRectangle() {
        let rectangleWidth = this.refs.width.value;
        let rectangleHeight= this.refs.height.value;
        let rectangleList = this.state.rectangleList;
        //validations
        if (rectangleWidth < 1 || rectangleHeight < 1) {
            this.setState({
                disableAddRectangle : false,
                alertMessage: 'Oops.. a rectangle must have a width and height.',
                alertType: "error"
            });
            return false;
        }
        if (rectangleWidth > this.state.viewportWidth) {
            this.setState({
                disableAddRectangle : false,
                alertMessage: 'Oops.. The rectangle you add is bigger than available viewport',
                alertType: "error"
            });
            return false;
        }
        let sumOfRectanglesWidth = parseInt(rectangleWidth, 10) + this.state.sumOfRectanglesWidth;
        //The sum of widths cannot be larger than the viewport width.
        if (((sumOfRectanglesWidth > this.state.viewportWidth) && (sumOfRectanglesWidth > this.state.availableWidth)) || (this.state.availableWidth < 0)) {
            this.setState({
                disableAddRectangle : false,
                alertMessage: 'Oops.. The sum of the widths of the rectangles you added is bigger than the available viewport',
                alertType: "error"
            });
            return false;
        }
        
        this.setState({
            rectanglesOnScreen: this.state.rectanglesOnScreen + 1,
            availableWidth: (this.state.availableWidth - rectangleWidth),
            rectangleWidth,
            rectangleHeight,
            rectangleList: rectangleList.concat([
                { 
                    "key":rectangleList.length,
                    "id":rectangleList.length,
                    "width":this.state.rectangleWidth,
                    "height": this.state.rectangleHeight,
                    "topPosition":this.state.topPosition,
                    "leftPosition": this.state.leftPosition,
                    "bgColor":this.state.bgColor
                }]
            ),
            rectId: rectangleList.length,
            alertMessage: "You've added a new rectangle on the screen",
            alertType: "success",
            sumOfRectanglesWidth
        }, () => {
            if (this.state.rectanglesOnScreen > max_number_of_rectangles) {
                this.setState({
                    disableAddRectangle : true,
                    alertMessage: `You've reached the maximum number of rectangles allowed ${max_number_of_rectangles}`,
                    alertType: "warning"
                })
            } else {
                let maxNumberOfRectanglesToBeAdded = (max_number_of_rectangles - this.state.rectanglesOnScreen)
                bake_cookie(rectangles_cookie_key, this.state.rectangleList);
                bake_cookie(sum_of_rectangles_width_cookie_key, sumOfRectanglesWidth);
                bake_cookie(available_width_on_screen_cookie_key, this.state.availableWidth);
                bake_cookie(max_number_of_rectangles_cookie_key, maxNumberOfRectanglesToBeAdded);
                this.setState({
                    availableWidth:read_cookie(available_width_on_screen_cookie_key) || this.state.availableWidth
                });
                if (this.state.rectanglesOnScreen === 5) {
                    this.setState({
                        disableAddRectangle : true,
                        alertMessage: `You've reached the maximum number of rectangles allowed: ${max_number_of_rectangles}`,
                        alertType: "warning"
                    })
                }
                if (this.state.availableWidth === 0) {
                    this.setState({
                        disableAddRectangle : true,
                        alertMessage: `The sum of the widths of the rectangles you added is equal to the available viewport. If you want to try again, please, click to reset.`,
                        alertType: "warning"
                    })
                }
            }
        });
    }
    
    reset() {
        delete_cookie(rectangles_cookie_key);
        delete_cookie(sum_of_rectangles_width_cookie_key);
        delete_cookie(available_width_on_screen_cookie_key);
        delete_cookie(max_number_of_rectangles_cookie_key);
        this.setState({
            rectangleList: [],
            disableAddRectangle: false,
            alertMessage: "All rectangles were removed.",
            alertType: "info",
            availableWidth: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
            sumOfRectanglesWidth: 0,
            rectanglesOnScreen: 0
        });
    }

    componentDidMount() {
        this.setState([{rectangleList: read_cookie(rectangles_cookie_key)}]);
    }

    render () {
        return (
            <div>
                <p className="">
                   Viewport Width: {this.state.viewportWidth}
                </p>
                <p className="">
                    Available Width: {this.state.availableWidth}
                </p>
                <hr />
                <input 
                    placeholder="Type a width" 
                    ref="width" 
                    id="width"
                    type="number" 
                    min="1" 
                    step="1" 
                    onChange={(event) => {this.setState({
                        rectangleWidth: event.target.value
                    })}}
                />
                <input 
                    placeholder="Type a height" 
                    ref="height" 
                    id="height"
                    type="number" 
                    min="1" 
                    step="1" 
                    onChange={(event) => {this.setState({
                        rectangleHeight: event.target.value
                    })}}
                />
                <input 
                    placeholder="top position" 
                    ref="topPosition" 
                    id="topPosition"
                    type="number" 
                    min="1" 
                    step="1" 
                    onChange={(event) => {this.setState({
                        topPosition: event.target.value
                    })}}
                />
                <input 
                    placeholder="left position" 
                    ref="leftPosition" 
                    id="leftPosition"
                    type="number" 
                    min="1" 
                    step="1" 
                    onChange={(event) => {this.setState({
                        leftPosition: event.target.value
                    })}}
                />
                <input 
                    type="color" 
                    id="color"
                    value={this.state.bgColor}
                    onChange={(event)=> {this.setState({
                        bgColor: event.target.value
                    })}}    
                />
                <button id="addRectangle" disabled={this.state.disableAddRectangle} onClick={() => this.addRectangle()}>Add Rectangle</button>
                <button id="reset" onClick={() => this.reset()}>Reset</button>
                <Alert 
                    message={this.state.alertMessage} 
                    type={this.state.alertType} 
                />
                <hr />
                <div className="viewport-wrapper">
                {
                    this.state.rectangleList.map((rectangle, index) => 
                        <Rectangle {...rectangle}/>
                    )
                }
                </div>
            </div>
        )
    }
}

export default Viewport;