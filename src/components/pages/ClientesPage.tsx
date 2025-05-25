
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
  Star, 
  Calendar,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  Clock
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
      email: 'joao@email.com',
      ultimoAtendimento: '15/01/2024',
      totalAtendimentos: 24,
      servicoFavorito: 'Corte Masculino',
      status: 'ativo',
      avaliacao: 4.8
    },
    {
      id: 2,
      nome: 'Pedro Santos',
      telefone: '(11) 88888-8888',
      email: 'pedro@email.com',
      ultimoAtendimento: '10/01/2024',
      totalAtendimentos: 15,
      servicoFavorito: 'Corte + Barba',
      status: 'ativo',
      avaliacao: 5.0
    },
    {
      id: 3,
      nome: 'Carlos Oliveira',
      telefone: '(11) 77777-7777',
      email: 'carlos@email.com',
      ultimoAtendimento: '28/12/2023',
      totalAtendimentos: 8,
      servicoFavorito: 'Barba',
      status: 'inativo',
      avaliacao: 4.5
    },
    {
      id: 4,
      nome: 'Rafael Costa',
      telefone: '(11) 66666-6666',
      email: 'rafael@email.com',
      ultimoAtendimento: '14/01/2024',
      totalAtendimentos: 32,
      servicoFavorito: 'Corte Masculino',
      status: 'vip',
      avaliacao: 4.9
    }
  ];

  const clientesFiltrados = mockClientes.filter(cliente => {
    const matchBusca = cliente.nome.toLowerCase().includes(busca.toLowerCase()) ||
                      cliente.telefone.includes(busca) ||
                      cliente.email.toLowerCase().includes(busca.toLowerCase());
    
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

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating}</span>
      </div>
    );
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

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
            <Users className="h-4 w-4 text-trinks-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <p className="text-xs text-gray-600">71.5% do total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes VIP</CardTitle>
            <Star className="h-4 w-4 text-trinks-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125</div>
            <p className="text-xs text-gray-600">10% do total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avaliação Média</CardTitle>
            <Star className="h-4 w-4 text-trinks-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7</div>
            <p className="text-xs text-gray-600">baseado em 1,089 avaliações</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome, telefone ou email..."
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
                          <span className="flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {cliente.email}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
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
                      <div>
                        <p className="text-gray-500">Serviço Favorito</p>
                        <p className="font-medium">{cliente.servicoFavorito}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:items-end space-y-2">
                    {getStatusBadge(cliente.status)}
                    {renderStars(cliente.avaliacao)}
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Ver Histórico
                      </Button>
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        Agendar
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
