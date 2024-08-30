import { useSidebarStore, useSongsStore } from '@Store';
import { MusicPlayer, Profile, Sidebar, SongLists } from '@Components';

function App() {
  // Get the showSideBar and setShowSideBar functions from the sidebar store
  const { showSideBar, setShowSideBar } = useSidebarStore((state) => state);

  // Get the current song from the songs store
  const { currentSong } = useSongsStore((state) => state);

  {/* The main app container */ }
  return (
    <div className='relative w-full h-full flex justify-between items-start origin-top-left' style={{ background: currentSong ? `linear-gradient(to bottom right, ${currentSong?.accent}, black)` : '#121212' }}>
      {/* The overlay when the sidebar is open */}
      <div className={`transition-all duration-300 lg:hidden ${showSideBar ? "fixed h-screen w-screen bg-black/70 backdrop-blur-sm block z-40" : ""}`} onClick={() => setShowSideBar(false)}></div>
      {/* The profile component */}
      <Profile />
      {/* The song lists component */}
      <SongLists />
      {/* The music player component */}
      <MusicPlayer />
      {/* The sidebar component for small screens */}
      <Sidebar />
    </div>
  )
}

export default App