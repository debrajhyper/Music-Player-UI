import SearchIcon from '@Images/search.svg';

/**
 * SearchInput component
 * @description
 *   A search input component that renders a search input with a search icon
 *   The component is a flex container with two parts:
 *     - A search input with a placeholder and a value
 *     - A search icon
 *   The component also accepts a callback function to update the search query
 *   when the user types in the search input
 * @param {Object} props - The props object
 * @param {string} props.searchQuery - The search query
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setSearchQuery - The callback function to update the search query
 * @returns {JSX.Element} The SearchInput component
 */
export function SearchInput({ searchQuery, setSearchQuery }: { searchQuery: string, setSearchQuery: React.Dispatch<React.SetStateAction<string>> }) {
    return (
        <div className='flex justify-between items-center w-full bg-[#ffffff15] rounded-lg py-2 px-4 mt-3 lg:mt-6'>
            {/* Search input with a placeholder and a value */}
            <input
                type='search'
                placeholder='Search Song, Artist'
                className='w-full bg-transparent border-none outline-none'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* Search icon */}
            <img src={SearchIcon} alt='search' className='w-fit h-5' />
        </div>
    )
}