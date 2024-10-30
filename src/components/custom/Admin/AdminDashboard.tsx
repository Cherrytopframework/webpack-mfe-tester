// import React from 'react';
import { Box, Button, Grid2 as Grid } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
// import FolderIcon from '@mui/icons-material/Folder';
import QueryWrapper from "@components/custom/wrappers/QueryWrapper"
import DisplayCard from '@components/Mui/DisplayCard';
import Tabs from '@components/Mui/Tabs';
import TreeView from '@components/Mui/TreeView';
// import Dashboard from '@components/Mui/Dashboard/Dashboard'
import apiConfig from '@api/api.config';
import serverApiSchema from "@api/serverSchema.json";
// import { apiScripts } from '@scripts/api.scripts';

// const isObject = (data: any) => data && (typeof data === "object") && Array.isArray(data);

// const renderAnyData = (data: any) => Object
//     .keys(data)
//     // @ts-ignore
//     .map((key, index) => isObject(data[key])
//         ? Object
//             .keys(data[key])
//             .map((key2, index2) => ({
//                 // Need to turn this into recursive function 
//                 // to map through all the items until there is no 
//                 // more data to map
//                 key: key2, 
//                 value: data[key][key2] 
//             }))
//         : ({
//             "object": data[key] // this is an array
//                 .map((item: any) => ({
//                     // Need to turn this into recursive function 
//                     // to map through all the items until there is no 
//                     // more data to map
//                     key: key2, 
//                     value: data[key][key2] 
//                 })),
//             "string": <p>{data[key]}</p>,
//             "number": <p>{data[key]}</p>
//         }[typeof data[key]] || <pre>{JSON.stringify(data[key])}</pre>));

