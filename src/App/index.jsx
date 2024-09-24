import React from 'react';
// import { useUtilityStore } from 'app/utilities/store/utilityStore';
// import { useConfirm } from 'app/ConfirmProvider';
// import { queries, paths } from 'app/utilities/queries';
// import * as federation from 'federation_provider';
// import OpenFitness from 'openfitness/App';
import Button from 'tester/Button';
// import CtfButton from 'app/CherrytopFramework';
// const App = React.lazy(() => import('app/App'));
// const QueryWrapper = React.lazy(() => import('app/QueryWrapper'));
// const ReusableTable = React.lazy(() => import('app/ReusableTable'));
// const ChatBox = React.lazy(() => import('app/ChatBox'));
// const Button = React.lazy(() => import('federation_provider/Button'));

// const OpenFitness = React.lazy(() => import('openfitness/App'));
const graphQueries = {
    profile: {
        query: `
            query ExampleQuery {

                profile {
                    id
                    created_at
                    age
                    height
                    weight
                    goal
                    exercise
                    user_aid
                    # tdee
                    # bmr
                }
            }
        `,
    }
};

const App1 = () => {
    return (
        <div>
            <h1>Webpack + React MF app 2</h1>
            <Button />
            {/* <CtfButton /> */}
        </div>
    )
};

const App2 = () => {
    const utilityStore = useUtilityStore();
    const confirm = useConfirm();
    // console.log("Button: ", federation.Button);
    // React.useEffect(() => {
    //     (async () => {
    //         // const response = await fetch(paths.host + "/graphql", {
    //         const response = await fetch("http://localhost:4000", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(graphQueries.profile.query),
    //         });

    //         const data = await response.json();
    //         console.log("data: ", data);
    //     })();
    // }, []);
    return (
        <div>
            <h1>Hello, Webpack + React! MF 2</h1>
            <button onClick={() => utilityStore.createAlert("success", "Test, Alert!")}>
                Test Alert
            </button>
            <button onClick={() => confirm.open({
                message: "Test, Confirm!",
                onConfirm: (answer, resolve) => {
                    if (answer) utilityStore.createAlert("success", "Tested. Confirmed, Alert!")
                    else utilityStore.createAlert("error", "Test Failed, Alert!");

                    resolve(answer);
                }
            })}>
                Test Confirm
            </button>
            <Button />
            <React.Suspense fallback="Loading...">
                <App />
            </React.Suspense>
            <ChatBox />
            {/* <React.Suspense fallback="Loading...">
                <OpenFitness />
            </React.Suspense> */}
            {/* <React.Suspense fallback="Loading...">
                <ChatBox />
            </React.Suspense>
            <React.Suspense fallback="Loading...">
        </React.Suspense> */}
            <QueryWrapper 
                path={(paths) => {
                    console.log("QueryWrapper.paths: ", paths);
                    return "";
                }}
                options={{ 
                    method: "post", 
                    payload: graphQueries.profile, 
                    graphql: true 
                }}
            >
                {({ data }) => (
                    <div>
                        <h2>Query Wrapper</h2>
                        <pre>{JSON.stringify(data, null, 2)}</pre>
                    </div>
                )}
            </QueryWrapper>
            {/* <QueryWrapper 
                // path={(paths) => {
                //     console.log("QueryWrapper.paths: ", paths);
                //     return "";
                // }}
                // options={{ 
                //     method: "post", 
                //     payload: graphQueries.profile, 
                //     graphql: true 
                // }}
            >
                {({ data }) => (
                    <div>
                        <h2>Query Wrapper</h2>
                        <pre>{JSON.stringify(data, null, 2)}</pre>
                    </div>
                )}
            </QueryWrapper> */}
            {/* <React.Suspense fallback="Loading...">
                <QueryWrapper path={({ schema }) => schema}>
                    {({ data }) => (
                        <div>
                            <h2>Query Wrapper</h2>
                            {data && data.map((table) => (
                                <QueryWrapper path={(paths) => (paths.database + table.table)}>
                                    {(rows) => (
                                        <ReusableTable
                                            title={table.table}
                                            rows={rows ? rows.data : []}
                                            columns={table.columns}
                                        />
                                    )}
                                </QueryWrapper>
                            ))}
                            <pre>{JSON.stringify(data, null, 2)}</pre>
                        </div>
                    )}
                </QueryWrapper>
            </React.Suspense> */}
        </div>
    );
};

export default App1;
