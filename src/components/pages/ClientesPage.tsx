
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Users, 
  UserPlus, 
  Calendar,
  Phone,
  TrendingUp
} from 'lucide-react';

export const ClientesPage: React.FC = () => {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('todos');

  // Mock data para demonstração
  const mockClientes = [
    {
      id: 1,
      nome: 'João Silva',
      telefone: '(11) 99999-9999',
      ultimoAtendimento: '15/01/2024',
      totalAtendimentos: 24,
      status: 'ativo'
    },
    {
      id: 2,
      nome: 'Pedro Santos',
      telefone: '(11) 88888-8888',
      ultimoAtendimento: '10/01/2024',
      totalAtendimentos: 15,
      status: 'ativo'
    },
    {
      id: 3,
      nome: 'Carlos Oliveira',
      telefone: '(11) 77777-7777',
      ultimoAtendimento: '28/12/2023',
      totalAtendimentos: 8,
      status: 'inativo'
    },
    {
      id: 4,
      nome: 'Rafael Costa',
      telefone: '(11) 66666-6666',
      ultimoAtendimento: '14/01/2024',
      totalAtendimentos: 32,
      status: 'vip'
    }
  ];

  const clientesFiltrados = mockClientes.filter(cliente => {
    const matchBusca = cliente.nome.toLowerCase().includes(busca.toLowerCase()) ||
                      cliente.telefone.includes(busca);
    
    const matchFiltro = filtro === 'todos' || cliente.status === filtro;
    
    return matchBusca && matchFiltro;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ativo':
        return <Badge className="bg-green-100 text-green-800">Ativo</Badge>;
      case 'inativo':
        return <Badge variant="secondary">Inativo</Badge>;
      case 'vip':
        return <Badge className="bg-yellow-100 text-yellow-800">VIP</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600 mt-1">Gerencie sua base de clientes e histórico de atendimentos</p>
        </div>
        <Button className="bg-trinks-orange hover:bg-trinks-orange-dark">
          <UserPlus className="h-4 w-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      {/* Card de Métrica */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
          <Users className="h-4 w-4 text-trinks-orange" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,247</div>
          <p className="text-xs text-green-600 flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            +8% este mês
          </p>
        </CardContent>
      </Card>

      {/* Filtros e Busca */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome ou telefone..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filtro} onValueChange={setFiltro}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="ativo">Ativos</SelectItem>
                <SelectItem value="inativo">Inativos</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Clientes */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes ({clientesFiltrados.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clientesFiltrados.map((cliente) => (
              <div key={cliente.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-trinks-orange text-white flex items-center justify-center font-semibold">
                        {cliente.nome.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{cliente.nome}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {cliente.telefone}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Último Atendimento</p>
                        <p className="font-medium flex items-center">
                          <Calendar className="h-3 w-3 mr-1 text-trinks-orange" />
                          {cliente.ultimoAtendimento}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Total de Atendimentos</p>
                        <p className="font-medium">{cliente.totalAtendimentos} atendimentos</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:items-end space-y-2">
                    {getStatusBadge(cliente.status)}
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
