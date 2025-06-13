
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Shield, 
  User, 
  Save,
  Loader2
} from 'lucide-react';
import { useProfile, useUpdateProfile } from '@/hooks/useProfiles';

export const ConfiguracoesPage: React.FC = () => {
  const { data: profile, isLoading, error } = useProfile();
  const updateProfileMutation = useUpdateProfile();
  
  const [profileData, setProfileData] = useState({
    nome_completo: '',
    email: '',
    nome_barbearia: ''
  });

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

  if (isLoading) {
    return (
      <div className="p-4 md:p-6 space-y-6 bg-orange-50 min-h-full flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-orange-600" />
          <span className="text-orange-700">Carregando configurações...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-6 space-y-6 bg-orange-50 min-h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-2">Erro ao carregar configurações</p>
          <p className="text-sm text-orange-700">Por favor, faça login para acessar seus dados</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 bg-orange-50 min-h-full max-w-full overflow-x-hidden">
      {/* Header - Layout Mobile Otimizado */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-white rounded-xl p-4 md:p-6 shadow-sm border border-orange-200 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-orange-900">Configurações</h1>
          <p className="text-orange-700 mt-1">Gerencie suas preferências e configurações da conta</p>
        </div>
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

      <div className="space-y-6">
        {/* Segurança */}
        <Card className="bg-white shadow-sm border border-orange-200 hover:shadow-md transition-shadow rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-orange-900">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Shield className="h-5 w-5 text-orange-600" />
              </div>
              <span>Segurança</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors gap-4">
              <div>
                <h3 className="font-medium text-orange-900">Alterar Senha</h3>
                <p className="text-sm text-orange-700">Atualize sua senha regularmente</p>
              </div>
              <Button className="bg-white hover:bg-orange-50 text-orange-700 hover:text-orange-900 border-2 border-orange-200 hover:border-orange-300 shadow-sm hover:shadow-md transition-all rounded-lg w-full sm:w-auto">
                Alterar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Perfil */}
        <Card className="bg-white shadow-sm border border-orange-200 hover:shadow-md transition-shadow rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-orange-900">
              <div className="bg-orange-100 p-2 rounded-lg">
                <User className="h-5 w-5 text-orange-600" />
              </div>
              <span>Perfil</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome_completo" className="text-orange-800 font-medium">Nome Completo</Label>
                <Input
                  id="nome_completo"
                  value={profileData.nome_completo}
                  onChange={(e) => setProfileData(prev => ({ ...prev, nome_completo: e.target.value }))}
                  className="mt-1 border-2 border-orange-200 focus:border-orange-400 bg-white text-orange-900 rounded-lg h-12"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-orange-800 font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-1 border-2 border-orange-200 focus:border-orange-400 bg-white text-orange-900 rounded-lg h-12"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="nome_barbearia" className="text-orange-800 font-medium">Nome da Barbearia</Label>
              <Input
                id="nome_barbearia"
                value={profileData.nome_barbearia}
                onChange={(e) => setProfileData(prev => ({ ...prev, nome_barbearia: e.target.value }))}
                className="mt-1 border-2 border-orange-200 focus:border-orange-400 bg-white text-orange-900 rounded-lg h-12"
              />
            </div>

            <div className="p-4 bg-orange-100 border border-orange-200 rounded-lg">
              <p className="text-sm text-orange-800">
                <strong>Dados do Supabase:</strong> As configurações de perfil estão conectadas ao banco de dados. 
                Use o botão "Salvar Alterações" para aplicar as mudanças.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
