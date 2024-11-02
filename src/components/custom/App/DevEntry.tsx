import App from './App';

require('@helpers/setup');

const AppEntry = (parentProps?: any) => {
    console.log("Any Parent Props drilled: ", parentProps);
    return (<App />);
};

export default AppEntry;
