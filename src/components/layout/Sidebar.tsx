import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Logo } from '@/components/ui/logo';
import { 
  Home, 
  DollarSign, 
  Calendar, 
  Settings, 
  LogOut, 
  ChevronLeft,
  ChevronRight,
  Users,
  Menu,
  X,
  CalendarDays
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'financeiro', label: 'Financeiro', icon: DollarSign },
  { id: 'agenda', label: 'Agenda', icon: CalendarDays },
  { id: 'atendimentos', label: 'Atendimentos', icon: Calendar },
  { id: 'clientes', label: 'Clientes', icon: Users },
  { id: 'configuracoes', label: 'Configurações', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onPageChange,
  onLogout,
  isCollapsed,
  onToggleCollapse
}) => {
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-white border-primary text-primary hover:bg-primary hover:text-white"
        >
          {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "bg-gradient-to-b from-primary to-primary-700 h-screen flex flex-col transition-all duration-300 border-r border-primary-300/20 shadow-xl",
        "md:relative md:translate-x-0",
        "fixed z-50 transform transition-transform duration-300 ease-in-out",
        isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        isCollapsed ? "w-16" : "w-64"
      )}>
        {/* Header */}
        <div className="p-4 border-b border-primary-300/20">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onPageChange('dashboard')}>
                <Logo size="sm" />
                <div>
                  <h1 className="text-white font-bold text-lg">Barber.IA</h1>
                  <p className="text-primary-100 text-xs">Gestão Completa</p>
                </div>
              </div>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="hidden md:flex text-white hover:bg-primary-600 hover:text-white"
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMobileOpen(false);
                  }}
                  className={cn(
                    "w-full justify-start text-white hover:bg-white/10 hover:text-white transition-colors",
                    isActive && "bg-white text-primary hover:bg-white/90 hover:text-primary shadow-md",
                    isCollapsed ? "px-2" : "px-3"
                  )}
                >
                  <Icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
                  {!isCollapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                  {!isCollapsed && item.badge && (
                    <span className="ml-auto bg-white text-primary text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Button>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="p-3 border-t border-primary-300/20">
          <Button
            variant="ghost"
            onClick={() => {
              onLogout();
              setIsMobileOpen(false);
            }}
            className={cn(
              "w-full justify-start text-white hover:bg-red-500/80 hover:text-white transition-colors",
              isCollapsed ? "px-2" : "px-3"
            )}
          >
            <LogOut className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
            {!isCollapsed && <span className="text-sm font-medium">Sair</span>}
          </Button>
        </div>
      </div>
    </>
  );
};
