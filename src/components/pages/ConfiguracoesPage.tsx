
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  Palette, 
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

  const [tema, setTema] = useState('claro');

  const handleSave = () => {
    // Simula salvamento das configurações
    console.log('Salvando configurações:', { profileData, tema });
    
    // Aplica o tema se for escuro
    if (tema === 'escuro') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    toast({
      title: "Configurações salvas",
      description: "Suas preferências foram atualizadas com sucesso.",
    });
  };

  const applyTheme = (selectedTheme: string) => {
    setTema(selectedTheme);
    
    // Aplica o tema imediatamente para preview
    if (selectedTheme === 'escuro') {
      document.documentElement.classList.add('dark');
    } else if (selectedTheme === 'claro') {
      document.documentElement.classList.remove('dark');
    } else if (selectedTheme === 'automatico') {
      // Detecta preferência do sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600 mt-1">Gerencie suas preferências e configurações da conta</p>
        </div>
        <Button onClick={handleSave} className="bg-trinks-orange hover:bg-trinks-orange-dark">
          <Save className="h-4 w-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      <div className="space-y-6">
        {/* Segurança */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-trinks-orange" />
              <span>Segurança</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Autenticação de Dois Fatores</h3>
                <p className="text-sm text-gray-600">Adicione uma camada extra de segurança</p>
              </div>
              <Button className="bg-trinks-orange hover:bg-trinks-orange-dark">
                Configurar
              </Button>
            </div>

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

        {/* Aparência */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="h-5 w-5 text-trinks-orange" />
              <span>Aparência</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="tema">Tema do Sistema</Label>
                <Select value={tema} onValueChange={applyTheme}>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Escolha entre tema claro ou escuro" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="claro">Claro</SelectItem>
                    <SelectItem value="escuro">Escuro</SelectItem>
                    <SelectItem value="automatico">Automático</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-600 mt-1">
                  Escolha entre tema claro, escuro ou automático (segue a preferência do sistema)
                </p>
              </div>

              {/* Preview do tema */}
              <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 transition-colors">
                <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Preview do Tema</h4>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-2 bg-trinks-orange rounded w-3/4"></div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Perfil */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-trinks-orange" />
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
