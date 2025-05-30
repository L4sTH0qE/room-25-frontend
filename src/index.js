import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import BackgroundMusic from "./components/music/BackgroundMusic";

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter basename={baseUrl}>
        <React.StrictMode>
            <App/>
            <BackgroundMusic/>
        </React.StrictMode>
    </BrowserRouter>
)
;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
