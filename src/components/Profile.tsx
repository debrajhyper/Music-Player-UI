import { SpotifyIcon, UserProfile } from "@Components";

/**
 * Profile component
 * @returns {JSX.Element}
 * @description
 *   Profile component that renders a Spotify icon and a user profile icon
 *   with a class name of `w-full max-w-64 p-6`
 *   It is hidden on mobile devices (lg) and only shown on desktop (lg)
 *   The icons are rendered vertically with a gap of 6px
 */
export function Profile() {
    return (
        <div className='min-h-screen hidden lg:flex flex-col justify-between items-start w-full max-w-64 p-6'>
            {/* Spotify icon with width of 32px */}
            <SpotifyIcon width={32} />
            {/* User profile icon with width of 12px */}
            <UserProfile width={12} />
        </div>
    )
}