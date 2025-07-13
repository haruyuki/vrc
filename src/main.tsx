import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import './index.css';
import './i18n';
import { CommissionLoadingProvider } from './context/CommissionLoadingContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CommissionLoadingProvider>
      <App />
    </CommissionLoadingProvider>
  </StrictMode>
);
