import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Viewport from './Viewport';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders Viewport component inside App without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Viewport />, div);
});