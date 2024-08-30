/**
 * SongListNotFound component
 * 
 * @returns {JSX.Element}
 *   The SongListNotFound component
 */
export function SongListNotFound() {
    return (
        <div className='w-full h-full flex justify-center items-center'>
            {/* No songs found text */}
            <p className='text-[#ffffff90] text-lg'>No songs found</p>
        </div>
    )
}