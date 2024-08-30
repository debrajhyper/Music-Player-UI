import { ChangeEvent, CSSProperties, useEffect, useRef, useState } from 'react';
import '@Styles/progressBar.css';
import { API_SONG_COVER_IMG_URL } from '@Constants';
import sidebarOpenImg from '@Images/sidebar_open.svg';
import { useSidebarStore, useSongsStore } from '@Store';
import { MusicControls, MusicPlayerNot, UserProfile } from '@Components';

/**
 * MusicPlayer component
 * @returns {JSX.Element}
 * @description
 *   Music player component that renders a music player with a seek bar, play/pause button, and volume control
 *   It is hidden on mobile devices (lg) and only shown on desktop (lg)
 *   The music player is rendered with a nested structure with a flex container and a nested flex container
 *   The first flex container contains the player controls and the second flex container contains the seek bar and the player status
 */
export function MusicPlayer() {
    const { currentSong, isPlaying, currentTime, duration, setCurrentTime, setIsPlaying, setDuration } = useSongsStore((state) => state);
    const { setShowSideBar } = useSidebarStore((state) => state);
    // Volume state and setter for the audio element
    // The volume is a number between 0 and 1
    const [volume, setVolume] = useState<number>(1);

    // Reference to the audio element
    // This is used to play/pause the audio and update the volume
    const audioRef = useRef<HTMLAudioElement>(new Audio());

    /**
     * Handles the seek bar change event
     * @param event The event emitted when the seek bar is changed
     */
    const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
        /**
         * Gets the value of the seek bar
         * @type {number}
         */
        const seekValue = parseInt(event.target.value, 10);

        /**
         * Calculates the time to seek to based on the seek bar value
         * @type {number}
         */
        const seekTime = (seekValue / 100) * (audioRef.current?.duration || 0);

        /**
         * If the seek time is finite, sets the current time of the audio element to the seek time
         * and updates the current time state
         */
        if (isFinite(seekTime)) {
            audioRef.current.currentTime = seekValue;
            setCurrentTime(seekValue);
        }
    };
    useEffect(() => {
        // Pause the audio element if it is playing
        // This is done to prevent multiple audio elements from playing at the same time
        if (currentSong && audioRef.current) {
            audioRef.current.pause();
        }

        // Check if the current song has changed
        // If it has, load the new audio URL into the audio element
        // and play the audio
        if (currentSong) {
            const audioUrl = currentSong?.url;
            audioRef.current.src = audioUrl;
            audioRef.current.load();
            audioRef.current.volume = volume;
            audioRef.current.play()
                .then(() => {
                    // If the audio is playing successfully, set the isPlaying state to true
                    setIsPlaying(true);
                    // Set the duration of the current song to the duration of the audio element
                    setDuration(audioRef.current.duration);
                })
                .catch(error => {
                    console.error("Error playing audio:", error);
                    // If there is an error playing the audio, set the isPlaying state to false
                    setIsPlaying(false);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSong]);

    useEffect(() => {
        // Create an interval that updates the current time state with the
        // current time of the audio element every 0 milliseconds
        const interval = setInterval(() => {
            if (audioRef.current && isPlaying) {
                // If the audio element exists and is playing, update the current time state
                setCurrentTime(audioRef.current.currentTime);
            }
        }, 0);

        // When the component unmounts, clear the interval
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying]);

    return (
        <div className='w-full h-screen flex-col items-center justify-center m-auto p-6'>
            {
                /* Show the sidebar toggle button on mobile devices */
                /* Hidden on desktop */
            }
            <div className='flex justify-between items-center lg:hidden'>
                <button className='border-none bg-transparent outline-none cursor-pointer' onClick={() => setShowSideBar(true)}>
                    <img src={sidebarOpenImg} alt='sidebar' loading="lazy" className='w-fit h-8 text-white fill-white' draggable={false} />
                </button>
                <UserProfile width='w-10' />
            </div>
            {
                /* If there is a current song, render the song information */
                currentSong
                    ? (
                        <div className='w-full max-w-460 mt-4 lg:mt-14 mx-auto flex flex-col gap-0 text-white'>
                            <div>
                                <h1 title={currentSong?.name} className='text-3xl leading-9 font-bold'>{currentSong?.name}</h1>
                                <p title={currentSong?.artist} className='opacity-60 text-base mt-1 mb-6'>{currentSong?.artist}</p>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <img
                                    src={`${API_SONG_COVER_IMG_URL}${currentSong?.cover}`}
                                    alt={currentSong?.name}
                                    draggable={false}
                                    className='w-full h-80 sm:h-400 lg:h-460 max-w-full max-h-fit rounded-lg'
                                />
                                <div className="flex flex-col items-center w-full">
                                    <input
                                        type="range"
                                        min={0}
                                        value={currentTime}
                                        max={duration}
                                        onChange={handleSeek}
                                        className="w-full mb-4 progressBar"
                                        style={
                                            {
                                                '--value': currentTime,
                                                '--max': duration,
                                            } as CSSProperties
                                        }
                                    />
                                </div>
                            </div>
                            <MusicControls audioRef={audioRef} volume={volume} setVolume={setVolume} />
                        </div>
                    )
                    : /* Otherwise, render the MusicPlayerNot component */
                    <MusicPlayerNot />
            }
        </div>
    )
}