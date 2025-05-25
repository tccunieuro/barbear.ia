
import React, { useState } from 'react';
import { LoginForm } from './auth/LoginForm';
import { ForgotPasswordForm } from './auth/ForgotPasswordForm';
import { Sidebar } from './layout/Sidebar';
import { Dashboard } from './dashboard/Dashboard';
import { FinanceiroPage } from './pages/FinanceiroPage';
import { AtendimentosPage } from './pages/AtendimentosPage';
import { ClientesPage } from './pages/ClientesPage';
import { ConfiguracoesPage } from './pages/ConfiguracoesPage';
import { useToast } from '@/hooks/use-toast';

type AuthState = 'login' | 'forgot-password' | 'authenticated';
type PageState = 'dashboard' | 'financeiro' | 'atendimentos' | 'clientes' | 'configuracoes';

export const App: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>('login');
  const [currentPage, setCurrentPage] = useState<PageState>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { toast } = useToast();

  const handleLogin = (credentials: { email: string; password: string; remember: boolean }) => {
    // Simulate authentication
    console.log('Login attempt:', credentials);
    setAuthState('authenticated');
  };

  const handleLogout = () => {
    setAuthState('login');
    setCurrentPage('dashboard');
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page as PageState);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'financeiro':
        return <FinanceiroPage />;
      case 'atendimentos':
        return <AtendimentosPage />;
      case 'clientes':
        return <ClientesPage />;
      case 'configuracoes':
        return <ConfiguracoesPage />;
      default:
        return <Dashboard />;
    }
  };

  if (authState !== 'authenticated') {
    if (authState === 'forgot-password') {
      return (
        <ForgotPasswordForm 
          onBack={() => setAuthState('login')}
        />
      );
    }
    
    return (
      <LoginForm 
        onLogin={handleLogin}
        onForgotPassword={() => setAuthState('forgot-password')}
      />
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onLogout={handleLogout}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className="flex-1 overflow-auto">
        {renderCurrentPage()}
      </main>
    </div>
  );
};
