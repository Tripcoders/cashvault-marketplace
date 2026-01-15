
import React from 'react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  return (
    <aside className={`h-full bg-sidebar-dark border-r border-white/5 flex flex-col transition-all duration-300 ease-in-out z-40 ${collapsed ? 'w-20' : 'w-72'}`}>
      <div className="p-6 flex flex-col h-full">
        {/* Logo Section */}
        <div className="flex items-center gap-3 mb-10 overflow-hidden">
          <div className="min-w-[40px] h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
            <span className="material-symbols-outlined font-bold">account_balance_wallet</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <h1 className="text-white text-xl font-extrabold tracking-tight whitespace-nowrap">CashVault</h1>
              <p className="text-slate-500 text-[9px] font-bold uppercase tracking-[0.2em] whitespace-nowrap">Digital Asset Marketplace</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          <NavItem icon="dashboard" label="Marketplace" active collapsed={collapsed} />
          <NavItem icon="receipt_long" label="My Orders" collapsed={collapsed} />
          <NavItem icon="account_balance_wallet" label="Add Funds" collapsed={collapsed} />
          <NavItem icon="support_agent" label="Support" collapsed={collapsed} />
        </nav>

        {/* Filters - Only visible when expanded */}
        {!collapsed && (
          <div className="mt-12 space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
            <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-[0.2em] px-3">Advanced Filters</p>
            <div className="px-3 space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Price Range</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-2.5 text-xs text-slate-500">$</span>
                    <input className="w-full bg-white/5 border border-white/10 rounded-lg px-6 py-2 text-xs text-white focus:ring-primary focus:border-primary outline-none" placeholder="Min" />
                  </div>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-2.5 text-xs text-slate-500">$</span>
                    <input className="w-full bg-white/5 border border-white/10 rounded-lg px-6 py-2 text-xs text-white focus:ring-primary focus:border-primary outline-none" placeholder="Max" />
                  </div>
                </div>
              </div>
              <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-all">Apply Filter</button>
            </div>
          </div>
        )}

        <div className="mt-auto pt-6 border-t border-white/5">
          <NavItem icon="logout" label="Sign Out" collapsed={collapsed} className="text-slate-500 hover:text-rose-500" />

          <button
            onClick={onToggle}
            className="mt-4 w-full flex items-center justify-center p-2 rounded-xl text-slate-500 hover:bg-white/5 transition-all"
          >
            <span className={`material-symbols-outlined transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}>
              keyboard_double_arrow_left
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};

const NavItem = ({ icon, label, active = false, collapsed = false, className = "" }: { icon: string, label: string, active?: boolean, collapsed?: boolean, className?: string }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group ${active ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-slate-500 hover:text-white hover:bg-white/5'} ${className}`}>
    <span className={`material-symbols-outlined text-2xl transition-transform group-hover:scale-110 ${active ? 'fill-1' : ''}`}>{icon}</span>
    {!collapsed && <p className="text-sm font-black whitespace-nowrap">{label}</p>}
  </div>
);

export default Sidebar;
