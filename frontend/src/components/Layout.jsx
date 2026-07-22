import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Layout() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 ml-64 mt-16 p-6 overflow-auto bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
