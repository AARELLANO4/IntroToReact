/*********************************************************************************
*  WEB422 –Assignment 3
*  I declare that this assignment is my ownwork in accordance with SenecaAcademic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Alexis Arellano // Student ID: 155816184 // Date: Friday October 23/2020
**********************************************************************************/

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App /> 
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
