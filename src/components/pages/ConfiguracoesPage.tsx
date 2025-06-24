
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Shield, 
  User, 
  Save,
  Loader2,
  Palette
} from 'lucide-react';
import { useProfile, useUpdateProfile } from '@/hooks/useProfiles';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/components/ui/theme-provider';

export const ConfiguracoesPage: React.FC = () => {
  const { data: profile, isLoading, error } = useProfile();
  const updateProfileMutation = useUpdateProfile();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  
  const [profileData, setProfileData] = useState({
    nome_completo: '',
    email: '',
    nome_barbearia: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  useEffect(() => {
    if (profile) {
      setProfileData({
        nome_completo: profile.nome_completo || '',
        email: profile.email || '',
        nome_barbearia: profile.nome_barbearia || ''
      });
    }
  }, [profile]);

  const handleSave = () => {
    updateProfileMutation.mutate(profileData);
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive"
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Erro",
        description: "A nova senha deve ter pelo menos 6 caracteres.",
        variant: "destructive"
      });
      return;
    }

    setIsUpdatingPassword(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Sucesso",
        description: "Senha alterada com sucesso!",
      });

      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Erro ao alterar senha: " + error.message,
        variant: "destructive"
      });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-6 space-y-6 bg-orange-50 dark:bg-gray-900 min-h-full flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-orange-600" />
          <span className="text-orange-700 dark:text-orange-300">Carregando configurações...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-6 space-y-6 bg-orange-50 dark:bg-gray-900 min-h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-2">Erro ao carregar configurações</p>
          <p className="text-sm text-orange-700 dark:text-orange-300">Por favor, faça login para acessar seus dados</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 bg-orange-50 dark:bg-gray-900 min-h-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-sm border border-orange-200 dark:border-gray-700 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-orange-900 dark:text-white">Configurações</h1>
          <p className="text-orange-700 dark:text-gray-300 mt-1">Gerencie suas preferências e configurações da conta</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Aparência */}
        <Card className="bg-white dark:bg-gray-800 shadow-sm border border-orange-200 dark:border-gray-700 hover:shadow-md transition-shadow rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-orange-900 dark:text-white">
              <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-lg">
                <Palette className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <span>Aparência</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base text-orange-900 dark:text-white">Modo Escuro</Label>
                <p className="text-sm text-orange-600 dark:text-gray-400">
                  Alterne entre tema claro e escuro
                </p>
              </div>
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Perfil */}
        <Card className="bg-white dark:bg-gray-800 shadow-sm border border-orange-200 dark:border-gray-700 hover:shadow-md transition-shadow rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-orange-900 dark:text-white">
              <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-lg">
                <User className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <span>Perfil</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome_completo" className="text-orange-800 dark:text-gray-200 font-medium">Nome Completo</Label>
                <Input
                  id="nome_completo"
                  value={profileData.nome_completo}
                  onChange={(e) => setProfileData(prev => ({ ...prev, nome_completo: e.target.value }))}
                  className="mt-1 border-2 border-orange-200 dark:border-gray-600 focus:border-orange-400 dark:focus:border-orange-400 bg-white dark:bg-gray-700 text-orange-900 dark:text-white rounded-lg h-12"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-orange-800 dark:text-gray-200 font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-1 border-2 border-orange-200 dark:border-gray-600 focus:border-orange-400 dark:focus:border-orange-400 bg-white dark:bg-gray-700 text-orange-900 dark:text-white rounded-lg h-12"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="nome_barbearia" className="text-orange-800 dark:text-gray-200 font-medium">Nome da Barbearia</Label>
              <Input
                id="nome_barbearia"
                value={profileData.nome_barbearia}
                onChange={(e) => setProfileData(prev => ({ ...prev, nome_barbearia: e.target.value }))}
                className="mt-1 border-2 border-orange-200 dark:border-gray-600 focus:border-orange-400 dark:focus:border-orange-400 bg-white dark:bg-gray-700 text-orange-900 dark:text-white rounded-lg h-12"
              />
            </div>

            {/* Botão Salvar Alterações movido para aqui */}
            <div className="pt-4">
              <Button 
                onClick={handleSave} 
                disabled={updateProfileMutation.isPending}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md hover:shadow-lg transition-all rounded-lg w-full lg:w-auto"
              >
                {updateProfileMutation.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Salvar Alterações
              </Button>
            </div>

            <div className="p-4 bg-orange-100 dark:bg-gray-700 border border-orange-200 dark:border-gray-600 rounded-lg">
              <p className="text-sm text-orange-800 dark:text-gray-200">
                <strong>Dados do Supabase:</strong> As configurações de perfil estão conectadas ao banco de dados. 
                Use o botão "Salvar Alterações" para aplicar as mudanças.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Segurança */}
        <Card className="bg-white dark:bg-gray-800 shadow-sm border border-orange-200 dark:border-gray-700 hover:shadow-md transition-shadow rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-orange-900 dark:text-white">
              <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-lg">
                <Shield className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <span>Segurança</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium text-orange-900 dark:text-white">Alterar Senha</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="newPassword" className="text-orange-800 dark:text-gray-200 font-medium">Nova Senha</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    placeholder="Digite sua nova senha"
                    className="mt-1 border-2 border-orange-200 dark:border-gray-600 focus:border-orange-400 dark:focus:border-orange-400 bg-white dark:bg-gray-700 text-orange-900 dark:text-white rounded-lg h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-orange-800 dark:text-gray-200 font-medium">Confirmar Nova Senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="Confirme sua nova senha"
                    className="mt-1 border-2 border-orange-200 dark:border-gray-600 focus:border-orange-400 dark:focus:border-orange-400 bg-white dark:bg-gray-700 text-orange-900 dark:text-white rounded-lg h-12"
                  />
                </div>

                <Button 
                  onClick={handlePasswordChange}
                  disabled={isUpdatingPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  {isUpdatingPassword ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : null}
                  Alterar Senha
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
