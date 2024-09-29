import React from 'react'
import ReactDOM from "react-dom/client"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from "./store"
import { BrowserRouter as Router} from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
    <Provider store={store}>
    <Router>
    <App />
    </Router>
    </Provider>
   
  </React.StrictMode>,
)
