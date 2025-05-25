
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
  Filter
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock data
const appointmentsData = {
  daily: [
    { name: '08:00', atendimentos: 3 },
    { name: '10:00', atendimentos: 5 },
    { name: '12:00', atendimentos: 8 },
    { name: '14:00', atendimentos: 12 },
    { name: '16:00', atendimentos: 15 },
    { name: '18:00', atendimentos: 18 },
    { name: '20:00', atendimentos: 8 },
  ],
  weekly: [
    { name: 'Seg', atendimentos: 28 },
    { name: 'Ter', atendimentos: 24 },
    { name: 'Qua', atendimentos: 32 },
    { name: 'Qui', atendimentos: 29 },
    { name: 'Sex', atendimentos: 38 },
    { name: 'Sáb', atendimentos: 45 },
    { name: 'Dom', atendimentos: 22 },
  ],
  monthly: [
    { name: 'Jan', atendimentos: 890 },
    { name: 'Fev', atendimentos: 920 },
    { name: 'Mar', atendimentos: 850 },
    { name: 'Abr', atendimentos: 980 },
    { name: 'Mai', atendimentos: 1020 },
    { name: 'Jun', atendimentos: 1150 },
  ]
};

const servicesData = [
  { name: 'Corte Masculino', count: 145, percentage: 35, trend: 'up' as const },
  { name: 'Barba + Bigode', count: 98, percentage: 24, trend: 'stable' as const },
  { name: 'Corte + Barba', count: 76, percentage: 18, trend: 'up' as const },
  { name: 'Sobrancelha', count: 45, percentage: 11, trend: 'down' as const },
  { name: 'Relaxamento', count: 32, percentage: 8, trend: 'stable' as const },
];

const serviceDistribution = [
  { name: 'Corte Masculino', value: 35, color: '#E85A00' },
  { name: 'Barba + Bigode', value: 24, color: '#FF6B14' },
  { name: 'Corte + Barba', value: 18, color: '#FFA500' },
  { name: 'Sobrancelha', value: 11, color: '#FFB84D' },
  { name: 'Outros', value: 12, color: '#FFCC80' },
];

export const AtendimentosPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');

  const getCurrentData = () => {
    return appointmentsData[selectedPeriod as keyof typeof appointmentsData] || appointmentsData.weekly;
  };

  const getMetrics = () => {
    const data = getCurrentData();
    const totalAtendimentos = data.reduce((sum, item) => sum + item.atendimentos, 0);
    const mediaAtendimentos = Math.round(totalAtendimentos / data.length);
    
    return { totalAtendimentos, mediaAtendimentos };
  };

  const metrics = getMetrics();

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Atendimentos</h1>
          <p className="text-gray-600 mt-1">Análise de performance e serviços</p>
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
              title="Total de Atendimentos"
              value={metrics.totalAtendimentos.toString()}
              change="+12% vs período anterior"
              changeType="positive"
              icon={Calendar}
            />
            <MetricCard
              title="Média por Período"
              value={metrics.mediaAtendimentos.toString()}
              change="+5% vs período anterior"
              changeType="positive"
              icon={TrendingUp}
            />
            <MetricCard
              title="Clientes Únicos"
              value="198"
              change="+8% vs período anterior"
              changeType="positive"
              icon={Users}
            />
            <MetricCard
              title="Tempo Médio"
              value="45min"
              change="-3min vs período anterior"
              changeType="positive"
              icon={Clock}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Appointments Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Volume de Atendimentos</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={getCurrentData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${value}`, 'Atendimentos']}
                    />
                    <Bar 
                      dataKey="atendimentos" 
                      fill="#E85A00" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Services Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Serviços</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={serviceDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {serviceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Service Ranking and Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ServiceRanking services={servicesData} />
            </div>

            {/* Additional Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700 font-medium">Taxa de Ocupação</p>
                  <p className="text-2xl font-bold text-blue-800">87%</p>
                  <p className="text-xs text-blue-600">+5% vs período anterior</p>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700 font-medium">Taxa de Retorno</p>
                  <p className="text-2xl font-bold text-green-800">72%</p>
                  <p className="text-xs text-green-600">+8% vs período anterior</p>
                </div>
                
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-700 font-medium">Avaliação Média</p>
                  <p className="text-2xl font-bold text-yellow-800">4.8</p>
                  <p className="text-xs text-yellow-600">⭐⭐⭐⭐⭐</p>
                </div>
                
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-700 font-medium">Agendamentos Online</p>
                  <p className="text-2xl font-bold text-purple-800">65%</p>
                  <p className="text-xs text-purple-600">+12% vs período anterior</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
