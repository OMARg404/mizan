import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AuthProvider } from './context/AuthContext'; // Ensure AuthProvider is set up properly
import Navbar from './components/Navbar/Navbar'; // Add Navbar for routing
import Footer from './components/Footer/Footer'; // Add Footer component

// Import your pages
import Login from './Page/Login/Login';
import Home from './Page/Home/Home';
import Budget from './Page/Budget/Budget';
import Credits from './Page/Credits/Credits';
import Dashboard from './Page/Dashboard/Dashboard';
import IncomingRequests from './Page/Incomingrequests/Incomingrequests';
import Reports from './Page/Reports/Reports';
import Requests from './Page/Requests/Requests';
import UserPermissions from './Page/UserPermissions/UserPermissions';
import Admin from './Page/Admin/Admin.jsx';

// A wrapper component to render Navbar and Footer on certain routes
const Layout = ({ children }) => ( <
    >
    <
    Navbar / > { children } <
    Footer / >
    <
    />
);

const App = () => {
        return ( <
                Router >
                <
                AuthProvider >
                <
                Routes > { /* The Login page should not have Navbar or Footer */ } <
                Route path = "/"
                element = { < Login / > }
                />

                { /* All other pages will display the Navbar and Footer */ } <
                Route path = "/home"
                element = { < Layout > < Home / > < /Layout>} / >
                    <
                    Route path = "/budget"
                    element = { < Layout > < Budget / > < /Layout>} / >
                        <
                        Route path = "/credits"
                        element = { < Layout > < Credits / > < /Layout>} / >
                            <
                            Route path = "/dashboard"
                            element = { < Layout > < Dashboard / > < /Layout>} / >
                                <
                                Route path = "/incomingrequests"
                                element = { < Layout > < IncomingRequests / > < /Layout>} / >
                                    <
                                    Route path = "/reports"
                                    element = { < Layout > < Reports / > < /Layout>} / >
                                        <
                                        Route path = "/requests"
                                        element = { < Layout > < Requests / > < /Layout>} / >
                                            <
                                            Route path = "/userpermissions"
                                            element = { < Layout > < UserPermissions / > < /Layout>} / >
                                                <
                                                Route path = "/admin"
                                                element = { < Layout > < Admin / > < /Layout>} / >
                                                    <
                                                    /Routes> <
                                                    /AuthProvider> <
                                                    /Router>
                                                );
                                            };

                                            export default App;