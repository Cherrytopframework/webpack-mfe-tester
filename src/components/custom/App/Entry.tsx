import App from '@components/Mui/Dashboard/Dashboard';
import Providers from '@components/custom/providers/Providers';
// import './styles/index.css'; // Optional CSS file

require('@helpers/setup');

const AppEntry = (parentProps?: any) => {
    return (
        <Providers path={(paths) => `${paths.notion}/list`}>
            {(init: any) => init && <App initialData={init} {...parentProps ? parentProps : {}} />}
        </Providers>
    );
};

export default AppEntry;
