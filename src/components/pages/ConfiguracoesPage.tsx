
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  User, 
  Save
} from 'lucide-react';

export const ConfiguracoesPage: React.FC = () => {
  const { toast } = useToast();
  
  const [profileData, setProfileData] = useState({
    nomeCompleto: 'João Silva',
    email: 'admin@barbear.ia',
    nomeBarbearia: 'Barbearia Moderna'
  });

  const handleSave = () => {
    console.log('Salvando configurações:', { profileData });
    
    toast({
      title: "Configurações salvas",
      description: "Suas preferências foram atualizadas com sucesso.",
    });
  };

  return (
    <div className="p-6 space-y-6 bg-orange-50 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-sm border border-orange-200">
        <div>
          <h1 className="text-3xl font-bold text-orange-900">Configurações</h1>
          <p className="text-orange-700 mt-1">Gerencie suas preferências e configurações da conta</p>
        </div>
        <Button 
          onClick={handleSave} 
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md hover:shadow-lg transition-all rounded-lg"
        >
          <Save className="h-4 w-4 mr-2" />
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
            <div className="flex items-center justify-between p-4 border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors">
              <div>
                <h3 className="font-medium text-orange-900">Alterar Senha</h3>
                <p className="text-sm text-orange-700">Atualize sua senha regularmente</p>
              </div>
              <Button className="bg-white hover:bg-orange-50 text-orange-700 hover:text-orange-900 border-2 border-orange-200 hover:border-orange-300 shadow-sm hover:shadow-md transition-all rounded-lg">
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
                <Label htmlFor="nomeCompleto" className="text-orange-800 font-medium">Nome Completo</Label>
                <Input
                  id="nomeCompleto"
                  value={profileData.nomeCompleto}
                  onChange={(e) => setProfileData(prev => ({ ...prev, nomeCompleto: e.target.value }))}
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
              <Label htmlFor="nomeBarbearia" className="text-orange-800 font-medium">Nome da Barbearia</Label>
              <Input
                id="nomeBarbearia"
                value={profileData.nomeBarbearia}
                onChange={(e) => setProfileData(prev => ({ ...prev, nomeBarbearia: e.target.value }))}
                className="mt-1 border-2 border-orange-200 focus:border-orange-400 bg-white text-orange-900 rounded-lg h-12"
              />
            </div>

            <div className="p-4 bg-orange-100 border border-orange-200 rounded-lg">
              <p className="text-sm text-orange-800">
                <strong>Versão Demo:</strong> As configurações de perfil estão funcionais nesta demonstração. 
                Use o botão "Salvar Alterações" para aplicar as mudanças.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
