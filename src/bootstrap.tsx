// import React from 'react';
import { createRoot } from 'react-dom/client';
// @ts-ignore
// import Providers from 'app/AppProvider'; //todo need to figure out how to import type for Federated Modules
import App from './App';
// import './styles/index.css'; // Optional CSS file

const root = createRoot(document.getElementById('root')!);
root.render(<App />
    // <Providers path={false}>
    //     {() => <App />}
    // </Providers>
);

export {};