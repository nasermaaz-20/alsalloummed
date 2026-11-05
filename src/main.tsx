import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles.css';
document.documentElement.classList.add('js-enhanced');
document.getElementById('boot-recovery')?.setAttribute('hidden', '');
const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
// Query filters can differ from the static default page. Render that state fresh
// instead of hydrating markup produced for a different selected filter.
if (root.dataset.prerendered === 'true' && !window.location.search) hydrateRoot(root, app);
else createRoot(root).render(app);
