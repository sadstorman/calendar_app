import React from 'react';
import ReactDOM from 'react-dom';
import { Calendarapp } from './Calendarapp';
import './styles/styles.css'

console.log(process.env);

ReactDOM.render(
  <Calendarapp />,
  document.getElementById('root')
);
