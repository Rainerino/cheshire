import { createRoot } from 'react-dom/client'
import './index.css'
import LandingPage from './pages/Landing'

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');

if (!container._root) {
  container._root = createRoot(container);
}
container._root.render(<LandingPage />);