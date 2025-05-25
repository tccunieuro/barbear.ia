
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MetricCard } from '../dashboard/MetricCard';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Download,
  Filter
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Mock data for different periods
const mockData = {
  daily: [
    { name: 'Hoje', receita: 1247, despesa: 320, lucro: 927 },
    { name: 'Ontem', receita: 1180, despesa: 280, lucro: 900 },
  ],
  weekly: [
    { name: 'Seg', receita: 450, despesa: 120, lucro: 330 },
    { name: 'Ter', receita: 320, despesa: 80, lucro: 240 },
    { name: 'Qua', receita: 580, despesa: 150, lucro: 430 },
    { name: 'Qui', receita: 420, despesa: 100, lucro: 320 },
    { name: 'Sex', receita: 680, despesa: 180, lucro: 500 },
    { name: 'Sáb', receita: 890, despesa: 200, lucro: 690 },
    { name: 'Dom', receita: 340, despesa: 90, lucro: 250 },
  ],
  monthly: [
    { name: 'Jan', receita: 28450, despesa: 8200, lucro: 20250 },
    { name: 'Fev', receita: 31200, despesa: 9100, lucro: 22100 },
    { name: 'Mar', receita: 29800, despesa: 8800, lucro: 21000 },
    { name: 'Abr', receita: 33500, despesa: 9500, lucro: 24000 },
    { name: 'Mai', receita: 35200, despesa: 10200, lucro: 25000 },
    { name: 'Jun', receita: 38900, despesa: 11100, lucro: 27800 },
  ]
};

export const FinanceiroPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');

  const getCurrentData = () => {
    return mockData[selectedPeriod as keyof typeof mockData] || mockData.weekly;
  };

  const getMetrics = () => {
    const data = getCurrentData();
    const totalReceita = data.reduce((sum, item) => sum + item.receita, 0);
    const totalDespesa = data.reduce((sum, item) => sum + item.despesa, 0);
    const totalLucro = totalReceita - totalDespesa;
    const margemLucro = ((totalLucro / totalReceita) * 100).toFixed(1);
    
    return { totalReceita, totalDespesa, totalLucro, margemLucro };
  };

  const metrics = getMetrics();

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financeiro</h1>
          <p className="text-gray-600 mt-1">Controle de receitas e despesas</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Period Tabs */}
      <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="daily">Diário</TabsTrigger>
          <TabsTrigger value="weekly">Semanal</TabsTrigger>
          <TabsTrigger value="monthly">Mensal</TabsTrigger>
          <TabsTrigger value="quarterly">Trimestral</TabsTrigger>
          <TabsTrigger value="yearly">Anual</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedPeriod} className="space-y-6">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Receita Total"
              value={`R$ ${metrics.totalReceita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
              change="+15% vs período anterior"
              changeType="positive"
              icon={DollarSign}
              iconColor="text-green-600"
            />
            <MetricCard
              title="Despesas Total"
              value={`R$ ${metrics.totalDespesa.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
              change="+8% vs período anterior"
              changeType="negative"
              icon={TrendingDown}
              iconColor="text-red-600"
            />
            <MetricCard
              title="Lucro Líquido"
              value={`R$ ${metrics.totalLucro.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
              change="+22% vs período anterior"
              changeType="positive"
              icon={TrendingUp}
              iconColor="text-trinks-orange"
            />
            <MetricCard
              title="Margem de Lucro"
              value={`${metrics.margemLucro}%`}
              change="+2.3% vs período anterior"
              changeType="positive"
              icon={Calendar}
              iconColor="text-blue-600"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue vs Expenses Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Receita vs Despesas</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={getCurrentData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [
                        `R$ ${Number(value).toLocaleString('pt-BR')}`, 
                        name === 'receita' ? 'Receita' : 'Despesa'
                      ]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="receita" 
                      stroke="#22c55e" 
                      strokeWidth={3}
                      name="receita"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="despesa" 
                      stroke="#ef4444" 
                      strokeWidth={3}
                      name="despesa"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Profit Area Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Evolução do Lucro</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={getCurrentData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, 'Lucro']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="lucro" 
                      stroke="#E85A00" 
                      fill="#E85A00"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Principais Receitas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Cortes Masculinos</span>
                    <span className="font-bold text-green-700">R$ 4.350,00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Serviços de Barba</span>
                    <span className="font-bold text-green-700">R$ 2.890,00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Tratamentos</span>
                    <span className="font-bold text-green-700">R$ 1.450,00</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Principais Despesas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="font-medium">Produtos/Materiais</span>
                    <span className="font-bold text-red-700">R$ 850,00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="font-medium">Salários</span>
                    <span className="font-bold text-red-700">R$ 1.200,00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="font-medium">Aluguel/Utilities</span>
                    <span className="font-bold text-red-700">R$ 650,00</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
