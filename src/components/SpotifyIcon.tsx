import logoImg from '@Images/logo.svg';

/**
 * SpotifyIcon component
 * @description
 *   A component that renders a Spotify icon
 *   The icon is rendered with a width of {width} pixels
 *   The icon is rendered with a class name of `w-{width} select-none`
 *   The icon is not draggable
 * @param {number} width - The width of the icon
 * @returns {JSX.Element} - The SpotifyIcon component
 */
export function SpotifyIcon({ width }: { width: number }) {
    return <a href='/'><img src={logoImg} alt='logo' loading='lazy' className={`w-${width} select-none`} draggable={false} /></a>
}