
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  Edit, 
  Trash2,
  Calendar,
  Star
} from 'lucide-react';

export const ClientesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data para demonstração
  const clientes = [
    {
      id: 1,
      nome: 'João Silva',
      telefone: '(11) 99999-9999',
      email: 'joao@email.com',
      endereco: 'Rua das Flores, 123',
      ultimoAtendimento: '15/01/2024',
      totalAtendimentos: 12,
      status: 'Ativo'
    },
    {
      id: 2,
      nome: 'Maria Santos',
      telefone: '(11) 88888-8888',
      email: 'maria@email.com',
      endereco: 'Av. Principal, 456',
      ultimoAtendimento: '14/01/2024',
      totalAtendimentos: 8,
      status: 'Ativo'
    },
    {
      id: 3,
      nome: 'Pedro Oliveira',
      telefone: '(11) 77777-7777',
      email: 'pedro@email.com',
      endereco: 'Rua Central, 789',
      ultimoAtendimento: '10/01/2024',
      totalAtendimentos: 25,
      status: 'VIP'
    }
  ];

  const filteredClientes = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.telefone.includes(searchTerm)
  );

  return (
    <div className="p-6 space-y-6 bg-orange-50 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-sm border border-orange-200">
        <div>
          <h1 className="text-3xl font-bold text-orange-900">Clientes</h1>
          <p className="text-orange-700 mt-1">Gerencie sua base de clientes</p>
        </div>
        <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md hover:shadow-lg transition-all rounded-lg">
          <Plus className="h-4 w-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white shadow-sm border border-orange-200 hover:shadow-md transition-shadow rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Total de Clientes</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">1.247</div>
            <p className="text-xs text-orange-600 mt-1">+12% este mês</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border border-orange-200 hover:shadow-md transition-shadow rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Novos este Mês</CardTitle>
            <Plus className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">89</div>
            <p className="text-xs text-orange-600 mt-1">+5% vs mês anterior</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border border-orange-200 hover:shadow-md transition-shadow rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Clientes VIP</CardTitle>
            <Star className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">156</div>
            <p className="text-xs text-orange-600 mt-1">12.5% do total</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border border-orange-200 hover:shadow-md transition-shadow rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Atendimentos</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">2.143</div>
            <p className="text-xs text-orange-600 mt-1">Total realizados</p>
          </CardContent>
        </Card>
      </div>

      {/* Barra de Pesquisa */}
      <Card className="bg-white shadow-sm border border-orange-200 rounded-xl">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 h-4 w-4" />
            <Input
              placeholder="Buscar por nome ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-400 bg-white text-orange-900 placeholder:text-orange-400"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de Clientes */}
      <Card className="bg-white shadow-sm border border-orange-200 rounded-xl">
        <CardHeader>
          <CardTitle className="text-orange-900">Lista de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredClientes.map((cliente) => (
              <div key={cliente.id} className="p-4 border border-orange-100 rounded-lg hover:bg-orange-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-orange-900">{cliente.nome}</h3>
                      <div className="flex items-center space-x-4 text-sm text-orange-700 mt-1">
                        <div className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {cliente.telefone}
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {cliente.email}
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-orange-600 mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {cliente.endereco}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right text-sm">
                      <p className="text-orange-900 font-medium">{cliente.totalAtendimentos} atendimentos</p>
                      <p className="text-orange-600">Último: {cliente.ultimoAtendimento}</p>
                    </div>
                    <Badge 
                      variant={cliente.status === 'VIP' ? 'default' : 'secondary'}
                      className={cliente.status === 'VIP' 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-orange-100 text-orange-800'
                      }
                    >
                      {cliente.status}
                    </Badge>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-orange-600 hover:text-orange-800 hover:bg-orange-100"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
