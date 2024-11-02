import { createRoot } from 'react-dom/client';
// import AppEntry from './Entry'; // future use
import AppEntry from './DevEntry'; // keep it simple just to be a host to distribute the ...
// ... microcomponent infrastructure 🛠️😎

const root = createRoot(document.getElementById('root')!);
root.render(<AppEntry />);
