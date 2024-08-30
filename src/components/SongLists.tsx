import { useState } from 'react';
import { useTabStore } from '@Store';
import { useFetchSongs } from '@Hooks/useFetchSongs';
import { EMPTY_STR, TAB_TOP_TRACKS } from '@Constants';
import { SearchInput, SongItem, SongListError, SongListLoader, SongListNotFound, TabsHeader } from '@Components';

/**
 * SongLists component
 * @param {object} props - Component props
 * @param {boolean} [props.sidebarDisplay=false] - Whether the sidebar should be displayed or not
 * @returns {JSX.Element} - The SongLists component
 * @description
 *   This component renders a list of songs based on the active tab
 *   The active tab is determined by the useTabStore hook
 *   The songs are fetched using the useFetchSongs hook
 *   The songs are filtered based on the search query
 *   The filtered songs are rendered as a list of SongItem components
 *   The component also renders a TabsHeader and a SearchInput component
 */
export function SongLists({ sidebarDisplay = false }: { sidebarDisplay?: boolean }) {
    // Gets the active tab from the tab store
    const { activeTab } = useTabStore((state) => state);

    // Fetches the songs from the API and stores the result in the songs state
    // The isLoading state is used to show a loading indicator while the songs are being fetched
    // The error state is used to show an error message if there is an error fetching the songs
    const { songs, isLoading, error } = useFetchSongs();

    // Stores the search query in the searchQuery state
    // The searchQuery is used to filter the songs in the SongLists component
    const [searchQuery, setSearchQuery] = useState(EMPTY_STR);


    // Filters the songs list based on the search query
    // The filter function checks if the song name or artist contains the search query
    // The search query is converted to lowercase to make the search case-insensitive
    const filteredSongsList = songs.filter(song =>
        // Checks if the song name contains the search query
        song?.name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
        // Checks if the song artist contains the search query
        song?.artist?.toLowerCase().includes(searchQuery?.toLowerCase())
    );

    // filteredSongsList is the list of songs filtered by the search query
    // We separate the songs into two lists: forYouSongs and topTracks
    const forYouSongs = filteredSongsList;
    // topTracks are the songs that are marked as top tracks
    const topTracks = filteredSongsList.filter(song => song?.top_track);
    // renderSongList is the list of songs that will be rendered
    // It is determined by the active tab
    // If the active tab is TAB_TOP_TRACKS, renderSongList is set to topTracks
    // Otherwise, renderSongList is set to forYouSongs
    const renderSongList = activeTab === TAB_TOP_TRACKS ? topTracks : forYouSongs;

    return (
        <div className={`song-lists h-screen w-full pb-0 ${sidebarDisplay ? "block p-0" : "p-6 pt-8 max-w-[31%] hidden"} lg:block text-left`}>
            {/* Renders the tabs header component */}
            <TabsHeader />
            {/* Renders the search input component with the search query and a callback function to update the search query */}
            <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            {/* Renders the list of songs with a nested structure */}
            <ul className='w-full mt-4 lg:mt-5 flex flex-col gap-1.5 justify-start items-start h-[75vh] lg:h-[81vh] overflow-auto'>
                {
                    /* If the songs are loading, render the SongListLoader component */
                    isLoading
                        ? <SongListLoader />
                        /* If there is an error fetching the songs, render the SongListError component */
                        : error
                            ? <SongListError />
                            /* If the songs list is not empty, render the songs with the SongItem component */
                            : renderSongList?.length > 0
                                ? renderSongList?.map((song, index) => (
                                    <SongItem key={index} song={song} />
                                ))
                                /* If the songs list is empty, render the SongListNotFound component */
                                : <SongListNotFound />
                }
            </ul>
        </div>
    )
}