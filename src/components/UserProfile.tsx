import ProfileImg from '@Images/image.png';

/**
 * UserProfile component
 * @param {{ width?: number }} props - Component props
 * @param {number} [props.width] - The width of the component
 * @returns {JSX.Element} - The component
 * @description
 *   This component renders a user profile image with a rounded-full class
 *   The width of the component can be specified using the width prop
 *   The image is rendered with a class name of w-full h-full select-none object-contain
 *   The image is not draggable
 */
export function UserProfile({ width, ...props }: { width?: number | string, }) {
    return (
        <div className={`${width} rounded-full`} {...props}>
            <img
                src={ProfileImg}
                alt='profile'
                className='w-full h-full select-none object-contain'
                draggable={false}
            />
        </div>
    )
}