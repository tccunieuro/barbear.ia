
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Search, 
  Phone, 
  Mail, 
  MapPin
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
      endereco: 'Rua das Flores, 123'
    },
    {
      id: 2,
      nome: 'Maria Santos',
      telefone: '(11) 88888-8888',
      email: 'maria@email.com',
      endereco: 'Av. Principal, 456'
    },
    {
      id: 3,
      nome: 'Pedro Oliveira',
      telefone: '(11) 77777-7777',
      email: 'pedro@email.com',
      endereco: 'Rua Central, 789'
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
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
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
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
