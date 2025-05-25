
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Home, 
  DollarSign, 
  Calendar, 
  BarChart3, 
  Settings, 
  LogOut, 
  Scissors,
  ChevronLeft,
  ChevronRight,
  Users
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
  { id: 'atendimentos', label: 'Atendimentos', icon: Calendar },
  { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
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
  return (
    <div className={cn(
      "bg-trinks-orange h-screen flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-trinks-orange-dark">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="bg-white p-2 rounded-lg">
                <Scissors className="h-6 w-6 text-trinks-orange" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">BarberManager</h1>
                <p className="text-white/80 text-xs">Gestão Completa</p>
              </div>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="text-white hover:bg-trinks-orange-dark"
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
                onClick={() => onPageChange(item.id)}
                className={cn(
                  "w-full justify-start text-white hover:bg-trinks-orange-dark transition-colors",
                  isActive && "bg-trinks-orange-dark",
                  isCollapsed ? "px-2" : "px-3"
                )}
              >
                <Icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
                {!isCollapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
                {!isCollapsed && item.badge && (
                  <span className="ml-auto bg-white text-trinks-orange text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Button>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="p-3 border-t border-trinks-orange-dark">
        <Button
          variant="ghost"
          onClick={onLogout}
          className={cn(
            "w-full justify-start text-white hover:bg-red-600 transition-colors",
            isCollapsed ? "px-2" : "px-3"
          )}
        >
          <LogOut className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
          {!isCollapsed && <span className="text-sm font-medium">Sair</span>}
        </Button>
      </div>
    </div>
  );
};
