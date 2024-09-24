import { createRoot } from 'react-dom/client';
import AppEntry from './Entry';
import './styles/index.css'; // Optional CSS file

const root = createRoot(document.getElementById('root')!);
root.render(<AppEntry />);