const VanillaTable = (
    { columns, tableBody }: 
    { columns: string[], tableBody: any }
) => (
    <table>
        <thead>
            <tr>
                {columns.map((column, index) => (
                    <th key={index}>{column}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {tableBody}
        </tbody>
    </table>
);

const AdminDashboard = () => {
    // const handleResponse = async (response: any, cb: any) => {
    //     console.log("handleResponse.cb: ", response)
    //     const result = await apiScripts.getSchema(response);
    //     return cb(result);
    // }
    return (
        <div style={{ margin: "40px 0", padding: "20px", display: "block" }}>
            AdminDashboard
            Check health of servers
            <QueryWrapper 
                options={{ method: 'GET', graphql: true }} 
                path={({ getAppConfigQuery }) => getAppConfigQuery}
            >
                {(response) => response && (
                    <>
                        <pre>{JSON.stringify(response, null, 2)}</pre>
                        {/* {handleResponse(response, (result: any) => (
                            <>{console.log("qWrapper.fn response: ", result, "")}</>
                        ))} */}
                        {/* {handleResponse(response, (result: any) => (
                            <>{console.log("qWrapper.fn response: ", result, "")}</>
                        ))} */}
                    </>
                )}
            </QueryWrapper>
            {/* <Dashboard /> */}
            <Grid container>

                <Grid size={3}>
                    <h3>Framework Directory Structure</h3>
                    <hr />
                    <QueryWrapper path={({ framework }) => framework}>
                        {({ data }) => data && <TreeView menu={data.fileStructure} />}
                    </QueryWrapper>
                </Grid>

                <Grid size={9}>
                    <Tabs 
                        tabs={[
                            { label: "Create Component", path: "/admin/servers" },
                            { label: "Create Route", path: "/admin/health" },
                            { label: "Create App", path: "/admin/databases" },
                        ]}
                        renderContent={() => (
                            <Grid container>
                                <Grid size={6}>
                                    <pre>
                                        <p>Front end api schema</p>
                                        <hr/>
                                        {JSON.stringify(apiConfig.paths, null, 2)}
                                    </pre>
                                </Grid>
                                <Grid size={6}>
                                    <pre>
                                        <p>Backend Api Schema</p>
                                        <hr/>
                                        {JSON.stringify(serverApiSchema, null, 2)}
                                    </pre>
                                </Grid>
                            </Grid>
                        )}
                    />
                </Grid>
                <Grid size={4} sx={{ border: "1px solid #fff", p: 2 }}>
                    <h3>Services</h3>
                    <hr />
                    <QueryWrapper path={({ healthCheck }) => healthCheck}>
                        {({ data }) => data && (
                            <>
                                <VanillaTable 
                                    columns={["Server", "Status", "Up"]}
                                    tableBody={data?.servers && Object
                                        .keys(data.servers)
                                        .map((serverHealthKey, index) => (
                                            <tr key={index}>
                                                <td>{serverHealthKey}</td>
                                                <td>{data.servers[serverHealthKey]?.status}</td>
                                                <td><CircleIcon color={data.servers[serverHealthKey]?.isHealthy ? "success" : "error"} /></td>
                                            </tr>
                                        ))
                                    }
                                />
                                <VanillaTable 
                                    columns={["Databases", "Status", "Up"]}
                                    tableBody={data?.databases && Object
                                        .keys(data.databases)
                                        .map((databaseHealthKey, index) => (
                                            <tr key={index}>
                                                <td>{databaseHealthKey}</td>
                                                <td>{data.databases[databaseHealthKey]?.status}</td>
                                                <td><CircleIcon color={data.databases[databaseHealthKey]?.isHealthy ? "success" : "error"} /></td>
                                            </tr>
                                        ))
                                    }
                                />
                            </>
                        )}
                    </QueryWrapper>
                    <Button>Framework docs</Button>
                    <Button>Api Docs</Button>
                    <Button>Refresh</Button>
                    
                    <Grid>
                        <h3>Database Tables</h3>
                        <hr />
                        <QueryWrapper path={({ schema }) => schema}>
                            {({ data }) => data && (
                                <pre>{JSON.stringify(data, null, 2)}</pre>
                            )}
                        </QueryWrapper>
                    </Grid>
                </Grid>
                <Grid size={8}>
                    <Grid container spacing={2} sx={{ justifyContent: "center", p: 2 }}>
                        <Grid size={12}>
                            <p>Architecture</p>
                            <p>{"Backend"}</p>
                        </Grid>
                        <Grid sx={{display:"flex", justifyContent:"space-between", gap: 2}}>
                            <DisplayCard><div>Name</div></DisplayCard>
                            {/* <DisplayCard 
                                data={(default) => ({ ...default, name: "Server-open" })}
                            >
                                    <div>Name</div>
                            </DisplayCard> */}
                            <DisplayCard><div>Name</div></DisplayCard>
                            <DisplayCard><div>Name</div></DisplayCard>
                        </Grid>
                        <Grid size={12}>
                            <DisplayCard sx={{ margin: "16px 0" }}>name</DisplayCard>
                            <Box>
                                <Button variant="contained" color="primary">
                                    Start
                                </Button>
                                <Button variant="contained" color="primary">
                                    Stop
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ justifyContent: "center", p: 2 }}>
                        <Grid size={12}>
                            <p>Architecture</p>
                            <p>{"Frontend"}</p>
                        </Grid>
                        <Grid size={12}>
                            <DisplayCard sx={{ margin: "16px 0" }}>name</DisplayCard>
                            <Box>
                                <Button variant="contained" color="primary">
                                    Start
                                </Button>
                                <Button variant="contained" color="primary">
                                    Stop
                                </Button>
                            </Box>
                        </Grid>
                        <Grid sx={{display:"flex", justifyContent:"space-between", gap: 2}}>
                            <DisplayCard><div>Name</div></DisplayCard>
                            <DisplayCard><div>Name</div></DisplayCard>
                            <DisplayCard><div>Name</div></DisplayCard>
                            <DisplayCard><div>Name</div></DisplayCard>
                        </Grid>
                        <Grid size={12}>
                            <DisplayCard sx={{ margin: "16px 0" }} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </div>
    )
}

export default AdminDashboard