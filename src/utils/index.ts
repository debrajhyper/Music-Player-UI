/**
 * Fetches the duration of an audio file from a given URL
 * @param url The URL of the audio file
 * @returns A promise that resolves with the duration of the audio file, or rejects with an error
 */
export const getAudioDuration = (url: string) => {
    return new Promise((resolve, reject) => {
        // Create a new Audio element
        const audio = new Audio();

        // When the Audio element's loadedmetadata event is fired, resolve the promise with the duration
        audio.addEventListener('loadedmetadata', () => {
            resolve(audio?.duration);
        });

        // If there is an error, reject the promise with the error
        audio.addEventListener('error', (error) => {
            reject(error);
        });

        // Set the source of the Audio element to the given URL
        audio.src = url;
    });
};

/**
 * Formats a given duration in seconds to a string in the format 'mm:ss'
 * @param seconds The duration in seconds
 * @returns A string representing the duration in the format 'mm:ss'
 */
export const formatDuration = (seconds: number | undefined): string => {
    // Return '--:--' if input is not a valid number
    if (typeof seconds !== 'number' || isNaN(seconds)) {
        return '--:--';
    }

    // Calculate minutes and remaining seconds
    // Math.floor rounds down to the nearest whole number
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    // Return the formatted string
    // padStart adds leading zeros to the string if it is less than 2 characters long
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}