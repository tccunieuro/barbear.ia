
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
      "bg-primary h-screen flex flex-col transition-all duration-300 border-r border-primary/20",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-primary/20">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-lg flex-shrink-0">
                <img 
                  src="/lovable-uploads/463a377e-e8e1-437a-9231-6185a4234daf.png" 
                  alt="Barbear.ia Logo" 
                  className="h-8 w-auto object-contain"
                />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">Barbear.ia</h1>
                <p className="text-primary-foreground/80 text-xs">Gestão Completa</p>
              </div>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="text-white hover:bg-primary/80 hover:text-white"
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
                  "w-full justify-start text-white hover:bg-primary/80 hover:text-white transition-colors",
                  isActive && "bg-white text-primary hover:bg-white/90 hover:text-primary",
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
      <div className="p-3 border-t border-primary/20">
        <Button
          variant="ghost"
          onClick={onLogout}
          className={cn(
            "w-full justify-start text-white hover:bg-destructive hover:text-white transition-colors",
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
