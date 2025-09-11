import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProviders } from './context/Provider.tsx';
import App from './App.tsx';
import './index.css';

// if (import.meta.env.DEV) {
//   const { worker } = await import('./mock/browser');
//   //   await worker.start();
// }

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
);
