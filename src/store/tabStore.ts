import { create } from "zustand";
import { TAB_FOR_YOU } from "@Constants";

/**
 * useTabStore is a zustand store that contains the active tab name
 * @property {string} activeTab - the name of the active tab
 * @property {(value: string) => void} setActiveTab - sets the activeTab property to the given value
 */
export const useTabStore = create<TabStore>((set) => ({
    /**
     * the name of the active tab
     * @type {string}
     */
    activeTab: TAB_FOR_YOU,
    /**
     * sets the activeTab property to the given value
     * @param {string} value - the new value for activeTab
     * @returns {void}
     */
    setActiveTab: (value: string) => set({ activeTab: value }),
}))