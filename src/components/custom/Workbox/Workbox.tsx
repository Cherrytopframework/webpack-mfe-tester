
import {  useState } from 'react';
import { Button, Chip, TextField } from '@mui/material';
import { Grid } from '../../Mui/Layout';
import BasicBreadcrumbs from '../../Mui/BasicBreadcrumbs/BasicBreadcrumbs';
import TreeView from '../../Mui/TreeView';
import QueryWrapper from '../wrappers/QueryWrapper';
import { Styled } from './Workbox.styles';
import { useUtilityStore, useWorkboxStore } from '../../../utilities/store';
import { files } from '../../../utilities/files/files';
import { workboxScripts } from './workbox.scripts';
import { client } from '../../../utilities/api';
// import ShadButton from "shadui/Button";

const Workbox = (props: any) => {
    const workboxStore = useWorkboxStore();
    const utilityStore = useUtilityStore();
    console.log("Workbox: ", props);

    const [commandLineContent, _] = useState('');
    const [activeFile, __] = useState('index.js'); // ./framework/[frameworkProjects]
    const [fileExplorerValue, setFileExplorerValue] = useState(files[activeFile as keyof typeof files].file.contents);
    const [liveFiles, setLiveFiles] = useState(files);
    const addFile = (
        file: { id: string; file: { contents: string; }; }
    ) => Object.keys(liveFiles).includes(file.id) 
        ? utilityStore.createAlert("error", "File already exists!")
        : setLiveFiles({ ...liveFiles, [file.id]: file });

    // const handleCommand = (command: string) => {
    //     return ({
    //         cd: () => {
    //             utilityStore.createAlert("success", "Directory changed successfully!");
    //         }
    //     }[command])
    // }

    // const editFile = (
    //     file: { id: string; file: { contents: string; }; }
    // ) => setLiveFiles({ ...liveFiles, [file.id]: file });

    // const runProcess = ({command}: { command: string }) => {
    //     const [commandKey, ...args] = command.split(' ');
    //     console.log("runProcess: ", command, commandKey, args);

    //     utilityStore.createAlert("success", "Process started successfully!");
    // };

    const handleFileExplorerChange = (event: any) => {
        setFileExplorerValue(event.target.value);
        setLiveFiles((old: any) => ({ 
            ...old, 
            [activeFile]: { 
                ...old[activeFile], 
                file: { 
                    ...old[activeFile].file, 
                    contents: event.target.value 
                }
            } 
        }));
    };

    return (
        <Grid container sx={{ mt: 10 }}>
            <Grid size={3}>
                {/* <ShadButton>This is ShadUI button!</ShadButton> */}
                <Chip label="File Explorer" />
                <TreeView 
                    menu={props.files} 
                    onClick={async (menuItem) => {
                        console.log("treeview.onClick: ", menuItem)
                        const response = await client.get("/readFile?file=/aichat/src/App/App.tsx")
                        console.log("response: ", response);
                        // set the file explorer value
                    }} 
                />
                <Grid container>
                    <button onClick={() => addFile({ id: '.env', file: { contents: 'REACT_APP_SECRET=1234567890' }}) }>Add File</button>
                </Grid>
            </Grid>
            <Grid size={5}>
                <BasicBreadcrumbs links={[{ name: activeFile, path: `/${activeFile}` }]} />
                <Chip label="Editor" />
                <Styled.Textarea
                    id="textarea"
                    value={fileExplorerValue}
                    onChange={handleFileExplorerChange}
                />
                <Chip label="Terminal" />
                <Styled.Textarea
                    id="textarea"
                    value={commandLineContent}
                    onChange={() => {}}
                    sx={{ height: "100px" }}
                />
                {/* Write */}
                <Chip label="Input" />
                <TextField
                    // @ts-ignore
                    label={String.capFirst(workboxStore.chatMode)}
                    value={workboxStore.terminalInput}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => workboxStore.setTerminalInput(event.target.value)}
                    fullWidth
                    InputProps={{
                        startAdornment: <>@michaelwoodward/framework/: </>,
                        endAdornment: (
                            <Button 
                                variant="text" 
                                onClick={(e) => workboxScripts.handleSubmit(e, workboxStore)}
                            >
                                {workboxStore.chatMode === "chat" ? "Send" : "Run"}
                            </Button>
                        ),
                    }}
                />
            </Grid>
            <Grid size={4}>
                <iframe src="http://localhost:8080" style={{ minHeight: 600, height: "80vh", width: '100%'}} />
            </Grid>
        </Grid>
    );
};

const WithFileExplorer = () => {
    return (
        <QueryWrapper path={({ framework }) => framework}>
            {({ data }) => data && <Workbox files={data?.fileStructure}/>}
        </QueryWrapper>
    );
};

export default WithFileExplorer;