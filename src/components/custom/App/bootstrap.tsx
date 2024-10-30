import { createRoot } from 'react-dom/client';
import AppEntry from './Entry';

const root = createRoot(document.getElementById('root')!);
root.render(<AppEntry />);
