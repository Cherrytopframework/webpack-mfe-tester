import App from './components/Mui/Dashboard/Dashboard';
import Providers from './components/custom/providers/Providers';
import Logs from './utilities/helpers/logs';
// import AppBasic from './App';
import './styles/index.css'; // Optional CSS file


const logs = new Logs('cherrytopframework:8082', 'background: #222; color: #bad');
logs.log('Hello and welcome! This is a test: ', 'Additional info', 123);

console.logs = logs.log;
// custom.d.ts
declare global {
    interface Console {
        logs: (...args: any[]) => void;
    }
}

const AppEntry = (parentProps?: any) => {
    return (
        <Providers path={(paths) => `${paths.notion}/list`}>
            {(init: any) => init && <App initialData={init} {...parentProps ? parentProps : {}} />}
        </Providers>
    );
};

export default AppEntry;

// export default AppBasic;