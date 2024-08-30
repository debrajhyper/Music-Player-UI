import { create } from "zustand";

/**
 * Songs store
 * @remarks
 * This store contains the state of the songs list, the current song, the play status, the current time and the duration of the current song.
 */
export const useSongsStore = create<SongsStore>((set) => ({
    /**
     * The list of songs
     * @type {Song[]}
     */
    songs: [],
    /**
     * The current song
     * @type {Song | null}
     */
    currentSong: null,
    /**
     * Whether the player is playing or paused
     * @type {boolean}
     */
    isPlaying: false,
    /**
     * The current time of the player
     * @type {number}
     */
    currentTime: 0,
    /**
     * The duration of the current song
     * @type {number}
     */
    duration: 0,
    /**
     * Sets the list of songs
     * @param {Song[]} value - The list of songs
     */
    setSongs: (value: Song[]) => set((state) => ({ ...state, songs: value })),
    /**
     * Sets the current song
     * @param {Song} value - The current song
     */
    setCurrentSong: (value: Song) => set((state) => ({ ...state, currentSong: value })),
    /**
     * Sets the play status
     * @param {boolean} value - Whether the player is playing or paused
     */
    setIsPlaying: (value: boolean) => set((state) => ({ ...state, isPlaying: value })),
    /**
     * Sets the current time
     * @param {number} value - The current time
     */
    setCurrentTime: (value: number) => set((state) => ({ ...state, currentTime: value })),
    /**
     * Sets the duration of the current song
     * @param {number} value - The duration of the current song
     */
    setDuration: (value: number) => set((state) => ({ ...state, duration: value })),
}));