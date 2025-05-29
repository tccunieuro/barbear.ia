
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
    // Simula salvamento das configurações
    console.log('Salvando configurações:', { profileData });
    
    toast({
      title: "Configurações salvas",
      description: "Suas preferências foram atualizadas com sucesso.",
    });
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600 mt-1">Gerencie suas preferências e configurações da conta</p>
        </div>
        <Button onClick={handleSave} className="bg-blue-800 hover:bg-blue-900">
          <Save className="h-4 w-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      <div className="space-y-6">
        {/* Segurança */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-blue-800" />
              <span>Segurança</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Alterar Senha</h3>
                <p className="text-sm text-gray-600">Atualize sua senha regularmente</p>
              </div>
              <Button variant="outline">
                Alterar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Perfil */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-blue-800" />
              <span>Perfil</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nomeCompleto">Nome Completo</Label>
                <Input
                  id="nomeCompleto"
                  value={profileData.nomeCompleto}
                  onChange={(e) => setProfileData(prev => ({ ...prev, nomeCompleto: e.target.value }))}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="nomeBarbearia">Nome da Barbearia</Label>
              <Input
                id="nomeBarbearia"
                value={profileData.nomeBarbearia}
                onChange={(e) => setProfileData(prev => ({ ...prev, nomeBarbearia: e.target.value }))}
                className="mt-1"
              />
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
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
