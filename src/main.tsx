import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProviders } from './provider/Provider.tsx';
import App from './App.tsx';
import './index.css';

async function enableMocking() {
  if (!import.meta.env.DEV) return;
  const { worker } = await import('./mock/browser');
  return worker.start({ onUnhandledRequest: 'bypass' });
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </StrictMode>,
  );
});
