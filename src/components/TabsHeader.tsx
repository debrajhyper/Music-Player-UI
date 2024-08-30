import { useTabStore } from '@Store';
import { TAB_FOR_YOU, TAB_TOP_TRACKS } from '@Constants';

/**
 * TabsHeader component
 * @returns {JSX.Element}
 * @description
 *   This component renders a tabs header with two buttons
 *   The buttons are "For You" and "Top Tracks"
 *   The buttons are rendered with a nested structure with a flex container and a nested flex container
 *   The first flex container contains the buttons and the second flex container contains the button text
 *   The buttons are rendered with a style that makes them look like tabs
 *   The active tab is determined by the activeTab state from the useTabStore hook
 *   The active tab is highlighted with an opacity of 1 and the inactive tab is highlighted with an opacity of 0.5
 */
export function TabsHeader() {
    const { activeTab, setActiveTab } = useTabStore((state) => state);

    return (
        <div className='flex gap-10 items-center justify-center lg:justify-start w-full mt-4 lg:mt-0 text-lg md:text-xl lg:text-2xl font-bold'>
            {/* For You button */}
            <button style={{ opacity: activeTab === TAB_FOR_YOU ? "1" : "0.5" }} onClick={() => setActiveTab(TAB_FOR_YOU)}>For You</button>
            {/* Top Tracks button */}
            <button style={{ opacity: activeTab === TAB_TOP_TRACKS ? "1" : "0.5" }} onClick={() => setActiveTab(TAB_TOP_TRACKS)}>Top Tracks</button>
        </div>
    )
}