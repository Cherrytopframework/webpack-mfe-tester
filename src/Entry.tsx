import App from './components/Mui/Dashboard/Dashboard';
import Providers from './components/custom/providers/Providers';
// import AppBasic from './App';
import './styles/index.css'; // Optional CSS file

const AppEntry = () => {
    return (
        <Providers path={(paths) => `${paths.notion}/list`}>
            {(init: any) => init && <App initialData={init} />}
        </Providers>
    );
};

export default AppEntry;

// export default AppBasic;