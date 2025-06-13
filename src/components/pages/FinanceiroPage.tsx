
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Edit,
  Trash2
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AdicionarDespesaModal } from './AdicionarDespesaModal';
import { useToast } from '@/hooks/use-toast';

export const FinanceiroPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDespesa, setEditingDespesa] = useState(null);
  const { toast } = useToast();

  // Mock data para demonstração
  const [transacoes, setTransacoes] = useState([
    {
      id: 1,
      tipo: 'receita',
      descricao: 'Corte + Barba',
      valor: 85.00,
      data: '15/01/2024',
      categoria: 'Serviços'
    },
    {
      id: 2,
      tipo: 'despesa',
      descricao: 'Produtos de limpeza',
      valor: 45.00,
      data: '14/01/2024',
      categoria: 'Limpeza'
    },
    {
      id: 3,
      tipo: 'receita',
      descricao: 'Corte Simples',
      valor: 50.00,
      data: '14/01/2024',
      categoria: 'Serviços'
    },
    {
      id: 4,
      tipo: 'despesa',
      descricao: 'Energia Elétrica',
      valor: 280.00,
      data: '13/01/2024',
      categoria: 'Utilidades'
    }
  ]);

  const mockDadosGrafico = [
    { nome: 'Jan', receitas: 4500, despesas: 1200 },
    { nome: 'Fev', receitas: 3800, despesas: 1100 },
    { nome: 'Mar', receitas: 5200, despesas: 1350 },
    { nome: 'Abr', receitas: 4800, despesas: 1280 },
    { nome: 'Mai', receitas: 5800, despesas: 1450 },
    { nome: 'Jun', receitas: 6200, despesas: 1380 },
  ];

  const handleAddDespesa = (novaDespesa: any) => {
    setTransacoes(prev => [novaDespesa, ...prev]);
  };

  const handleEditDespesa = (despesaEditada: any) => {
    setTransacoes(prev => prev.map(t => t.id === despesaEditada.id ? despesaEditada : t));
    setEditingDespesa(null);
  };

  const handleDeleteTransacao = (id: number) => {
    setTransacoes(prev => prev.filter(t => t.id !== id));
    toast({
      title: "Sucesso",
      description: "Transação excluída com sucesso!",
    });
  };

  const openEditModal = (despesa: any) => {
    setEditingDespesa(despesa);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingDespesa(null);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 bg-orange-50 min-h-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white rounded-xl p-4 md:p-6 shadow-sm border border-orange-200 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-orange-900">Financeiro</h1>
          <p className="text-orange-700 mt-1">Controle completo das suas finanças</p>
        </div>
        <Button 
          onClick={() => setModalOpen(true)}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md hover:shadow-lg transition-all rounded-lg w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Despesa
        </Button>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Card className="bg-white shadow-sm border border-orange-200 hover:shadow-md transition-shadow rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Receitas</CardTitle>
            <div className="bg-green-50 p-2 rounded-lg">
              <ArrowUpRight className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">R$ 18.450</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% este mês
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border border-orange-200 hover:shadow-md transition-shadow rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Despesas</CardTitle>
            <div className="bg-red-50 p-2 rounded-lg">
              <ArrowDownRight className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">R$ 4.280</div>
            <p className="text-xs text-red-600 flex items-center mt-1">
              <TrendingDown className="h-3 w-3 mr-1" />
              -5% este mês
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border border-orange-200 hover:shadow-md transition-shadow rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Lucro</CardTitle>
            <div className="bg-orange-100 p-2 rounded-lg">
              <DollarSign className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">R$ 14.170</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +18% este mês
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Receitas vs Despesas */}
      <Card className="bg-white shadow-sm border border-orange-200 rounded-xl">
        <CardHeader>
          <CardTitle className="text-orange-900">Receitas vs Despesas</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockDadosGrafico}>
              <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
              <XAxis dataKey="nome" stroke="#ea580c" />
              <YAxis stroke="#ea580c" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #fed7aa',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="receitas" fill="#10b981" name="Receitas" />
              <Bar dataKey="despesas" fill="#ef4444" name="Despesas" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Lista de Transações - Layout Mobile Otimizado */}
      <Card className="bg-white shadow-sm border border-orange-200 rounded-xl">
        <CardHeader>
          <CardTitle className="text-orange-900">Transações Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transacoes.map((transacao) => (
              <div key={transacao.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-orange-100 rounded-lg hover:bg-orange-50 transition-colors space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    transacao.tipo === 'receita' ? 'bg-green-50' : 'bg-red-50'
                  }`}>
                    {transacao.tipo === 'receita' ? (
                      <ArrowUpRight className="h-5 w-5 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-orange-900 truncate">{transacao.descricao}</p>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-orange-700">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{transacao.data}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800">{transacao.categoria}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end space-x-3">
                  <div className={`text-lg font-semibold ${
                    transacao.tipo === 'receita' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transacao.tipo === 'receita' ? '+' : '-'}R$ {transacao.valor.toFixed(2)}
                  </div>
                  {transacao.tipo === 'despesa' && (
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openEditModal(transacao)}
                        className="text-orange-600 hover:text-orange-800 hover:bg-orange-100 p-2"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteTransacao(transacao.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AdicionarDespesaModal
        isOpen={modalOpen}
        onClose={closeModal}
        onAddDespesa={handleAddDespesa}
        onEditDespesa={handleEditDespesa}
        editingDespesa={editingDespesa}
      />
    </div>
  );
};
