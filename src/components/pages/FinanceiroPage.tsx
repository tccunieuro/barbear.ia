
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

// Mock data atualizado para todos os períodos
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
  quarterly: [
    { name: '1º Tri', receita: 52400, despesa: 9600, lucro: 42800 },
    { name: '2º Tri', receita: 54200, despesa: 10100, lucro: 44100 },
    { name: '3º Tri', receita: 55600, despesa: 9800, lucro: 45800 },
    { name: '4º Tri', receita: 56800, despesa: 10500, lucro: 46300 },
  ],
  yearly: [
    { name: '2021', receita: 180000, despesa: 35000, lucro: 145000 },
    { name: '2022', receita: 195000, despesa: 37000, lucro: 158000 },
    { name: '2023', receita: 210000, despesa: 38500, lucro: 171500 },
    { name: '2024', receita: 219000, despesa: 40000, lucro: 179000 },
  ]
};

const getMetricsByPeriod = (period: string) => {
  switch (period) {
    case 'daily':
      return {
        totalReceita: 850,
        totalDespesa: 120,
        totalLucro: 730,
        margemLucro: '85.9',
        crescimento: '18.1'
      };
    case 'weekly':
      return {
        totalReceita: 5140,
        totalDespesa: 1270,
        totalLucro: 3870,
        margemLucro: '75.3',
        crescimento: '12.5'
      };
    case 'quarterly':
      return {
        totalReceita: 55600,
        totalDespesa: 9800,
        totalLucro: 45800,
        margemLucro: '82.4',
        crescimento: '8.7'
      };
    case 'yearly':
      return {
        totalReceita: 219000,
        totalDespesa: 40000,
        totalLucro: 179000,
        margemLucro: '81.7',
        crescimento: '4.3'
      };
    default:
      return {
        totalReceita: 18500,
        totalDespesa: 3200,
        totalLucro: 15300,
        margemLucro: '82.7',
        crescimento: '10.1'
      };
  }
};

const getProjectionByPeriod = (period: string) => {
  switch (period) {
    case 'daily':
      return { atual: 850, projecao: 920 };
    case 'weekly':
      return { atual: 5140, projecao: 5600 };
    case 'quarterly':
      return { atual: 55600, projecao: 58200 };
    case 'yearly':
      return { atual: 219000, projecao: 225000 };
    default:
      return { atual: 18500, projecao: 19200 };
  }
};

const getPeriodLabel = (period: string) => {
  switch (period) {
    case 'daily': return 'Dia';
    case 'weekly': return 'Semana';
    case 'quarterly': return 'Trimestre';
    case 'yearly': return 'Ano';
    default: return 'Mês';
  }
};

export const FinanceiroPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');

  const getCurrentData = () => {
    return mockData[selectedPeriod as keyof typeof mockData] || mockData.weekly;
  };

  const metrics = getMetricsByPeriod(selectedPeriod);
  const projection = getProjectionByPeriod(selectedPeriod);
  const periodLabel = getPeriodLabel(selectedPeriod);

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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="daily">Diário</TabsTrigger>
          <TabsTrigger value="weekly" className="bg-trinks-orange text-white data-[state=active]:bg-trinks-orange data-[state=active]:text-white">Semanal</TabsTrigger>
          <TabsTrigger value="quarterly">Trimestral</TabsTrigger>
          <TabsTrigger value="yearly">Anual</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedPeriod} className="space-y-6">
          {/* Resumo Financeiro */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Resumo Financeiro do {periodLabel}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Faturamento</p>
                      <p className="text-3xl font-bold text-gray-900">R$ {metrics.totalReceita.toLocaleString('pt-BR')}</p>
                      <p className="text-sm text-gray-600">Em relação ao período anterior</p>
                    </div>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">{metrics.crescimento}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Despesas</p>
                    <p className="text-3xl font-bold text-gray-900">R$ {metrics.totalDespesa.toLocaleString('pt-BR')}</p>
                    <p className="text-sm text-gray-600">Total do período</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Lucro Líquido</p>
                      <p className="text-3xl font-bold text-gray-900">R$ {metrics.totalLucro.toLocaleString('pt-BR')}</p>
                      <p className="text-sm text-gray-600">Receita - Despesas</p>
                    </div>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">{metrics.crescimento}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Projeção e Análise Comparativa */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Projeção */}
            <Card>
              <CardHeader>
                <CardTitle>Projeção do {periodLabel}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Faturamento Atual</span>
                  <span className="text-xl font-bold">R$ {projection.atual.toLocaleString('pt-BR')}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Projeção para o {periodLabel}</span>
                  <span className="text-xl font-bold text-green-600">R$ {projection.projecao.toLocaleString('pt-BR')}</span>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-2">
                    Baseado na performance atual, estimamos um faturamento total de <strong>R$ {projection.projecao.toLocaleString('pt-BR')}</strong> até o final do {periodLabel.toLowerCase()}.
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
                    <p className="text-lg font-bold">R$ {metrics.totalReceita.toLocaleString('pt-BR')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Período Anterior</p>
                    <p className="text-lg font-bold">R$ {Math.round(metrics.totalReceita * 0.9).toLocaleString('pt-BR')}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Crescimento</span>
                    <span className="text-lg font-bold text-green-600">+{metrics.crescimento}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

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
