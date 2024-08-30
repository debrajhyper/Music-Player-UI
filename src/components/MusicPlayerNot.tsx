import discImg from '@Images/disc.svg';

/**
 * MusicPlayerNot component
 * @returns The MusicPlayerNot component
 */
export function MusicPlayerNot() {
    return (
        <div className='w-full h-full flex flex-col justify-center items-center user-select-none'>
            {/* Disc image */}
            <img src={discImg} alt='disc' className='w-36 h-auto' draggable={false} />
            {/* Text */}
            <p className='text-[#ffffff90] opacity-40 text-xl font-bold mt-4'>
                {/* Select a song to play text */}
                Select a song to play
            </p>
        </div>
    )
}