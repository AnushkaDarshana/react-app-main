import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Register from './components/Registration';
import Login from './components/Login';
import Reports from './components/Reports';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
    return ( <
        Router >
        <
        div className = "App" >
        <
        header className = "App-header" >
        <
        ToastContainer / >
        <
        Routes >
        <
        Route path = "/"
        element = { < Login / > }
        /> <
        Route path = "/register"
        element = { < Register / > }
        /> <
        Route path = "/homepage"
        element = { < Homepage / > }
        /> <
        Route path = "/reports"
        element = { < Reports / > }
        /> <
        /Routes> <
        /header> <
        /div> <
        /Router>
    );
}

export default App;