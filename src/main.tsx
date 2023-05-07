import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { connectors } from './connect-wallet';
import './index.css';
import { router } from './routes/root';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Web3ReactProvider connectors={connectors}>
      <RouterProvider router={router} />
    </Web3ReactProvider>
  </React.StrictMode >,
)
