
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Users, 
  Calendar,
  Phone,
  TrendingUp
} from 'lucide-react';

export const ClientesPage: React.FC = () => {
  const [busca, setBusca] = useState('');

  // Mock data para demonstração
  const mockClientes = [
    {
      id: 1,
      nome: 'João Silva',
      telefone: '(11) 99999-9999',
      ultimoAtendimento: '15/01/2024',
      totalAtendimentos: 24
    },
    {
      id: 2,
      nome: 'Pedro Santos',
      telefone: '(11) 88888-8888',
      ultimoAtendimento: '10/01/2024',
      totalAtendimentos: 15
    },
    {
      id: 3,
      nome: 'Carlos Oliveira',
      telefone: '(11) 77777-7777',
      ultimoAtendimento: '28/12/2023',
      totalAtendimentos: 8
    },
    {
      id: 4,
      nome: 'Rafael Costa',
      telefone: '(11) 66666-6666',
      ultimoAtendimento: '14/01/2024',
      totalAtendimentos: 32
    }
  ];

  const clientesFiltrados = mockClientes.filter(cliente => {
    const matchBusca = cliente.nome.toLowerCase().includes(busca.toLowerCase()) ||
                      cliente.telefone.includes(busca);
    return matchBusca;
  });

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-50 to-white min-h-full">
      {/* Header - sem botão "Novo Cliente" */}
      <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600 mt-1">Gerencie sua base de clientes e histórico de atendimentos</p>
        </div>
      </div>

      {/* Card de Métrica */}
      <Card className="bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total de Clientes</CardTitle>
          <div className="bg-blue-50 p-2 rounded-lg">
            <Users className="h-4 w-4 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">1,247</div>
          <p className="text-xs text-green-600 flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            +8% este mês
          </p>
        </CardContent>
      </Card>

      {/* Busca - com cor ajustada */}
      <Card className="bg-white shadow-sm border border-gray-100 rounded-xl">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por nome ou telefone..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10 border-2 border-gray-300 focus:border-gray-600 bg-white text-gray-900 rounded-lg h-12"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de Clientes - sem rótulos de status */}
      <Card className="bg-white shadow-sm border border-gray-100 rounded-xl">
        <CardHeader>
          <CardTitle className="text-gray-900">Lista de Clientes ({clientesFiltrados.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clientesFiltrados.map((cliente) => (
              <div key={cliente.id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 text-white flex items-center justify-center font-semibold">
                        {cliente.nome.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{cliente.nome}</h3>
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
                        <p className="font-medium flex items-center text-gray-900">
                          <Calendar className="h-3 w-3 mr-1 text-gray-600" />
                          {cliente.ultimoAtendimento}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Total de Atendimentos</p>
                        <p className="font-medium text-gray-900">{cliente.totalAtendimentos} atendimentos</p>
                      </div>
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
