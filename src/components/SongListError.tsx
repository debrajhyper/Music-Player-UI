/**
 * SongListError component
 *
 * @returns {JSX.Element}
 *
 * This component renders an error message with a retry button
 * when the song list can't be loaded.
 */
export function SongListError() {
    return (
        <div className='w-full h-full flex flex-col justify-center items-center text-center'>
            <p className='text-[#ffffff90] text-xl font-bold'>Oops! Something went wrong</p>
            <button className='text-white text-base mt-5 font-bold border-none bg-[#ffffff30] py-2 px-4 rounded-md' onClick={() => window.location.reload()}>Retry</button>
        </div>
    )
}