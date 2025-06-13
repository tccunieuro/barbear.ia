
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown,
  Loader2
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAtendimentos } from '@/hooks/useAtendimentos';
import { useTransacoes } from '@/hooks/useTransacoes';
import { useServicos } from '@/hooks/useServicos';

export const Dashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('semanal');
  
  const { data: atendimentos = [], isLoading: loadingAtendimentos } = useAtendimentos();
  const { data: transacoes = [], isLoading: loadingTransacoes } = useTransacoes();
  const { data: servicos = [], isLoading: loadingServicos } = useServicos();

  // Calcular métricas financeiras
  const totalReceitas = transacoes
    .filter(t => t.tipo === 'receita')
    .reduce((sum, t) => sum + Number(t.valor), 0);
  
  const totalDespesas = transacoes
    .filter(t => t.tipo === 'despesa')
    .reduce((sum, t) => sum + Number(t.valor), 0);
  
  const lucroLiquido = totalReceitas - totalDespesas;

  // Calcular top 3 serviços
  const calcularTopServicos = () => {
    if (!atendimentos.length) return [];

    const servicoCount: { [key: string]: { nome: string; count: number } } = {};
    
    atendimentos.forEach(atendimento => {
      if (atendimento.servico_id && atendimento.servicos?.nome) {
        const nomeServico = atendimento.servicos.nome;
        if (servicoCount[nomeServico]) {
          servicoCount[nomeServico].count++;
        } else {
          servicoCount[nomeServico] = { nome: nomeServico, count: 1 };
        }
      }
    });

    return Object.values(servicoCount)
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);
  };

  const topServicos = calcularTopServicos();
  const servicoMaisPopular = topServicos.length > 0 ? topServicos[0] : null;

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const calcularMediaPorDia = () => {
    if (!atendimentos.length) return 0;
    
    const diasUnicos = new Set(
      atendimentos.map(a => a.data_atendimento)
    );
    
    return diasUnicos.size > 0 ? (atendimentos.length / diasUnicos.size).toFixed(1) : '0';
  };

  if (loadingAtendimentos || loadingTransacoes || loadingServicos) {
    return (
      <div className="p-6 space-y-6 bg-orange-50 min-h-full flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-orange-600" />
          <span className="text-orange-700">Carregando dashboard...</span>
        </div>
      </div>
    );
  }

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
                        <p className="text-3xl font-bold text-orange-900">{formatarMoeda(totalReceitas)}</p>
                        <p className="text-sm text-orange-600">Total de receitas</p>
                      </div>
                      <div className="flex items-center text-green-600 bg-green-50 p-2 rounded-lg">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">Total</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-sm border border-orange-100 hover:shadow-md transition-shadow rounded-xl">
                  <CardContent className="pt-6">
                    <div>
                      <p className="text-sm font-medium text-orange-600">Despesas</p>
                      <p className="text-3xl font-bold text-orange-900">{formatarMoeda(totalDespesas)}</p>
                      <p className="text-sm text-orange-600">Total do período</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-sm border border-orange-100 hover:shadow-md transition-shadow rounded-xl">
                  <CardContent className="pt-6">
                    <div>
                      <p className="text-sm font-medium text-orange-600">Lucro Líquido</p>
                      <p className={`text-3xl font-bold ${lucroLiquido >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatarMoeda(lucroLiquido)}
                      </p>
                      <p className="text-sm text-orange-600">Receitas - Despesas</p>
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
                        <p className="text-3xl font-bold text-orange-900">{atendimentos.length}</p>
                        <p className="text-sm text-orange-600">Atendimentos registrados</p>
                      </div>
                      <div className="flex items-center text-orange-600 bg-orange-50 p-2 rounded-lg">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">Total</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-sm border border-orange-100 hover:shadow-md transition-shadow rounded-xl">
                  <CardContent className="pt-6">
                    <div>
                      <p className="text-sm font-medium text-orange-600">Média por Dia</p>
                      <p className="text-3xl font-bold text-orange-900">{calcularMediaPorDia()}</p>
                      <p className="text-sm text-orange-600">Baseado nos atendimentos</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-sm border border-orange-100 hover:shadow-md transition-shadow rounded-xl">
                  <CardContent className="pt-6">
                    <div>
                      <p className="text-sm font-medium text-orange-600">Serviço Mais Popular</p>
                      <p className="text-2xl font-bold text-orange-900">
                        {servicoMaisPopular ? servicoMaisPopular.nome : 'Nenhum'}
                      </p>
                      <p className="text-sm text-orange-600">
                        {servicoMaisPopular ? `${servicoMaisPopular.count} atendimentos` : 'Registre atendimentos'}
                      </p>
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
                {topServicos.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-orange-600 text-lg">Nenhum serviço encontrado</p>
                    <p className="text-orange-500 text-sm mt-2">
                      Registre seus primeiros atendimentos para ver as estatísticas
                    </p>
                  </div>
                ) : (
                  topServicos.map((service, index) => (
                    <div
                      key={service.nome}
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
                          <p className="font-medium text-orange-900">{service.nome}</p>
                          <p className="text-sm text-orange-600">
                            {service.count} atendimentos
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
