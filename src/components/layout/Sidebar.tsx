
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Home, 
  DollarSign, 
  Calendar, 
  Settings, 
  LogOut, 
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
      "bg-orange-800 h-screen flex flex-col transition-all duration-300 border-r border-orange-700",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-orange-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="bg-white p-1 rounded-lg flex-shrink-0">
                <img 
                  src="/lovable-uploads/58795d95-2279-416e-af72-51ce51787bde.png" 
                  alt="Barber.ia Logo" 
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">Barber.ia</h1>
                <p className="text-orange-200 text-xs">Gestão Completa</p>
              </div>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="text-white hover:bg-orange-700"
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
                  "w-full justify-start text-white hover:bg-orange-700 transition-colors",
                  isActive && "bg-white text-orange-800 hover:bg-orange-100",
                  isCollapsed ? "px-2" : "px-3"
                )}
              >
                <Icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
                {!isCollapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
                {!isCollapsed && item.badge && (
                  <span className="ml-auto bg-white text-orange-800 text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Button>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="p-3 border-t border-orange-700">
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
