
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Calendar
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export const FinanceiroPage: React.FC = () => {
  const [periodo, setPeriodo] = useState('mensal');

  // Mock data para demonstração
  const mockTransacoes = [
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
  ];

  const mockDadosGrafico = [
    { nome: 'Jan', receitas: 4500, despesas: 1200 },
    { nome: 'Fev', receitas: 3800, despesas: 1100 },
    { nome: 'Mar', receitas: 5200, despesas: 1350 },
    { nome: 'Abr', receitas: 4800, despesas: 1280 },
    { nome: 'Mai', receitas: 5800, despesas: 1450 },
    { nome: 'Jun', receitas: 6200, despesas: 1380 },
  ];

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-50 to-white min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financeiro</h1>
          <p className="text-gray-600 mt-1">Controle completo das suas finanças</p>
        </div>
        <Button className="bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 text-white shadow-md hover:shadow-lg transition-all rounded-lg">
          <Plus className="h-4 w-4 mr-2" />
          Nova Transação
        </Button>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Receitas</CardTitle>
            <div className="bg-green-50 p-2 rounded-lg">
              <ArrowUpRight className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">R$ 18.450</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% este mês
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Despesas</CardTitle>
            <div className="bg-red-50 p-2 rounded-lg">
              <ArrowDownRight className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">R$ 4.280</div>
            <p className="text-xs text-red-600 flex items-center mt-1">
              <TrendingDown className="h-3 w-3 mr-1" />
              -5% este mês
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Lucro</CardTitle>
            <div className="bg-blue-50 p-2 rounded-lg">
              <DollarSign className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">R$ 14.170</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +18% este mês
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Margem</CardTitle>
            <div className="bg-purple-50 p-2 rounded-lg">
              <CreditCard className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">76.8%</div>
            <p className="text-xs text-gray-600">Margem de lucro</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Receitas vs Despesas */}
      <Card className="bg-white shadow-sm border border-gray-100 rounded-xl">
        <CardHeader>
          <CardTitle className="text-gray-900">Receitas vs Despesas</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockDadosGrafico}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="nome" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="receitas" fill="#10b981" name="Receitas" />
              <Bar dataKey="despesas" fill="#ef4444" name="Despesas" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Lista de Transações */}
      <Card className="bg-white shadow-sm border border-gray-100 rounded-xl">
        <CardHeader>
          <CardTitle className="text-gray-900">Transações Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTransacoes.map((transacao) => (
              <div key={transacao.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transacao.tipo === 'receita' ? 'bg-green-50' : 'bg-red-50'
                  }`}>
                    {transacao.tipo === 'receita' ? (
                      <ArrowUpRight className="h-5 w-5 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transacao.descricao}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-3 w-3" />
                      <span>{transacao.data}</span>
                      <Badge variant="secondary" className="text-xs">{transacao.categoria}</Badge>
                    </div>
                  </div>
                </div>
                <div className={`text-lg font-semibold ${
                  transacao.tipo === 'receita' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transacao.tipo === 'receita' ? '+' : '-'}R$ {transacao.valor.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
