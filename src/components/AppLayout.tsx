import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';
import PriceTicker from './PriceTicker';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-[#0A0E0D] text-[#E8F0EC]">
      <div className="fixed inset-0 pointer-events-none opacity-[0.4]" style={{ background: 'radial-gradient(ellipse at top, rgba(0,229,153,0.08), transparent 60%)' }} />
      <div className="relative">
        <TopNav />
        <PriceTicker />
        <main className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}