import { useSongsStore } from "@Store";
import { formatDuration } from "@Utils";
import { API_SONG_COVER_IMG_URL } from "@Constants";

/**
 * Song item component
 * @param {Song} song - The song object
 * @returns {JSX.Element} - The song item component
 */
export function SongItem({ song }: { song: Song }) {
    const { name, artist, cover, duration } = song
    const { currentSong, setCurrentSong } = useSongsStore((state) => state);

    return (
        <li
            className={`${song?.id === currentSong?.id ? 'bg-[#ffffff10]' : 'bg-transparent'} flex justify-between items-center rounded-lg py-2 md:py-3 px-3 w-full cursor-pointer hover:bg-[#ffffff10] transition-all ease-in-out duration-300`} onClick={() => setCurrentSong(song)}>
            <div className='flex items-center'>
                {/* Song cover image */}
                <img
                    src={`${API_SONG_COVER_IMG_URL}${cover}`}
                    alt={name}
                    loading="lazy"
                    draggable={false}
                    className='w-10 h-10 md:w-12 md:h-12 mr-4 rounded-full select-none'
                />
                {/* Song information */}
                <div>
                    <p className='text-base md:text-lg leading-6'>{name}</p>
                    <p className='text-[#ffffff60] text-xs md:text-sm leading-6'>{artist}</p>
                </div>
            </div>
            {/* Song duration */}
            <span className='text-[#ffffff60] text-base md:text-lg leading-6'>
                {formatDuration(duration)}
            </span>
        </li>
    )
}