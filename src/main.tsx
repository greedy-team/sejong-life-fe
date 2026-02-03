import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProviders } from './provider/Provider.tsx';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
);
