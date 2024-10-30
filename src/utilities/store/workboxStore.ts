import { create } from "zustand";
//@ts-ignore
import { WebContainer } from '@webcontainer/api';
import { files } from '../files/files';

type WorkboxStoreType = {
    webcontainerInstance: WebContainer | null;
    activeFile: string;
    fileExplorerValue: string;
    liveFiles: any;
    terminalText: string[];
    terminalInput: string;
    chatMode: "chat" | "command";
    setWebcontainerInstance: (instance: WebContainer | null) => void;
    setActiveFile: (activeFile: string) => void;
    setFileExplorerValue: (fileExplorerValue: string) => void;
    setLiveFiles: (liveFiles: any) => void;
    setTerminalText: (terminalText: string) => void;
    setTerminalInput: (terminalInput: string) => void;
    setChatMode: (chatMode: WorkboxStoreType["chatMode"]) => void;
    clearTerminal: () => void;
};

const useWorkboxStore = create<WorkboxStoreType>((set) => ({
    webcontainerInstance: null,
    activeFile: 'index.js',
    fileExplorerValue: files['index.js'].file.contents,
    liveFiles: files,
    terminalText: [],
    terminalInput: '',
    chatMode: "chat",
    setWebcontainerInstance: (instance: WebContainer | null) => set({ webcontainerInstance: instance }),
    setActiveFile: (activeFile: string) => set({ activeFile }),
    setFileExplorerValue: (fileExplorerValue: string) => set({ fileExplorerValue }),
    setLiveFiles: (liveFiles: any) => set({ liveFiles }),
    setTerminalText: (terminalText: string) => set((old: WorkboxStoreType) => ({ terminalText: [...old.terminalText, terminalText] })),
    setTerminalInput: (terminalInput: string) => set({ terminalInput }),
    setChatMode: (chatMode: WorkboxStoreType["chatMode"]) => set({ chatMode }),
    clearTerminal: () => set({ terminalText: [] })
}));

export default useWorkboxStore;
export { useWorkboxStore };

type FilesType = typeof files;
export type { WorkboxStoreType, FilesType };