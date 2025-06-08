import { createRoot } from 'react-dom/client'
import './index.css'
import LandingPage from './pages/Landing'
import './i18n.js';

createRoot(document.getElementById('root')).render(<LandingPage />)