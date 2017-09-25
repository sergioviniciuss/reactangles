import React from  'react';
import ReactDOM from 'react-dom';
import  { shallow , mount } from 'enzyme';
import Viewport from './Viewport';

describe('Viewport creation', () => {
	it('renders viewport component without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<Viewport />, div);
    });
    it('should fail when adding a rectangle without informing width or height', () => {
        const wrapper = mount(<Viewport />);
        wrapper.find('#addRectangle').simulate('click');
        expect(wrapper.state().alertMessage).toEqual('Oops.. a rectangle must have a width and height.');
    })
    it('renders page at first access allowing user to enter up to 5 rectangles', () => {
        const wrapper = mount(<Viewport />);
        expect(wrapper.state().alertMessage).toEqual('You can add 5 rectangles to the screen');
    })
    
    it('adds a rectangle to viewport with 200px of width and 300px of height', () => {
        const wrapper = mount(<Viewport />);
        let widthInput = wrapper.find('#width');
        const heightInput = wrapper.find('#height');
        let rectangleWidth = 200;
        let rectangleHeight = 300;
		widthInput.simulate('change', { target: { value: rectangleWidth } });
        heightInput.simulate('change', { target: { value: rectangleHeight } });
        wrapper.find('#addRectangle').simulate('click');
        expect(wrapper.state().rectangleWidth).toEqual(200);
        expect(wrapper.state().rectangleHeight).toEqual(300);
    })
});