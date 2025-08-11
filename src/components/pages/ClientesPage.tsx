
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Search, 
  Phone, 
  Mail, 
  MapPin,
  Loader2,
  ArrowUp,
  ArrowDown,
  Trophy
} from 'lucide-react';
import { useClientes } from '@/hooks/useClientes';
import { useAtendimentos } from '@/hooks/useAtendimentos';

export const ClientesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc'); // desc = mais atendimentos primeiro
  const { data: clientes = [], isLoading: loadingClientes, error } = useClientes();
  const { data: atendimentos = [], isLoading: loadingAtendimentos } = useAtendimentos();

  // Calcular número de atendimentos por cliente
  const clientesComAtendimentos = clientes.map(cliente => {
    const numeroAtendimentos = atendimentos.filter(atendimento => 
      atendimento.cliente_id === cliente.id
    ).length;
    
    return {
      ...cliente,
      numeroAtendimentos
    };
  });

  // Filtrar e ordenar clientes
  const clientesFiltradosEOrdenados = clientesComAtendimentos
    .filter(cliente =>
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cliente.telefone && cliente.telefone.includes(searchTerm))
    )
    .sort((a, b) => {
      if (sortOrder === 'desc') {
        return b.numeroAtendimentos - a.numeroAtendimentos;
      } else {
        return a.numeroAtendimentos - b.numeroAtendimentos;
      }
    });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  if (loadingClientes || loadingAtendimentos) {
    return (
      <div className="p-4 md:p-6 space-y-6 bg-orange-50 dark:bg-gray-900 min-h-full flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-orange-600" />
          <span className="text-orange-700 dark:text-orange-300">Carregando clientes...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-6 space-y-6 bg-orange-50 dark:bg-gray-900 min-h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-2">Erro ao carregar clientes</p>
          <p className="text-sm text-orange-700 dark:text-orange-300">Por favor, faça login para acessar seus dados</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 bg-orange-50 dark:bg-gray-900 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-sm border border-orange-200 dark:border-gray-700">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-orange-900 dark:text-white">Clientes</h1>
          <p className="text-orange-700 dark:text-orange-300 mt-1">Gerencie sua base de clientes</p>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <Card className="bg-white dark:bg-gray-800 shadow-sm border border-orange-200 dark:border-gray-700 hover:shadow-md transition-shadow rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-400">Total de Clientes</CardTitle>
            <Users className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900 dark:text-white">{clientes.length}</div>
            <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Clientes cadastrados</p>
          </CardContent>
        </Card>
      </div>

      {/* Barra de Pesquisa e Ordenação */}
      <Card className="bg-white dark:bg-gray-800 shadow-sm border border-orange-200 dark:border-gray-700 rounded-xl">
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 dark:text-orange-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nome ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-orange-200 dark:border-gray-600 focus:border-orange-400 focus:ring-orange-400 bg-white dark:bg-gray-700 text-orange-900 dark:text-white placeholder:text-orange-400 dark:placeholder:text-gray-400"
              />
            </div>
            <Button
              onClick={toggleSortOrder}
              variant="outline"
              className="border-orange-200 dark:border-gray-600 text-orange-700 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-gray-700 flex items-center space-x-2"
            >
              {sortOrder === 'desc' ? (
                <>
                  <ArrowDown className="h-4 w-4" />
                  <span>Mais Fiéis</span>
                </>
              ) : (
                <>
                  <ArrowUp className="h-4 w-4" />
                  <span>Menos Fiéis</span>
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Clientes */}
      <Card className="bg-white dark:bg-gray-800 shadow-sm border border-orange-200 dark:border-gray-700 rounded-xl">
        <CardHeader>
          <CardTitle className="text-orange-900 dark:text-white">Ranking de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          {clientesFiltradosEOrdenados.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-orange-300 dark:text-orange-600 mx-auto mb-4" />
              <p className="text-orange-600 dark:text-orange-400 text-lg">
                {clientes.length === 0 ? 'Nenhum cliente cadastrado ainda' : 'Nenhum cliente encontrado'}
              </p>
              <p className="text-orange-500 dark:text-orange-500 text-sm mt-2">
                {clientes.length === 0 ? 'Comece cadastrando seus primeiros clientes' : 'Tente uma busca diferente'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {clientesFiltradosEOrdenados.slice(0, 5).map((cliente, index) => (
                <div key={cliente.id} className="p-4 border border-orange-100 dark:border-gray-600 rounded-lg hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center flex-shrink-0 relative">
                        {cliente.numeroAtendimentos > 0 && index < 3 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                            <Trophy className="h-3 w-3 text-white" />
                          </div>
                        )}
                        <Users className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-lg text-orange-900 dark:text-white">{cliente.nome}</h3>
                          <div className="flex items-center space-x-2">
                            <span className="bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-full text-sm font-medium">
                              {cliente.numeroAtendimentos} atendimento{cliente.numeroAtendimentos !== 1 ? 's' : ''}
                            </span>
                            {index < 3 && cliente.numeroAtendimentos > 0 && (
                              <span className="text-yellow-500 text-sm font-bold">
                                #{index + 1}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="space-y-1">
                          {cliente.telefone && (
                            <div className="flex items-center text-sm text-orange-700 dark:text-orange-300">
                              <Phone className="h-3 w-3 mr-2 flex-shrink-0" />
                              <span className="break-all">{cliente.telefone}</span>
                            </div>
                          )}
                          {cliente.email && (
                            <div className="flex items-center text-sm text-orange-700 dark:text-orange-300">
                              <Mail className="h-3 w-3 mr-2 flex-shrink-0" />
                              <span className="break-all">{cliente.email}</span>
                            </div>
                          )}
                          {cliente.endereco && (
                            <div className="flex items-start text-sm text-orange-600 dark:text-orange-400">
                              <MapPin className="h-3 w-3 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="break-words">{cliente.endereco}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
