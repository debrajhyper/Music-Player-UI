import { RefObject } from 'react';
import { useSongsStore } from '@Store';
import prevImg from '@Images/prev.svg';
import nextImg from '@Images/next.svg';
import playImg from '@Images/play.svg';
import pauseImg from '@Images/pause.svg';
import soundImg from '@Images/sound.svg';
import optionsImg from '@Images/options.svg';
import soundOffImg from '@Images/sound_off.svg';

type MusicControlsProps = {
    audioRef: RefObject<HTMLAudioElement>;
    volume: number;
    setVolume: (value: number) => void;
}

/**
 * Music controls component
 * @param {RefObject<HTMLAudioElement>} audioRef The ref of the audio element
 * @param {number} volume The current volume
 * @param {(value: number) => void} setVolume The function to set the volume
 * @returns {JSX.Element} The music controls component
 */
export function MusicControls({ audioRef, volume, setVolume }: MusicControlsProps) {
    const { songs, currentSong, isPlaying, setCurrentSong, setIsPlaying } = useSongsStore((state) => state);

    /**
     * Handles the play button click
     * @remarks
     * This function plays the current audio element if it exists.
     * It also sets the isPlaying state to true if the audio plays successfully
     * and false if there is an error.
     */
    const handlePlay = () => {
        if (audioRef.current) {
            /**
             * Plays the audio element
             * @remarks
             * The play() method returns a promise that resolves if the audio plays successfully
             * and rejects if there is an error.
             */
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                /**
                 * Handles the promise returned by the play() method
                 * @remarks
                 * If the promise resolves, it sets the isPlaying state to true
                 * and logs an error if there is one.
                 * If the promise rejects, it sets the isPlaying state to false
                 * and logs an error if there is one.
                 */
                playPromise
                    .then(() => {
                        setIsPlaying(true);
                    })
                    .catch(error => {
                        console.error("Error playing audio:", error);
                        setIsPlaying(false);
                    });
            }
        }
    };

    /**
     * Handles the pause button click
     * @remarks
     * This function pauses the current audio element if it exists.
     * It also sets the isPlaying state to false.
     */
    const handlePause = () => {
        if (audioRef.current) {
            /**
             * Pause the audio element
             * @remarks
             * The pause() method returns undefined if the audio is paused successfully
             * and throws an error if there is one.
             */
            audioRef.current.pause();
            /**
             * Set the isPlaying state to false
             * @remarks
             * This is done to prevent the audio from playing when the user clicks the play button again
             * without calling the play() method first.
             */
            setIsPlaying(false);
        }
    };

    /**
     * Handles the previous button click
     * @remarks
     * This function finds the index of the current song in the songs array
     * and sets the current song to the previous one in the array.
     * If the current song is the first one in the array, it sets the current song
     * to the last one in the array.
     */
    const handlePrevious = () => {
        if (songs.length === 0) return;
        /**
         * Finds the index of the current song in the songs array
         * @param {Song[]} songs - The array of songs
         * @param {Song} currentSong - The current song
         * @returns {number} The index of the current song in the songs array
         */
        const currentIndex = songs.findIndex(song => song?.id === currentSong?.id);
        /**
         * Calculates the index of the previous song in the array
         * @param {number} currentIndex - The index of the current song in the songs array
         * @returns {number} The index of the previous song in the array
         */
        const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
        /**
         * Sets the current song to the previous one in the array
         * @param {number} prevIndex - The index of the previous song in the array
         */
        setCurrentSong(songs[prevIndex]);
    };

    /**
     * Handles the next button click
     * @remarks
     * This function finds the index of the current song in the songs array
     * and sets the current song to the next one in the array.
     * If the current song is the last one in the array, it sets the current song
     * to the first one in the array.
     */
    const handleNext = () => {
        if (songs.length === 0) return;
        /**
         * Finds the index of the current song in the songs array
         * @param {Song[]} songs - The array of songs
         * @param {Song} currentSong - The current song
         * @returns {number} The index of the current song in the songs array
         */
        const currentIndex = songs.findIndex(song => song?.id === currentSong?.id);
        /**
         * Calculates the index of the next song in the array
         * @param {number} currentIndex - The index of the current song in the songs array
         * @returns {number} The index of the next song in the array
         */
        const nextIndex = (currentIndex + 1) % songs.length;
        /**
         * Sets the current song to the next one in the array
         * @param {number} nextIndex - The index of the next song in the array
         */
        setCurrentSong(songs[nextIndex]);
    };

    /**
     * Handles the volume button click
     * @remarks
     * This function toggles the volume between 0 and 1
     * and updates the volume of the audio element
     */
    const handleVolumeChange = () => {
        if (audioRef.current) {
            /*
             * Toggle the volume between 0 and 1
             * Set the volume of the audio element to the new value
             */
            const newVolume = volume === 1 ? 0 : 1;
            setVolume(newVolume);
            audioRef.current.volume = newVolume;
        }
    };

    return (
        <div className="flex items-center justify-between space-x-4">
            {/*
             * The options button is not functional yet
             * It will be used to display a dropdown menu with options
             * like shuffle, repeat, equalizer, lyrics, etc.
             */}
            <div>
                <button title='options' className="w-11 h-auto rounded-full hover:bg-neutral-700/20">
                    <img src={optionsImg} alt="options" />
                </button>
            </div>
            <div className='flex justify-between items-center space-x-4'>
                {/*
                 * The previous button is used to go to the previous song
                 * in the playlist
                 */}
                <button title='previous' onClick={handlePrevious} className="w-11 h-auto  rounded-full ">
                    <img src={prevImg} alt="prev" />
                </button>
                {/*
                 * The play/pause button is used to play or pause the current song
                 * If the song is playing, the button displays the pause icon
                 * If the song is not playing, the button displays the play icon
                 */}
                {isPlaying ? (
                    <button title='pause' onClick={handlePause} className="w-11 h-auto rounded-full ">
                        <img src={pauseImg} alt="pause" />
                    </button>
                ) : (
                    <button title='play' onClick={handlePlay} className="w-11 h-auto rounded-full ">
                        <img src={playImg} alt="play" />
                    </button>
                )}
                {/*
                 * The next button is used to go to the next song in the playlist
                 */}
                <button title='next' onClick={handleNext} className="w-11 h-auto rounded-full">
                    <img src={nextImg} alt="next" />
                </button>
            </div>
            <div>
                {/*
                 * The volume button is used to toggle the volume between 0 and 1
                 * The volume icon is displayed differently depending on the volume state
                 */}
                <button title='volume' onClick={handleVolumeChange} className="w-11 h-auto rounded-full hover:bg-neutral-700/20">
                    {
                        volume === 0 ? <img src={soundOffImg} alt="sound" /> : <img src={soundImg} alt="sound" />
                    }
                </button>
            </div>
        </div>
    )
}