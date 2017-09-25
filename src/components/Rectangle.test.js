import React from  'react';
import ReactDOM from 'react-dom';
import  { shallow , mount } from 'enzyme';
import Rectangle from './Rectangle';
const rectId = '1';
const props = {
    id: rectId,
    width: 200,
    height: 200,
    topPosition:0,
    leftPosition:0,
    bgColor: '#ffffff'
}

describe('Rectangle creation', () => {
	it('renders rectangle component without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<Rectangle />, div);
	});
});
describe('Rectangle', ()=> {
    const wrapper = mount(<Rectangle {...props} />);
    it('renders a rectangle with id rect_1', () => {
        expect(wrapper.props().id).toBe('1');
    });
});