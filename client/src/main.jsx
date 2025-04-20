import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router";

import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/authContext.jsx';

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <BrowserRouter>
        <AuthProvider>
            <App />
            <ToastContainer />
        </AuthProvider>
    </BrowserRouter>
    // </StrictMode>,
)
