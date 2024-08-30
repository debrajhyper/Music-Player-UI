import { useSidebarStore } from '@Store';
import { SongLists, SpotifyIcon } from '@Components';
import sidebarCloseImg from '@Images/sidebar_close.svg';

/**
 * Sidebar component
 * @returns {JSX.Element}
 * @description
 *   Sidebar component that renders a sidebar with a Spotify icon, a close button, and a SongLists component
 *   The sidebar is hidden on mobile devices (lg) and only shown on desktop (lg)
 *   The sidebar is rendered with a nested structure with a flex container and a nested flex container
 *   The first flex container contains the Spotify icon and the close button
 *   The second flex container contains the SongLists component
 */
export function Sidebar() {
    const { showSideBar, setShowSideBar } = useSidebarStore((state) => state)
    return (
        <section className={`fixed block lg:hidden top-0 left-0 transition-all ease-in-out duration-10000 ${showSideBar ? 'translate-x-0' : '-translate-x-full'} w-72 h-screen p-2 pt-6 z-50 bg-neutral-900`}>
            <div className='flex justify-between items-center px-3 mb-2'>
                {/* Spotify icon */}
                <SpotifyIcon width={24} />
                {/* Close button */}
                <button className='border-none bg-transparent outline-none cursor-pointer' onClick={() => setShowSideBar(false)}>
                    {/* Close icon */}
                    <img src={sidebarCloseImg} alt='sidebar' className='w-fit h-8 text-white fill-white' draggable={false} />
                </button>
            </div>
            {/* SongLists component */}
            <SongLists sidebarDisplay={true} />
        </section>
    )
}