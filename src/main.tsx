import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import './index.css';
import { router } from './routes/root';
import { AuthProvider } from './contexts/auth-context';
import { EthereumProvider } from './contexts/ethereum-context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <EthereumProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </EthereumProvider>
  </React.StrictMode >,
)
