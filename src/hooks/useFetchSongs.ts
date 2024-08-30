import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useSongsStore } from "@Store";
import { getAudioDuration } from "@Utils";
import { API_SONGS_URL, EMPTY_STR } from "@Constants";

// Define the expected structure of the error response
interface ErrorResponse {
    errors: { message: string }[];
}

/**
 * Fetches songs from the API and updates the songs state
 * @returns An object containing the songs, isLoading, and error
 */
export const useFetchSongs = () => {
    const { songs, setSongs, setCurrentSong } = useSongsStore((state) => state);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | undefined>(EMPTY_STR);

    /**
     * Fetches the songs from the API
     * @returns A promise that resolves when the songs are fetched
     */
    useEffect(() => {
        const fetchSongs = async () => {
            try {
                /**
                 * Makes a GET request to the API to fetch the songs
                 * @returns A response containing the songs data
                 */
                const response = await axios.get(API_SONGS_URL);

                /**
                 * Maps over the songs data and fetches the duration of each song
                 * @returns An array of songs with their durations
                 */
                const songsData = await Promise.all(response?.data?.data?.map(async (song: Song) => {
                    const duration = await getAudioDuration(song?.url) || 0;
                    return { ...song, duration };
                }));

                /**
                 * Updates the songs state with the fetched songs data
                 * @param songsData An array of songs with their durations
                 */
                setSongs(songsData);
                setCurrentSong(songsData[0]);
            } catch (error) {
                /**
                 * Handles any errors that occur while fetching the songs
                 * @param error The error object
                 */
                const { response } = error as AxiosError<ErrorResponse>;
                setError(response?.data?.errors?.[0]?.message);
            } finally {
                /**
                 * Sets isLoading to false after the songs are fetched or an error occurs
                 */
                setIsLoading(false);
            }
        }

        /**
         * Runs the fetchSongs function when the component mounts
         */
        fetchSongs();
    }, [setCurrentSong, setSongs]);

    /**
     * Returns an object containing the songs, isLoading, and error
     */
    return { songs, isLoading, error };
}