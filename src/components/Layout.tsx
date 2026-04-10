import * as React from 'react';
import { 
  Sun, Menu, Globe, ShieldCheck, 
  LayoutDashboard, BookOpen, Settings, 
  HelpCircle, LogOut, X,
  Zap, Flame, Leaf, Sparkles
} from 'lucide-react';
import { Button } from './ui/Button';
import { Language } from '../data/translations';
import { cn } from '../lib/utils';
import { View } from '../lib/storageManager';

interface LayoutProps {
  children: React.ReactNode;
  lang: Language;
  setLang: (lang: Language) => void;
  activeView: View;
  setView: (view: View) => void;
}

export const Layout = ({ children, lang, setLang, activeView, setView }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems: { id: View; icon: React.ReactNode; label: string }[] = [
    { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { id: 'knowledge', icon: <BookOpen size={20} />, label: 'Knowledge Hub' },
    { id: 'solar', icon: <Zap size={20} />, label: 'Solar Tools' },
    { id: 'cooking', icon: <Flame size={20} />, label: 'Cooking' },
    { id: 'ai_helper', icon: <Sparkles size={20} />, label: 'AI Helper' },
  ];

  const handleNavClick = (view: View) => {
    setView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F4F7F9] font-sans text-[#1A1C1E] flex">
      {/* Sidebar - Desktop */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out hidden lg:flex flex-col print:hidden",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#00A1DE] rounded-lg flex items-center justify-center text-white shrink-0">
              <Sun size={20} />
            </div>
            {isSidebarOpen && (
              <span className="font-bold text-lg tracking-tight whitespace-nowrap">
                CEH <span className="text-[#20603D]">Rwanda</span>
              </span>
            )}
          </div>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                activeView === item.id 
                  ? "bg-[#00A1DE]/10 text-[#00A1DE]" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <div className={cn("shrink-0", activeView === item.id ? "text-[#00A1DE]" : "text-gray-400 group-hover:text-gray-600")}>
                {item.icon}
              </div>
              {isSidebarOpen && <span className="font-semibold text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-100 space-y-1">
          <button 
            onClick={() => setView('settings')}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
              activeView === 'settings' ? "bg-[#00A1DE]/10 text-[#00A1DE]" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <Settings size={20} />
            {isSidebarOpen && <span className="font-medium text-sm">Settings</span>}
          </button>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-gray-50 transition-all"
          >
            <Menu size={20} />
            {isSidebarOpen && <span className="font-medium text-sm">Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-[70] w-72 bg-white shadow-2xl transition-transform duration-300 lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#00A1DE] rounded-lg flex items-center justify-center text-white">
              <Sun size={20} />
            </div>
            <span className="font-bold text-lg tracking-tight">CEH Rwanda</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-400">
            <X size={24} />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3 rounded-xl font-semibold",
                activeView === item.id ? "bg-[#00A1DE] text-white" : "text-gray-600"
              )}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300",
        isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
      )}>
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-40 px-4 lg:px-8 flex items-center justify-between print:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 text-gray-500"
          >
            <Menu size={24} />
          </button>

          <div className="hidden lg:flex items-center gap-2 text-sm text-gray-400 font-medium">
            <span>Pages</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 capitalize">{activeView}</span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLang(lang === 'en' ? 'rw' : 'en')}
              className="flex items-center gap-2 h-9 px-3 border border-gray-100"
            >
              <Globe size={16} className="text-gray-400" />
              <span className="font-bold text-xs uppercase">{lang}</span>
            </Button>
            
            <div className="h-8 w-[1px] bg-gray-100 mx-1" />
            
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-gray-900">Samuel H.</p>
                <p className="text-[10px] text-gray-400 font-medium">Free Plan</p>
              </div>
              <div className="w-9 h-9 bg-gray-100 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 font-bold text-xs">
                SH
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 lg:p-8 flex-1">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="px-8 py-6 border-t border-gray-200 bg-white flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden">
          <div className="flex items-center gap-6 text-sm text-gray-400 font-medium">
            <a href="#" className="hover:text-gray-900">Privacy</a>
            <a href="#" className="hover:text-gray-900">Terms</a>
            <a href="#" className="hover:text-gray-900">Contact</a>
          </div>
          <p className="text-xs text-gray-400 font-medium">
            © 2026 Clean Energy Hub Rwanda. Built for Sustainability.
          </p>
        </footer>
      </div>
    </div>
  );
};
