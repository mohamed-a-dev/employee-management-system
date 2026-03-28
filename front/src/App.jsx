import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useSidebar } from "./context/SidebarContext";
import Navbar from "./components/Navbar";


export default function App() {
  const { showSidebar } = useSidebar();

  return (
    <section className={`overflow-hidden md:overflow-visible grid ${showSidebar ? 'grid-cols-[100%_0%] md:grid-cols-[250px_1fr]' : 'grid-cols-[0%_1fr]'}`}>
      <div className={`${showSidebar ? '-left-[calc(100%+40px)] md:left-0' : 'left-0'}  fixed w-screen h-screen top-0 md:w-auto md:h-auto z-101 md:relative`}>
        <Sidebar />
      </div>

      <div>
        <Navbar />
        <Outlet />
      </div>
    </section>
  );
}