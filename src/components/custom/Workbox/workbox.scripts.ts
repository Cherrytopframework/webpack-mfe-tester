
import type { WorkboxStoreType } from "../../../utilities/store/workboxStore";
import { client } from "../../../utilities/api";
// import type { WebContainerType } from "../components/Workbox/WorkboxProvider";

export type CommandType = { commandKey: string, [key: string]: any };


export const workboxScripts = {

    // // ** initWebContainer **
    // // ** Starts the web container **
    // initWebContainer: async (
    //     WebContainer: WebContainerType, 
    //     files: FilesType, 
    //     workboxStore: WorkboxStoreType
    // ) => {
    //     // Boot WebContainer
    //     const instance = await WebContainer.boot();
    //     workboxStore.setWebcontainerInstance(instance);
    //     await instance.mount(files);

    //     // Install dependencies
    //     const exitCode = await workboxScripts.installDependencies(instance, workboxStore);
        
    //     if (exitCode) throw new Error('Installation failed');
    //     else return instance;
    // },

    // // ** installDependencies **
    // installDependencies: async (
    //     instance: WebContainerType, 
    //     workboxStore: WorkboxStoreType
    // ) => {
    //     const installProcess = await instance.spawn('npm', ['install']);
    //     installProcess.output.pipeTo(
    //         new WritableStream({
    //             write(data) {
    //                 console.log(data);
    //                 workboxStore.terminalText.push(data);
    //             },
    //         })
    //     );
    //     return installProcess.exit;
    // },

    // // ** startDevServer **
    // startDevServer: async (
    //     instance: WebContainerType, 
    //     iframeRef: RefObject<HTMLIFrameElement>
    // ) => {
    //     await instance.spawn('npm', ['run', 'start']);

    //     // Listen for the server-ready event
    //     instance.on('server-ready', (port: number, url: string) => {
    //         console.log(`Server ready at ${url} on port ${port}`);
    //         if (iframeRef.current) {
    //             iframeRef.current.src = url;
    //         }
    //     });
    // },

    // writeIndexJS: async (
    //     { webcontainerInstance, activeFile, fileExplorerValue }: 
    //     { 
    //         webcontainerInstance: WebContainerType,
    //         activeFile: WorkboxStoreType["activeFile"],
    //         fileExplorerValue: WorkboxStoreType["fileExplorerValue"]
    //     }
    // ) => (webcontainerInstance) && await webcontainerInstance.fs.writeFile(`/${activeFile}`, fileExplorerValue),

    // addFile: async (command: CommandType, workboxStore: WorkboxStoreType) => {
    //     //  utilityStore?.createAlert("error", "File already exists!")
    //     // * Write the file to the WebContainer
    //     const process = await workboxStore.webcontainerInstance.fs.writeFile(
    //         `/${command.command.id}`, 
    //         command.command.file.contents
    //     );
    //     // * if successful, Update the liveFiles explorer state
    //     workboxStore.setLiveFiles((old) => ({ 
    //         ...old.liveFiles, 
    //         [command.command.id]: command.command.file 
    //     }));
    //     console.log("addFile: ", process);
    //     return process;
    // },

    // editFile: async (command: CommandType, workboxStore: WorkboxStoreType) => {
    //     const process = await workboxStore.webcontainerInstance.fs.writeFile(
    //         `/${command.command.id}`, 
    //         command.command.file.contents
    //     );
    //     workboxStore.setLiveFiles((old) => ({
    //         ...old.liveFiles, 
    //         [command.command.id]: command.command.file
    //     }));
    //     return process;
    // },

    // runProcess: async (
    //     {command}: { command: string }, 
    //     webcontainerInstance: WebContainerType, 
    //     setTerminalText: WorkboxStoreType["setTerminalText"]
    // ) => {
    //     const [commandKey, ...args] = command.split(' ');
    //     console.log("runProcess: ", command, commandKey, args);
    //     const installProcess = await webcontainerInstance.spawn(commandKey, args);
    //     // if success and npm i, then write file to package.json
        
    //     installProcess.output.pipeTo(
    //         new WritableStream({
    //             write(data) {
    //                 console.log(data);
    //                 setTerminalText(data);
    //             },
    //         })
    //     );
    //     return installProcess.exit;
    // // },

    // mapCommandsToFunctions: async (commands: CommandType[], workboxStore: WorkboxStoreType) => {
    //     for (const command of commands) {
    //         await new Promise<void>((resolve) => {
    //             setTimeout(() => {
    //                 // @ts-ignore
    //                 console.log("mapCommandsToFunctions: ", command);
    //                 const commandAction = {
    //                     "runProcess": () => workboxScripts.runProcess(
    //                         command as any,
    //                         workboxStore.webcontainerInstance,
    //                         workboxStore.setTerminalText
    //                     ),
    //                     "addFile": () => workboxScripts.addFile(
    //                         command, 
    //                         workboxStore
    //                     ),
    //                     "editFile": () => workboxScripts.editFile(
    //                         command,
    //                         workboxStore
    //                     )
    //                 }[command.commandKey];
    
    //                 if (commandAction) commandAction();
                    
    //                 resolve();
    //             }, 1000);  // half-second delay between commands
    //         });
    //     }
    // },

    handleFileExplorerChange: (value: string, workboxStore: WorkboxStoreType) => {
        const { activeFile } = workboxStore;
        workboxStore.setFileExplorerValue(value);
        workboxStore.setLiveFiles((old: WorkboxStoreType["liveFiles"]) => ({ 
            ...old, 
            [activeFile]: { 
                ...old[activeFile], 
                file: { 
                    ...old[activeFile].file, 
                    contents: value 
                }
            } 
        }));
    },

    handleSubmit: async (e: any, workboxStore: WorkboxStoreType) => {
        e?.preventDefault();

        if (workboxStore.terminalInput === "") return;
        if (workboxStore.terminalInput === "/chat") return workboxStore.setChatMode("chat");
        if (workboxStore.terminalInput === "/command") return workboxStore.setChatMode("command");

        if (workboxStore.chatMode === "command") {
            console.log("handleSubmit.command: ", workboxStore.terminalInput);
            // await workboxScripts.runProcess(
            //     { command: workboxStore.terminalInput }, 
            //     workboxStore.webcontainerInstance, 
            //     workboxStore.setTerminalText
            // );
            const response = (await client.post(
                "/aichat/command", 
                { message: workboxStore.terminalInput }
            )).data;

            console.log("command.response: ", response);
        };

        if (workboxStore.chatMode === "chat") {
            const response = (await client.post(
                "/aichat/convertToCommands", 
                { message: workboxStore.terminalInput }
            )).data;
            // const { commands } = JSON.parse(response);
            const { commands } = response;
            
            console.log("response: ", response, commands);
            // if (commands) workboxScripts.mapCommandsToFunctions(commands, workboxStore);
        };

        // e.target.reset();
        // e.target.focus();
    }

};

const WorkboxScriptsType = typeof workboxScripts;
export type { WorkboxScriptsType };