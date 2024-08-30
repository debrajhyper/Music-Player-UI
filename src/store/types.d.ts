type Song = {
    id: number,
    status: string,
    sort: null,
    user_created: string,
    date_created: string,
    user_updated: string,
    date_updated: string,
    name: string,
    artist: string,
    accent: string,
    cover: string,
    top_track: boolean,
    url: string,
    duration?: number
}

type SongsStore = {
    songs: Song[],
    currentSong: Song | null,
    isPlaying: boolean,
    currentTime: number,
    duration: number,
    setSongs: (value: Song[]) => void,
    setCurrentSong: (value: Song) => void,
    setIsPlaying: (value: boolean) => void,
    setCurrentTime: (value: number) => void,
    setDuration: (value: number) => void
}

type SidebarStore = {
    showSideBar: boolean,
    setShowSideBar: (value: boolean) => void
}

type TabStore = {
    activeTab: string,
    setActiveTab: (value: string) => void
}