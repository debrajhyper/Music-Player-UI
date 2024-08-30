import { create } from "zustand";

/**
 * This is the sidebar store.
 * It has two properties: showSideBar and toggleSideBar.
 * showSideBar is a boolean that indicates whether the sidebar is visible or not.
 * toggleSideBar is a function that toggles the value of showSideBar.
 * The function takes no arguments and returns void.
 * The function is used to toggle the visibility of the sidebar.
 */
export const useSidebarStore = create<SidebarStore>((set) => ({
    showSideBar: false,
    /**
     * Setter for showSideBar.
     * Takes a boolean as an argument and sets the value of showSideBar to that value.
     * Returns void.
     */
    setShowSideBar: (value: boolean) => set({ showSideBar: value }),
    /**
     * Toggle the visibility of the sidebar.
     * Takes no arguments and returns void.
     * Toggles the value of showSideBar.
     */
    toggleSideBar: () => set((state: { showSideBar: boolean }) => ({ showSideBar: !state.showSideBar })),
}))