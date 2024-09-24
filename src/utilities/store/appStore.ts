import { create } from "zustand";

interface ViewType {
    title: string;
};
interface AppStoreType {
    view: ViewType
    setView: (view: AppStoreType["view"]) => void;
};

const useAppStore = create<AppStoreType>((set) => ({
    view: {
        title: "Home",
        id: "2a822d5e-ac09-4df3-9981-588809928086"
    },
    setView: (view) => set(() => ({ view })),
}));

export { useAppStore }
export type { AppStoreType, ViewType }