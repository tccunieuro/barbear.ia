import React, { useState } from 'react';
import { MetricCard } from './MetricCard';
import { ServiceRanking } from './ServiceRanking';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Users,
  Scissors,
  Clock,
  TrendingDown
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Mock data
const revenueData = [
  { name: 'Seg', valor: 450 },
  { name: 'Ter', valor: 320 },
  { name: 'Qua', valor: 580 },
  { name: 'Qui', valor: 420 },
  { name: 'Sex', valor: 680 },
  { name: 'Sáb', valor: 890 },
  { name: 'Dom', valor: 340 },
];

const servicesData = [
  { name: 'Corte + Barba', count: 5, percentage: 41.7, trend: 'up' as const },
  { name: 'Corte Simples', count: 4, percentage: 33.3, trend: 'stable' as const },
  { name: 'Barba', count: 3, percentage: 25.0, trend: 'down' as const },
];

const appointmentsData = [
  { name: '08:00', valor: 1 },
  { name: '10:00', valor: 2 },
  { name: '12:00', valor: 3 },
  { name: '14:00', valor: 4 },
  { name: '16:00', valor: 2 },
  { name: '18:00', valor: 0 },
  { name: '20:00', valor: 0 },
];

export const Dashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('semanal');

  return (
    <div className="p-6 space-y-6 bg-orange-50 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-sm border border-orange-100">
        <div>
          <h1 className="text-3xl font-bold text-orange-900">Dashboard</h1>
          <p className="text-orange-600 mt-1">Visão geral do seu negócio</p>
        </div>
      </div>

      {/* Period Tabs */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
        <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <TabsList className="grid w-full grid-cols-4 bg-orange-100 p-1 rounded-lg">
            <TabsTrigger 
              value="semanal" 
              className="data-[state=active]:bg-white data-[state=active]:text-orange-900 data-[state=active]:shadow-sm text-orange-600 hover:text-orange-900 transition-all rounded-md"
            >
              Semanal
            </TabsTrigger>
            <TabsTrigger 
              value="mensal"
              className="data-[state=active]:bg-white data-[state=active]:text-orange-900 data-[state=active]:shadow-sm text-orange-600 hover:text-orange-900 transition-all rounded-md"
            >
              Mensal
            </TabsTrigger>
            <TabsTrigger 
              value="trimestral"
              className="data-[state=active]:bg-white data-[state=active]:text-orange-900 data-[state=active]:shadow-sm text-orange-600 hover:text-orange-900 transition-all rounded-md"
            >
              Trimestral
            </TabsTrigger>
            <TabsTrigger 
              value="anual"
              className="data-[state=active]:bg-white data-[state=active]:text-orange-900 data-[state=active]:shadow-sm text-orange-600 hover:text-orange-900 transition-all rounded-md"
            >
              Anual
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedPeriod} className="space-y-6 mt-6">
            {/* Métricas Financeiras */}
            <div>
              <h2 className="text-xl font-bold text-orange-900 mb-4">Métricas Financeiras</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="bg-white shadow-sm border border-orange-100 hover:shadow-md transition-shadow rounded-xl">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-orange-600">Faturamento</p>
                        <p className="text-3xl font-bold text-orange-900">R$ {selectedPeriod === 'semanal' ? '4.500' : selectedPeriod === 'mensal' ? '18.500' : selectedPeriod === 'trimestral' ? '55.600' : '220.000'}</p>
                        <p className="text-sm text-orange-600">Em relação ao período anterior</p>
                      </div>
                      <div className="flex items-center text-green-600 bg-green-50 p-2 rounded-lg">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">18.1%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-sm border border-orange-100 hover:shadow-md transition-shadow rounded-xl">
                  <CardContent className="pt-6">
                    <div>
                      <p className="text-sm font-medium text-orange-600">Despesas</p>
                      <p className="text-3xl font-bold text-orange-900">R$ {selectedPeriod === 'semanal' ? '800' : selectedPeriod === 'mensal' ? '3.200' : selectedPeriod === 'trimestral' ? '9.600' : '38.400'}</p>
                      <p className="text-sm text-orange-600">Total do período</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-sm border border-orange-100 hover:shadow-md transition-shadow rounded-xl">
                  <CardContent className="pt-6">
                    <div>
                      <p className="text-sm font-medium text-orange-600">Lucro Líquido</p>
                      <p className="text-3xl font-bold text-orange-900">R$ {selectedPeriod === 'semanal' ? '3.700' : selectedPeriod === 'mensal' ? '15.300' : selectedPeriod === 'trimestral' ? '46.000' : '181.600'}</p>
                      <p className="text-sm text-orange-600">Receita - Despesas</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Atendimentos */}
              <h2 className="text-xl font-bold text-orange-900 mb-4">Atendimentos</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="bg-white shadow-sm border border-orange-100 hover:shadow-md transition-shadow rounded-xl">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-orange-600">Total de Atendimentos</p>
                        <p className="text-3xl font-bold text-orange-900">{selectedPeriod === 'semanal' ? '68' : selectedPeriod === 'mensal' ? '280' : selectedPeriod === 'trimestral' ? '840' : '3.200'}</p>
                        <p className="text-sm text-orange-600">Em relação ao período anterior</p>
                      </div>
                      <div className="flex items-center text-red-600 bg-red-50 p-2 rounded-lg">
                        <TrendingDown className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">14.3%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-sm border border-orange-100 hover:shadow-md transition-shadow rounded-xl">
                  <CardContent className="pt-6">
                    <div>
                      <p className="text-sm font-medium text-orange-600">Média por Dia</p>
                      <p className="text-3xl font-bold text-orange-900">{selectedPeriod === 'semanal' ? '9.7' : selectedPeriod === 'mensal' ? '9.3' : selectedPeriod === 'trimestral' ? '9.3' : '8.8'}</p>
                      <p className="text-sm text-orange-600">Baseado no período selecionado</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-sm border border-orange-100 hover:shadow-md transition-shadow rounded-xl">
                  <CardContent className="pt-6">
                    <div>
                      <p className="text-sm font-medium text-orange-600">Serviço Mais Popular</p>
                      <p className="text-2xl font-bold text-orange-900">Corte + Barba</p>
                      <p className="text-sm text-orange-600">{selectedPeriod === 'semanal' ? '28' : selectedPeriod === 'mensal' ? '115' : selectedPeriod === 'trimestral' ? '350' : '1.330'} atendimentos</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Top 3 Serviços Mais Realizados */}
            <Card className="bg-white shadow-sm border border-orange-100 rounded-xl">
              <CardHeader>
                <CardTitle className="text-orange-900">Top 3 Serviços Mais Realizados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {servicesData.map((service, index) => (
                  <div
                    key={service.name}
                    className="flex items-center justify-between p-4 rounded-lg border border-orange-100 bg-orange-50 hover:bg-orange-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                        index === 0 ? 'bg-yellow-500' : 
                        index === 1 ? 'bg-orange-400' : 
                        'bg-orange-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-orange-900">{service.name}</p>
                        <p className="text-sm text-orange-600">
                          {service.count} atendimentos ({service.percentage}%)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {service.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : service.trend === 'down' ? (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      ) : (
                        <div className="h-4 w-4 bg-orange-400 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
