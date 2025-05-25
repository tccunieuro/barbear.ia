
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Shield, 
  Palette, 
  User, 
  Bell,
  Settings
} from 'lucide-react';

export const ConfiguracoesPage: React.FC = () => {
  const [profileData, setProfileData] = useState({
    nomeCompleto: 'João Silva',
    email: 'admin@barbear.ia',
    nomeBarbearia: 'Barbearia Moderna'
  });

  const [notificacoes, setNotificacoes] = useState({
    relatoriosDiarios: true
  });

  const [tema, setTema] = useState('claro');

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600 mt-1">Novidades e melhorias da plataforma</p>
        </div>
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

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Sessões Ativas</h3>
                <p className="text-sm text-gray-600">Gerencie seus dispositivos conectados</p>
              </div>
              <Button variant="outline">
                Ver Sessões
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
                <Select value={tema} onValueChange={setTema}>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Escolha entre tema claro ou escuro" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="claro">Claro</SelectItem>
                    <SelectItem value="escuro">Escuro</SelectItem>
                    <SelectItem value="automatico">Automático</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-600 mt-1">Escolha entre tema claro ou escuro</p>
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
                <strong>Versão Demo:</strong> As configurações de perfil estão desabilitadas nesta versão de demonstração.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Notificações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-trinks-orange" />
              <span>Notificações</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Relatórios Diários</h3>
                  <p className="text-sm text-gray-600">Receba um resumo diário do seu faturamento</p>
                </div>
                <Switch
                  checked={notificacoes.relatoriosDiarios}
                  onCheckedChange={(checked) => 
                    setNotificacoes(prev => ({ ...prev, relatoriosDiarios: checked }))
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
