
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MetricCard } from '../dashboard/MetricCard';
import { ServiceRanking } from '../dashboard/ServiceRanking';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Users, 
  Clock, 
  TrendingUp,
  Download,
  Filter,
  TrendingDown
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock data atualizado conforme as imagens
const appointmentsData = {
  daily: [
    { name: '08:00', atendimentos: 2 },
    { name: '10:00', atendimentos: 3 },
    { name: '12:00', atendimentos: 1 },
    { name: '14:00', atendimentos: 4 },
    { name: '16:00', atendimentos: 2 },
    { name: '18:00', atendimentos: 0 },
    { name: '20:00', atendimentos: 0 },
  ],
  weekly: [
    { name: 'Seg', atendimentos: 15 },
    { name: 'Ter', atendimentos: 12 },
    { name: 'Qua', atendimentos: 18 },
    { name: 'Qui', atendimentos: 14 },
    { name: 'Sex', atendimentos: 20 },
    { name: 'Sáb', atendimentos: 25 },
    { name: 'Dom', atendimentos: 8 },
  ],
  monthly: [
    { name: 'Jan', atendimentos: 320 },
    { name: 'Fev', atendimentos: 298 },
    { name: 'Mar', atendimentos: 356 },
    { name: 'Abr', atendimentos: 285 },
    { name: 'Mai', atendimentos: 378 },
    { name: 'Jun', atendimentos: 412 },
  ]
};

const servicesData = [
  { name: 'Corte + Barba', count: 142, percentage: 39.9, trend: 'up' as const },
  { name: 'Corte Simples', count: 125, percentage: 35.1, trend: 'stable' as const },
  { name: 'Barba', count: 89, percentage: 25.0, trend: 'up' as const },
];

const serviceDistribution = [
  { name: 'Corte + Barba', value: 39.9, color: '#3B82F6', count: 142 },
  { name: 'Corte Simples', value: 35.1, color: '#3B82F6', count: 125 },
  { name: 'Barba', value: 25.0, color: '#3B82F6', count: 89 },
];

export const AtendimentosPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const getCurrentData = () => {
    return appointmentsData[selectedPeriod as keyof typeof appointmentsData] || appointmentsData.monthly;
  };

  const getMetrics = () => {
    const data = getCurrentData();
    const totalAtendimentos = selectedPeriod === 'monthly' ? 356 : data.reduce((sum, item) => sum + item.atendimentos, 0);
    const mediaAtendimentos = selectedPeriod === 'monthly' ? 11.5 : Math.round(totalAtendimentos / data.length);
    
    return { totalAtendimentos, mediaAtendimentos };
  };

  const metrics = getMetrics();

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Atendimentos</h1>
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
          {/* Performance do Mês */}
          {selectedPeriod === 'monthly' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Performance de Atendimentos do Mês</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total de Atendimentos</p>
                        <p className="text-3xl font-bold text-gray-900">356</p>
                        <p className="text-sm text-gray-600">Em relação ao período anterior</p>
                      </div>
                      <div className="flex items-center text-green-600">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">15.2%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Média por Dia</p>
                      <p className="text-3xl font-bold text-gray-900">11.5</p>
                      <p className="text-sm text-gray-600">Baseado no período selecionado</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Serviço Mais Popular</p>
                      <p className="text-2xl font-bold text-gray-900">Corte + Barba</p>
                      <p className="text-sm text-gray-600">142 atendimentos (39.9%)</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Distribuição de Serviços e Top 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Distribuição de Serviços */}
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Serviços</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {serviceDistribution.map((service, index) => (
                  <div key={service.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{service.name}</span>
                      <span className="font-bold">{service.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${service.value}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600">{service.count} atendimentos</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top 3 Serviços */}
            <Card>
              <CardHeader>
                <CardTitle>Top 3 Serviços Mais Realizados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {servicesData.map((service, index) => (
                  <div
                    key={service.name}
                    className="flex items-center justify-between p-3 rounded-lg border bg-gray-50/50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                        index === 0 ? 'bg-yellow-500' : 
                        index === 1 ? 'bg-gray-400' : 
                        'bg-orange-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{service.name}</p>
                        <p className="text-sm text-gray-600">
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
                        <div className="h-4 w-4 bg-gray-400 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Análise de Crescimento */}
          <Card>
            <CardHeader>
              <CardTitle>Análise de Crescimento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Taxa de Crescimento</span>
                    <span className="text-lg font-bold text-green-600">+15.2%</span>
                  </div>
                  <p className="text-sm text-gray-600">Comparado ao período anterior</p>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-700">Meta Diária</span>
                    <span className="text-lg font-bold text-blue-700">12 atendimentos</span>
                  </div>
                  <p className="text-sm text-gray-600">Objetivo estabelecido</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
