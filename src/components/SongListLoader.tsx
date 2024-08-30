/**
 * This component renders a list of 9 loading items
 * Each item has a flex container with three parts:
 * - A rounded square with a width and height of 10px (12px on medium and large screens)
 * - A flex column with two parts:
 *   - A rounded rectangle with a height of 4px and a width of 40px
 *   - A rounded rectangle with a height of 2px and a width of 32px
 * - A rounded rectangle with a height of 4px and a width of 20px
 */
export function SongListLoader() {
    return (
        Array.from({ length: 8 }).map((_, index) => (
            <li key={index} className="w-full flex justify-between items-center rounded-lg py-2 md:py-3 px-3 bg-neutral-800/70 animate-pulse">
                {/* Container with song information */}
                <div className="flex items-center">
                    {/* Song image */}
                    <div className="w-10 h-10 md:w-12 md:h-12 mr-4 rounded-full bg-neutral-700/70"></div>
                    {/* Song information */}
                    <div className="flex flex-col gap-2">
                        {/* Song name */}
                        <div className="h-4 w-40 bg-neutral-700/70 rounded"></div>
                        {/* Song artist */}
                        <div className="h-2 w-32 bg-neutral-700/70 rounded"></div>
                    </div>
                </div>
                {/* Song duration */}
                <div className="h-4 w-20 bg-neutral-700/70 rounded"></div>
            </li>
        ))
    )
}