import { createRoot } from 'react-dom/client';
import AppEntry from './Entry';
// import Logs from './utilities/helpers/logs';
import './styles/index.css'; // Optional CSS file

// const appLogger = new Logs('Cherrytopframework-shell:8082', 'background: #222; color: #badaff');
// console.log = appLogger.log;

const root = createRoot(document.getElementById('root')!);
root.render(<AppEntry />);
