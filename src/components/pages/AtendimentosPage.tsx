import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Scissors,
  Crown,
  Medal,
  Award,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const AtendimentosPage: React.FC = () => {
  const [periodo, setPeriodo] = useState('semanal');

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
          crescimento: '+15%'
        };
      case 'semanal':
        return {
          total: 105,
          crescimento: '+12%'
        };
      case 'mensal':
        return {
          total: 360,
          crescimento: '+8%'
        };
      case 'trimestral':
        return {
          total: 950,
          crescimento: '+18%'
        };
      case 'anual':
        return {
          total: 4200,
          crescimento: '+7%'
        };
      default:
        return {
          total: 52,
          crescimento: '+15%'
        };
    }
  };

  const getCurrentData = () => {
    return mockAtendimentosPorPeriodo[periodo as keyof typeof mockAtendimentosPorPeriodo] || mockAtendimentosPorPeriodo.semanal;
  };

  const metrics = getMetricsByPeriod(periodo);

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      case 'stable':
        return <Minus className="h-4 w-4 text-orange-400" />;
      default:
        return <Minus className="h-4 w-4 text-orange-400" />;
    }
  };

  const getRankIcon = (posicao: number) => {
    switch (posicao) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-orange-300" />;
      case 3:
        return <Award className="h-5 w-5 text-orange-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-orange-50 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-sm border border-orange-100">
        <div>
          <h1 className="text-3xl font-bold text-orange-900">Atendimentos</h1>
          <p className="text-orange-600 mt-1">Análise de performance e serviços mais procurados</p>
        </div>
      </div>

      {/* Card de Métrica com Filtros */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-white shadow-sm border border-orange-100 hover:shadow-md transition-shadow rounded-xl">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-orange-600">Total de Atendimentos</CardTitle>
              <div className="bg-orange-100 p-2 rounded-lg">
                <Users className="h-4 w-4 text-orange-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-orange-900 mb-2">{metrics.total}</div>
            <p className="text-xs text-green-600">
              {metrics.crescimento} em relação ao período anterior
            </p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-white shadow-sm border border-orange-100 hover:shadow-md transition-shadow rounded-xl">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'diario', label: 'Hoje' },
                { key: 'semanal', label: 'Semanal' },
                { key: 'mensal', label: 'Mensal' },
                { key: 'trimestral', label: 'Trimestral' },
                { key: 'anual', label: 'Anual' }
              ].map((filter) => (
                <Button
                  key={filter.key}
                  onClick={() => setPeriodo(filter.key)}
                  size="sm"
                  className={`transition-all rounded-lg ${
                    periodo === filter.key
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                      : 'bg-white hover:bg-orange-50 text-orange-700 border border-orange-200 hover:border-orange-300 shadow-sm'
                  }`}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Atendimentos por Período */}
      <Card className="bg-white shadow-sm border border-orange-100 rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-orange-900">
            <span>Atendimentos por {periodo === 'diario' ? 'Hora' : periodo === 'semanal' ? 'Dia' : periodo === 'mensal' ? 'Semana' : periodo === 'trimestral' ? 'Mês' : 'Ano'}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={getCurrentData()}>
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
              <Bar dataKey="atendimentos" fill="#ea580c" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top 3 Serviços Mais Realizados */}
      <Card className="bg-white shadow-sm border border-orange-100 rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-orange-900">
            <Scissors className="h-5 w-5 text-orange-600" />
            <span>Top 3 Serviços Mais Procurados</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTopServicos.map((servico, index) => (
              <div 
                key={servico.posicao}
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
                  index === 0 ? 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100' :
                  index === 1 ? 'border-orange-200 bg-orange-50 hover:bg-orange-100' :
                  'border-orange-300 bg-orange-100 hover:bg-orange-150'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getRankIcon(servico.posicao)}
                    <span className="text-2xl font-bold text-orange-700">#{servico.posicao}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-orange-900">{servico.servico}</h3>
                    <p className="text-sm text-orange-600">
                      {servico.quantidade} atendimentos • {servico.percentual}% do total
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={servico.tendencia === 'up' ? 'default' : 'secondary'} className="flex items-center space-x-1 bg-white border border-orange-200">
                    {getTrendIcon(servico.tendencia)}
                    <span>{servico.variacao}</span>
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
