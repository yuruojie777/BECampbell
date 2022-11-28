import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.min.css';
import Home from "./homepage/home";
import UserLogin from "./login/userlogin";
import {BrowserRouter as Router, Route} from "react-router-dom";
import axios from "axios";


ReactDOM.render(
    <Router>
        <Route path="/index" component={App} />
        <Route exact path="/" component={UserLogin} />
    </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
