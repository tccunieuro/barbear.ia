
import React from 'react';
import { MetricCard } from './MetricCard';
import { ServiceRanking } from './ServiceRanking';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Users,
  Scissors,
  Clock
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
  { name: 'Corte Masculino', count: 145, percentage: 35, trend: 'up' as const },
  { name: 'Barba + Bigode', count: 98, percentage: 24, trend: 'stable' as const },
  { name: 'Corte + Barba', count: 76, percentage: 18, trend: 'up' as const },
  { name: 'Sobrancelha', count: 45, percentage: 11, trend: 'down' as const },
  { name: 'Relaxamento', count: 32, percentage: 8, trend: 'stable' as const },
];

const appointmentsData = [
  { name: '08:00', valor: 3 },
  { name: '10:00', valor: 5 },
  { name: '12:00', valor: 8 },
  { name: '14:00', valor: 12 },
  { name: '16:00', valor: 15 },
  { name: '18:00', valor: 18 },
  { name: '20:00', valor: 8 },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Visão geral da sua barbearia</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Período: Última semana</p>
          <p className="text-lg font-semibold text-gray-900">
            {new Date().toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Faturamento Hoje"
          value="R$ 1.247,50"
          change="+12% vs ontem"
          changeType="positive"
          icon={DollarSign}
        />
        <MetricCard
          title="Atendimentos Hoje"
          value="23"
          change="+3 vs ontem"
          changeType="positive"
          icon={Calendar}
        />
        <MetricCard
          title="Receita Semanal"
          value="R$ 6.890,00"
          change="+18% vs sem. passada"
          changeType="positive"
          icon={TrendingUp}
        />
        <MetricCard
          title="Clientes Ativos"
          value="342"
          change="+25 este mês"
          changeType="positive"
          icon={Users}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-trinks-orange" />
              <span>Faturamento Semanal</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`R$ ${value}`, 'Faturamento']}
                />
                <Line 
                  type="monotone" 
                  dataKey="valor" 
                  stroke="#E85A00" 
                  strokeWidth={3}
                  dot={{ fill: '#E85A00', strokeWidth: 2, r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Appointments Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-trinks-orange" />
              <span>Atendimentos por Horário</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={appointmentsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value}`, 'Atendimentos']}
                />
                <Bar dataKey="valor" fill="#E85A00" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Service Ranking */}
        <div className="lg:col-span-2">
          <ServiceRanking services={servicesData} />
        </div>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Scissors className="h-5 w-5 text-trinks-orange" />
              <span>Estatísticas Rápidas</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm text-green-700 font-medium">Agendamentos Hoje</p>
                <p className="text-2xl font-bold text-green-800">28</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
            
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm text-blue-700 font-medium">Tempo Médio</p>
                <p className="text-2xl font-bold text-blue-800">45min</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="text-sm text-yellow-700 font-medium">Taxa Ocupação</p>
                <p className="text-2xl font-bold text-yellow-800">87%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
