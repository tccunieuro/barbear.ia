
import React, { useState } from 'react';
import { LoginForm } from './auth/LoginForm';
import { ForgotPasswordForm } from './auth/ForgotPasswordForm';
import { Sidebar } from './layout/Sidebar';
import { Dashboard } from './dashboard/Dashboard';
import { FinanceiroPage } from './pages/FinanceiroPage';
import { AtendimentosPage } from './pages/AtendimentosPage';
import { ConfiguracoesPage } from './pages/ConfiguracoesPage';
import { useToast } from '@/hooks/use-toast';

type AuthState = 'login' | 'forgot-password' | 'authenticated';
type PageState = 'dashboard' | 'financeiro' | 'atendimentos' | 'relatorios' | 'clientes' | 'configuracoes';

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
      case 'configuracoes':
        return <ConfiguracoesPage />;
      case 'relatorios':
        return (
          <div className="p-6 bg-gray-50/50 min-h-full">
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Relatórios</h2>
              <p className="text-gray-600">Esta funcionalidade estará disponível em breve.</p>
            </div>
          </div>
        );
      case 'clientes':
        return (
          <div className="p-6 bg-gray-50/50 min-h-full">
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Clientes</h2>
              <p className="text-gray-600">Esta funcionalidade estará disponível em breve.</p>
            </div>
          </div>
        );
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
