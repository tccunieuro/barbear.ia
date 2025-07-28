import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Key, Scissors } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Verificar se há tokens na URL (tanto em hash quanto em query params)
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token') || searchParams.get('access_token');
    const refreshToken = hashParams.get('refresh_token') || searchParams.get('refresh_token');
    const type = hashParams.get('type') || searchParams.get('type');

    if (accessToken && refreshToken && type === 'recovery') {
      // Definir a sessão com os tokens recebidos
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      }).then(({ error }) => {
        if (error) {
          toast({
            title: "Erro",
            description: "Link de recuperação inválido ou expirado.",
            variant: "destructive",
          });
          navigate('/');
        } else {
          setIsValidToken(true);
        }
      });
    } else {
      toast({
        title: "Erro",
        description: "Link de recuperação inválido.",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [searchParams, toast, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password) {
      toast({
        title: "Erro",
        description: "Por favor, insira sua nova senha.",
        variant: "destructive"
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Erro",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive"
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        toast({
          title: "Erro",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Sucesso!",
          description: "Senha alterada com sucesso!",
        });
        
        // Redirecionar para a página principal após sucesso
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao alterar senha.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isValidToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-900 via-orange-800 to-orange-900 p-4">
        <Card className="w-full max-w-md bg-white shadow-2xl border border-orange-200 rounded-xl overflow-hidden">
          <CardHeader className="text-center pb-6 pt-8 bg-white">
            <div className="flex justify-center items-center mb-6">
              <div className="bg-gradient-to-br from-orange-500 to-orange-700 p-4 rounded-xl shadow-lg">
                <Key className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-light text-orange-900 mb-2">
              Verificando...
            </CardTitle>
            <p className="text-orange-700 font-light">
              Verificando link de recuperação
            </p>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-900 via-orange-800 to-orange-900 p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl border border-orange-200 rounded-xl overflow-hidden">
        <CardHeader className="text-center pb-6 pt-8 bg-white">
          <div className="flex justify-center items-center mb-6">
            <div className="bg-gradient-to-br from-orange-500 to-orange-700 p-4 rounded-xl shadow-lg">
              <Scissors className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-light text-orange-900 mb-2">
            Nova Senha
          </CardTitle>
          <p className="text-orange-700 font-light">
            Digite sua nova senha
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6 px-8 pb-8 bg-white">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-orange-800 font-medium">Nova Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua nova senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-2 border-orange-200 bg-white focus:bg-white focus:border-orange-400 focus:ring-0 transition-all duration-200 text-orange-900 placeholder:text-orange-400 rounded-lg h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-orange-800 font-medium">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirme sua nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="border-2 border-orange-200 bg-white focus:bg-white focus:border-orange-400 focus:ring-0 transition-all duration-200 text-orange-900 placeholder:text-orange-400 rounded-lg h-12"
              />
            </div>
            
            <div className="space-y-3 pt-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 h-12 transition-all duration-200 shadow-lg hover:shadow-xl rounded-lg border-0"
                disabled={isLoading}
              >
                {isLoading ? 'Alterando...' : 'Alterar Senha'}
              </Button>
              
              <Button
                type="button"
                onClick={() => navigate('/')}
                className="w-full bg-white hover:bg-orange-50 text-orange-700 hover:text-orange-900 font-medium py-3 h-12 transition-all duration-200 rounded-lg border-2 border-orange-200 hover:border-orange-300 shadow-sm hover:shadow-md"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};