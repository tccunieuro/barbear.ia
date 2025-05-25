
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

// Mock data atualizado conforme as imagens
const mockData = {
  daily: [
    { name: 'Hoje', receita: 850, despesa: 120, lucro: 730 },
    { name: 'Ontem', receita: 720, despesa: 100, lucro: 620 },
  ],
  weekly: [
    { name: 'Seg', receita: 650, despesa: 180, lucro: 470 },
    { name: 'Ter', receita: 480, despesa: 120, lucro: 360 },
    { name: 'Qua', receita: 780, despesa: 200, lucro: 580 },
    { name: 'Qui', receita: 620, despesa: 140, lucro: 480 },
    { name: 'Sex', receita: 890, despesa: 220, lucro: 670 },
    { name: 'Sáb', receita: 1200, despesa: 280, lucro: 920 },
    { name: 'Dom', receita: 520, despesa: 130, lucro: 390 },
  ],
  monthly: [
    { name: 'Jan', receita: 16800, despesa: 3200, lucro: 13600 },
    { name: 'Fev', receita: 17200, despesa: 3100, lucro: 14100 },
    { name: 'Mar', receita: 18500, despesa: 3200, lucro: 15300 },
    { name: 'Abr', receita: 17800, despesa: 3000, lucro: 14800 },
    { name: 'Mai', receita: 19200, despesa: 3400, lucro: 15800 },
    { name: 'Jun', receita: 18500, despesa: 3200, lucro: 15300 },
  ]
};

export const FinanceiroPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const getCurrentData = () => {
    return mockData[selectedPeriod as keyof typeof mockData] || mockData.monthly;
  };

  const getMetrics = () => {
    if (selectedPeriod === 'monthly') {
      return {
        totalReceita: 18500,
        totalDespesa: 3200,
        totalLucro: 15300,
        margemLucro: '82.7'
      };
    }
    
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
          <h1 className="text-3xl font-bold text-gray-900">Faturamento e Despesas</h1>
        </div>
      </div>

      {/* Period Tabs */}
      <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="daily">Diário</TabsTrigger>
          <TabsTrigger value="weekly">Semanal</TabsTrigger>
          <TabsTrigger value="monthly" className="bg-trinks-orange text-white data-[state=active]:bg-trinks-orange data-[state=active]:text-white">Mensal</TabsTrigger>
          <TabsTrigger value="quarterly">Trimestral</TabsTrigger>
          <TabsTrigger value="yearly">Anual</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedPeriod} className="space-y-6">
          {/* Resumo Financeiro do Mês */}
          {selectedPeriod === 'monthly' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Resumo Financeiro do Mês</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Faturamento</p>
                        <p className="text-3xl font-bold text-gray-900">R$ 18.500</p>
                        <p className="text-sm text-gray-600">Em relação ao período anterior</p>
                      </div>
                      <div className="flex items-center text-green-600">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">10.1%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Despesas</p>
                      <p className="text-3xl font-bold text-gray-900">R$ 3.200</p>
                      <p className="text-sm text-gray-600">Total do período</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Lucro Líquido</p>
                        <p className="text-3xl font-bold text-gray-900">R$ 15.300</p>
                        <p className="text-sm text-gray-600">Receita - Despesas</p>
                      </div>
                      <div className="flex items-center text-green-600">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">10.1%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Projeção do Mês e Análise Comparativa */}
          {selectedPeriod === 'monthly' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Projeção do Mês */}
              <Card>
                <CardHeader>
                  <CardTitle>Projeção do Mês</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Faturamento Atual</span>
                    <span className="text-xl font-bold">R$ 18.500</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Projeção para o Mês</span>
                    <span className="text-xl font-bold text-green-600">R$ 19.200</span>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600 mb-2">
                      Baseado na performance atual, estimamos um faturamento total de <strong>R$ 19.200</strong> até o final do mês.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Análise Comparativa */}
              <Card>
                <CardHeader>
                  <CardTitle>Análise Comparativa</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Período Atual</p>
                      <p className="text-lg font-bold">R$ 18.500</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Período Anterior</p>
                      <p className="text-lg font-bold">R$ 16.800</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Crescimento</span>
                      <span className="text-lg font-bold text-green-600">+10.1%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Charts Row */}
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
        </TabsContent>
      </Tabs>
    </div>
  );
};
