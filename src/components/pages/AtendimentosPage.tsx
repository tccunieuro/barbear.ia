
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  Users, 
  Scissors,
  Crown,
  Medal,
  Award,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export const AtendimentosPage: React.FC = () => {
  const [periodo, setPeriodo] = useState('diario');

  // Mock data para todos os períodos
  const mockAtendimentosPorPeriodo = {
    diario: [
      { nome: '08h', atendimentos: 3 },
      { nome: '09h', atendimentos: 5 },
      { nome: '10h', atendimentos: 8 },
      { nome: '11h', atendimentos: 6 },
      { nome: '14h', atendimentos: 10 },
      { nome: '15h', atendimentos: 7 },
      { nome: '16h', atendimentos: 9 },
      { nome: '17h', atendimentos: 4 },
    ],
    semanal: [
      { nome: 'Seg', atendimentos: 12 },
      { nome: 'Ter', atendimentos: 8 },
      { nome: 'Qua', atendimentos: 15 },
      { nome: 'Qui', atendimentos: 10 },
      { nome: 'Sex', atendimentos: 18 },
      { nome: 'Sáb', atendimentos: 22 },
      { nome: 'Dom', atendimentos: 20 },
    ],
    mensal: [
      { nome: 'Sem 1', atendimentos: 85 },
      { nome: 'Sem 2', atendimentos: 92 },
      { nome: 'Sem 3', atendimentos: 78 },
      { nome: 'Sem 4', atendimentos: 105 },
    ],
    trimestral: [
      { nome: 'Jan', atendimentos: 320 },
      { nome: 'Fev', atendimentos: 280 },
      { nome: 'Mar', atendimentos: 350 },
    ],
    anual: [
      { nome: '2021', atendimentos: 3200 },
      { nome: '2022', atendimentos: 3600 },
      { nome: '2023', atendimentos: 3900 },
      { nome: '2024', atendimentos: 4200 },
    ]
  };

  const mockTendenciaAtendimentos = [
    { periodo: 'Per 1', atendimentos: 245 },
    { periodo: 'Per 2', atendimentos: 289 },
    { periodo: 'Per 3', atendimentos: 312 },
    { periodo: 'Per 4', atendimentos: 298 },
    { periodo: 'Per 5', atendimentos: 356 },
  ];

  const mockTopServicos = [
    { 
      posicao: 1, 
      servico: 'Corte Masculino', 
      quantidade: 156, 
      percentual: 45.2, 
      tendencia: 'up' as const,
      variacao: '+12%'
    },
    { 
      posicao: 2, 
      servico: 'Barba', 
      quantidade: 98, 
      percentual: 28.4, 
      tendencia: 'up' as const,
      variacao: '+8%'
    },
    { 
      posicao: 3, 
      servico: 'Corte + Barba', 
      quantidade: 67, 
      percentual: 19.4, 
      tendencia: 'stable' as const,
      variacao: '0%'
    },
  ];

  const getMetricsByPeriod = (period: string) => {
    switch (period) {
      case 'diario':
        return {
          total: 52,
          media: 6.5,
          pico: 10,
          crescimento: '+15%'
        };
      case 'semanal':
        return {
          total: 105,
          media: 15.0,
          pico: 22,
          crescimento: '+12%'
        };
      case 'mensal':
        return {
          total: 360,
          media: 11.6,
          pico: 105,
          crescimento: '+8%'
        };
      case 'trimestral':
        return {
          total: 950,
          media: 10.6,
          pico: 350,
          crescimento: '+18%'
        };
      case 'anual':
        return {
          total: 4200,
          media: 11.5,
          pico: 4200,
          crescimento: '+7%'
        };
      default:
        return {
          total: 52,
          media: 6.5,
          pico: 10,
          crescimento: '+15%'
        };
    }
  };

  const getCurrentData = () => {
    return mockAtendimentosPorPeriodo[periodo as keyof typeof mockAtendimentosPorPeriodo] || mockAtendimentosPorPeriodo.diario;
  };

  const metrics = getMetricsByPeriod(periodo);

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      case 'stable':
        return <Minus className="h-4 w-4 text-gray-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRankIcon = (posicao: number) => {
    switch (posicao) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-orange-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Atendimentos</h1>
          <p className="text-gray-600 mt-1">Análise de performance e serviços mais procurados</p>
        </div>
        <Select value={periodo} onValueChange={setPeriodo}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="diario">Diário</SelectItem>
            <SelectItem value="semanal">Semanal</SelectItem>
            <SelectItem value="mensal">Mensal</SelectItem>
            <SelectItem value="trimestral">Trimestral</SelectItem>
            <SelectItem value="anual">Anual</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Atendimentos</CardTitle>
            <Users className="h-4 w-4 text-trinks-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.total}</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              {metrics.crescimento} em relação ao período anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média por {periodo === 'diario' ? 'Hora' : periodo === 'semanal' ? 'Dia' : periodo === 'mensal' ? 'Semana' : periodo === 'trimestral' ? 'Mês' : 'Ano'}</CardTitle>
            <Calendar className="h-4 w-4 text-trinks-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.media}</div>
            <p className="text-xs text-gray-600">atendimentos por período</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pico do Período</CardTitle>
            <Clock className="h-4 w-4 text-trinks-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.pico}</div>
            <p className="text-xs text-gray-600">maior registro do período</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Crescimento</CardTitle>
            <TrendingUp className="h-4 w-4 text-trinks-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{metrics.crescimento}</div>
            <p className="text-xs text-gray-600">vs período anterior</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Atendimentos por Período */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart className="h-5 w-5 text-trinks-orange" />
              <span>Atendimentos por {periodo === 'diario' ? 'Hora' : periodo === 'semanal' ? 'Dia' : periodo === 'mensal' ? 'Semana' : periodo === 'trimestral' ? 'Mês' : 'Ano'}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getCurrentData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nome" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="atendimentos" fill="#E85A00" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tendência de Atendimentos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-trinks-orange" />
              <span>Tendência de Crescimento</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockTendenciaAtendimentos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="periodo" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="atendimentos" 
                  stroke="#E85A00" 
                  strokeWidth={3}
                  dot={{ fill: '#E85A00' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top 3 Serviços Mais Realizados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Scissors className="h-5 w-5 text-trinks-orange" />
            <span>Top 3 Serviços Mais Procurados</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTopServicos.map((servico, index) => (
              <div 
                key={servico.posicao}
                className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                  index === 0 ? 'border-yellow-200 bg-yellow-50' :
                  index === 1 ? 'border-gray-200 bg-gray-50' :
                  'border-orange-200 bg-orange-50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getRankIcon(servico.posicao)}
                    <span className="text-2xl font-bold text-gray-700">#{servico.posicao}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{servico.servico}</h3>
                    <p className="text-sm text-gray-600">
                      {servico.quantidade} atendimentos • {servico.percentual}% do total
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={servico.tendencia === 'up' ? 'default' : 'secondary'} className="flex items-center space-x-1">
                    {getTrendIcon(servico.tendencia)}
                    <span>{servico.variacao}</span>
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Distribuição por Horário */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-trinks-orange" />
            <span>Distribuição por Horário</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {[
              { hora: '08h', intensidade: 20 },
              { hora: '09h', intensidade: 45 },
              { hora: '10h', intensidade: 80 },
              { hora: '11h', intensidade: 90 },
              { hora: '14h', intensidade: 100 },
              { hora: '15h', intensidade: 95 },
              { hora: '16h', intensidade: 85 },
              { hora: '17h', intensidade: 70 },
            ].map((slot) => (
              <div key={slot.hora} className="text-center">
                <div 
                  className="w-full h-16 rounded-md mb-2 transition-all"
                  style={{
                    backgroundColor: `rgba(232, 90, 0, ${slot.intensidade / 100})`,
                  }}
                />
                <span className="text-xs font-medium">{slot.hora}</span>
                <p className="text-xs text-gray-500">{slot.intensidade}%</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
