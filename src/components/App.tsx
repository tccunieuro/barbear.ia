import React, { useState, useEffect } from 'react';
import { LoginForm } from './auth/LoginForm';
import { ForgotPasswordForm } from './auth/ForgotPasswordForm';
import { Sidebar } from './layout/Sidebar';
import { Dashboard } from './dashboard/Dashboard';
import { FinanceiroPage } from './pages/FinanceiroPage';
import { AgendaPage } from './pages/AgendaPage';
import { AtendimentosPage } from './pages/AtendimentosPage';
import { ClientesPage } from './pages/ClientesPage';
import { ConfiguracoesPage } from './pages/ConfiguracoesPage';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

type AuthState = 'login' | 'forgot-password' | 'authenticated' | 'loading';
type PageState = 'dashboard' | 'financeiro' | 'agenda' | 'atendimentos' | 'clientes' | 'configuracoes';

export const App: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>('loading');
  const [currentPage, setCurrentPage] = useState<PageState>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Verificar se já há um usuário logado
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setAuthState('authenticated');
      } else {
        setAuthState('login');
      }
    };

    checkUser();

    // Escutar mudanças no estado de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        setAuthState('authenticated');
        toast({
          title: "Login realizado",
          description: "Bem-vindo ao Barbear.ia!",
        });
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setAuthState('login');
        setCurrentPage('dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const handleLogin = async (credentials: { email: string; password: string; remember: boolean }) => {
    console.log('Login attempt:', credentials);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        toast({
          title: "Erro no login",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      // O usuário será definido pelo listener onAuthStateChange
    } catch (error: any) {
      toast({
        title: "Erro no login",
        description: "Erro inesperado durante o login",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
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
      case 'agenda':
        return <AgendaPage />;
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

  if (authState === 'loading') {
    return (
      <div className="flex h-screen bg-orange-50 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-2 text-orange-700">Carregando...</p>
        </div>
      </div>
    );
  }

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
    <div className="flex h-screen bg-orange-50 overflow-hidden">
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
