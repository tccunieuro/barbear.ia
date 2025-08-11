import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedQuarter, setSelectedQuarter] = useState(Math.floor(new Date().getMonth() / 3));
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  const { data: atendimentos = [], isLoading: loadingAtendimentos } = useAtendimentos();
  const { data: transacoes = [], isLoading: loadingTransacoes } = useTransacoes();
  const { data: servicos = [], isLoading: loadingServicos } = useServicos();

  // Função para obter início da semana (segunda-feira)
  const getStartOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Segunda-feira
    d.setDate(diff);
    d.setHours(0, 0, 0, 0); // Início do dia
    return d;
  };

  // Função para obter fim da semana (domingo)
  const getEndOfWeek = (startOfWeek: Date) => {
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999); // Final do dia
    return endOfWeek;
  };

  // Filtrar dados por período
  const filtrarDados = () => {
    const hoje = new Date();
    let dadosFiltrados = { atendimentos: atendimentos, transacoes: transacoes };

    switch (selectedPeriod) {
      case 'semanal':
        // Apenas semana atual
        const inicioSemana = getStartOfWeek(hoje);
        const fimSemana = getEndOfWeek(inicioSemana);

        dadosFiltrados.atendimentos = atendimentos.filter(a => {
          const dataAtendimento = new Date(a.data_atendimento + 'T00:00:00');
          return dataAtendimento >= inicioSemana && dataAtendimento <= fimSemana;
        });

        dadosFiltrados.transacoes = transacoes.filter(t => {
          const dataTransacao = new Date(t.data_transacao + 'T00:00:00');
          return dataTransacao >= inicioSemana && dataTransacao <= fimSemana;
        });
        break;

      case 'mensal':
        dadosFiltrados.atendimentos = atendimentos.filter(a => {
          const dataAtendimento = new Date(a.data_atendimento);
          return dataAtendimento.getMonth() === selectedMonth && 
                 dataAtendimento.getFullYear() === new Date().getFullYear();
        });

        dadosFiltrados.transacoes = transacoes.filter(t => {
          const dataTransacao = new Date(t.data_transacao);
          return dataTransacao.getMonth() === selectedMonth && 
                 dataTransacao.getFullYear() === new Date().getFullYear();
        });
        break;

      case 'trimestral':
        const mesInicio = selectedQuarter * 3;
        const mesFim = mesInicio + 2;

        dadosFiltrados.atendimentos = atendimentos.filter(a => {
          const dataAtendimento = new Date(a.data_atendimento);
          const mes = dataAtendimento.getMonth();
          return mes >= mesInicio && mes <= mesFim && 
                 dataAtendimento.getFullYear() === new Date().getFullYear();
        });

        dadosFiltrados.transacoes = transacoes.filter(t => {
          const dataTransacao = new Date(t.data_transacao);
          const mes = dataTransacao.getMonth();
          return mes >= mesInicio && mes <= mesFim && 
                 dataTransacao.getFullYear() === new Date().getFullYear();
        });
        break;

      case 'anual':
        dadosFiltrados.atendimentos = atendimentos.filter(a => {
          const dataAtendimento = new Date(a.data_atendimento);
          return dataAtendimento.getFullYear() === selectedYear;
        });

        dadosFiltrados.transacoes = transacoes.filter(t => {
          const dataTransacao = new Date(t.data_transacao);
          return dataTransacao.getFullYear() === selectedYear;
        });
        break;
    }

    return dadosFiltrados;
  };

  const dadosFiltrados = filtrarDados();

  // Calcular métricas financeiras com dados filtrados
  const totalReceitas = dadosFiltrados.transacoes
    .filter(t => t.tipo === 'receita')
    .reduce((sum, t) => sum + Number(t.valor), 0);
  
  const totalDespesas = dadosFiltrados.transacoes
    .filter(t => t.tipo === 'despesa')
    .reduce((sum, t) => sum + Number(t.valor), 0);
  
  const lucroLiquido = totalReceitas - totalDespesas;

  // Calcular top 3 serviços com dados filtrados
  const calcularTopServicos = () => {
    if (!dadosFiltrados.atendimentos.length) return [];

    const servicoCount: { [key: string]: { nome: string; count: number } } = {};
    
    dadosFiltrados.atendimentos.forEach(atendimento => {
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
    if (!dadosFiltrados.atendimentos.length) return 0;
    
    const diasUnicos = new Set(
      dadosFiltrados.atendimentos.map(a => a.data_atendimento)
    );
    
    return diasUnicos.size > 0 ? (dadosFiltrados.atendimentos.length / diasUnicos.size).toFixed(1) : '0';
  };

  // Gerar anos disponíveis
  const anosDisponiveis = () => {
    const anos = new Set<number>();
    atendimentos.forEach(a => {
      anos.add(new Date(a.data_atendimento).getFullYear());
    });
    transacoes.forEach(t => {
      anos.add(new Date(t.data_transacao).getFullYear());
    });
    return Array.from(anos).sort((a, b) => b - a);
  };

  const renderPeriodSelector = () => {
    switch (selectedPeriod) {
      case 'semanal':
        // Removido - não precisa de seletor para semana atual
        return null;

      case 'mensal':
        return (
          <Select value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(parseInt(value))}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Selecione o mês" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => (
                <SelectItem key={i} value={i.toString()}>
                  {new Date(2024, i, 1).toLocaleDateString('pt-BR', { month: 'long' })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'trimestral':
        return (
          <Select value={selectedQuarter.toString()} onValueChange={(value) => setSelectedQuarter(parseInt(value))}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Selecione o trimestre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">1º Trimestre (Jan-Mar)</SelectItem>
              <SelectItem value="1">2º Trimestre (Abr-Jun)</SelectItem>
              <SelectItem value="2">3º Trimestre (Jul-Set)</SelectItem>
              <SelectItem value="3">4º Trimestre (Out-Dez)</SelectItem>
            </SelectContent>
          </Select>
        );

      case 'anual':
        return (
          <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Selecione o ano" />
            </SelectTrigger>
            <SelectContent>
              {anosDisponiveis().map(ano => (
                <SelectItem key={ano} value={ano.toString()}>
                  {ano}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      default:
        return null;
    }
  };

  if (loadingAtendimentos || loadingTransacoes || loadingServicos) {
    return (
      <div className="p-6 space-y-6 bg-orange-50 dark:bg-gray-900 min-h-full flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-orange-600" />
          <span className="text-orange-700 dark:text-orange-300">Carregando dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-orange-50 dark:bg-gray-900 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-orange-100 dark:border-gray-700">
        <div>
          <h1 className="text-3xl font-bold text-orange-900 dark:text-white">Dashboard</h1>
          <p className="text-orange-600 dark:text-orange-300 mt-1">Visão geral do seu negócio</p>
        </div>
      </div>

      {/* Period Tabs - Fixed structure */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-orange-100 dark:border-gray-700">
        <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
            <TabsList className="grid w-full grid-cols-4 bg-orange-100 dark:bg-gray-700 p-1 rounded-lg">
              <TabsTrigger 
                value="semanal" 
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-orange-900 dark:data-[state=active]:text-white data-[state=active]:shadow-sm text-orange-600 dark:text-gray-300 hover:text-orange-900 dark:hover:text-white transition-all rounded-md"
              >
                Semanal
              </TabsTrigger>
              <TabsTrigger 
                value="mensal"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-orange-900 dark:data-[state=active]:text-white data-[state=active]:shadow-sm text-orange-600 dark:text-gray-300 hover:text-orange-900 dark:hover:text-white transition-all rounded-md"
              >
                Mensal
              </TabsTrigger>
              <TabsTrigger 
                value="trimestral"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-orange-900 dark:data-[state=active]:text-white data-[state=active]:shadow-sm text-orange-600 dark:text-gray-300 hover:text-orange-900 dark:hover:text-white transition-all rounded-md"
              >
                Trimestral
              </TabsTrigger>
              <TabsTrigger 
                value="anual"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-orange-900 dark:data-[state=active]:text-white data-[state=active]:shadow-sm text-orange-600 dark:text-gray-300 hover:text-orange-900 dark:hover:text-white transition-all rounded-md"
              >
                Anual
              </TabsTrigger>
            </TabsList>
            
            {renderPeriodSelector()}
          </div>

          <TabsContent value={selectedPeriod} className="space-y-6 mt-6">
            {/* Métricas Financeiras */}
            <div>
              <h2 className="text-xl font-bold text-orange-900 dark:text-white mb-4">Métricas Financeiras</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="bg-white dark:bg-gray-800 shadow-sm border border-orange-100 dark:border-gray-700 hover:shadow-md transition-shadow rounded-xl">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Faturamento</p>
                        <p className="text-3xl font-bold text-orange-900 dark:text-white">{formatarMoeda(totalReceitas)}</p>
                        <p className="text-sm text-orange-600 dark:text-orange-400">Total de receitas</p>
                      </div>
                      <div className="flex items-center text-green-600 bg-green-50 dark:bg-green-900/20 p-2 rounded-lg">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">Total</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 shadow-sm border border-orange-100 dark:border-gray-700 hover:shadow-md transition-shadow rounded-xl">
                  <CardContent className="pt-6">
                    <div>
                      <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Despesas</p>
                      <p className="text-3xl font-bold text-orange-900 dark:text-white">{formatarMoeda(totalDespesas)}</p>
                      <p className="text-sm text-orange-600 dark:text-orange-400">Total do período</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 shadow-sm border border-orange-100 dark:border-gray-700 hover:shadow-md transition-shadow rounded-xl">
                  <CardContent className="pt-6">
                    <div>
                      <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Lucro Líquido</p>
                      <p className={`text-3xl font-bold ${lucroLiquido >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatarMoeda(lucroLiquido)}
                      </p>
                      <p className="text-sm text-orange-600 dark:text-orange-400">Receitas - Despesas</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Atendimentos */}
              <h2 className="text-xl font-bold text-orange-900 dark:text-white mb-4">Atendimentos</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="bg-white dark:bg-gray-800 shadow-sm border border-orange-100 dark:border-gray-700 hover:shadow-md transition-shadow rounded-xl">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Total de Atendimentos</p>
                        <p className="text-3xl font-bold text-orange-900 dark:text-white">{dadosFiltrados.atendimentos.length}</p>
                        <p className="text-sm text-orange-600 dark:text-orange-400">Atendimentos do período</p>
                      </div>
                      <div className="flex items-center text-orange-600 bg-orange-50 dark:bg-orange-900/20 p-2 rounded-lg">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">Total</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 shadow-sm border border-orange-100 dark:border-gray-700 hover:shadow-md transition-shadow rounded-xl">
                  <CardContent className="pt-6">
                    <div>
                      <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Média por Dia</p>
                      <p className="text-3xl font-bold text-orange-900 dark:text-white">{calcularMediaPorDia()}</p>
                      <p className="text-sm text-orange-600 dark:text-orange-400">Baseado no período</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 shadow-sm border border-orange-100 dark:border-gray-700 hover:shadow-md transition-shadow rounded-xl">
                  <CardContent className="pt-6">
                    <div>
                      <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Serviço Mais Popular</p>
                      <p className="text-2xl font-bold text-orange-900 dark:text-white">
                        {servicoMaisPopular ? servicoMaisPopular.nome : 'Nenhum'}
                      </p>
                      <p className="text-sm text-orange-600 dark:text-orange-400">
                        {servicoMaisPopular ? `${servicoMaisPopular.count} atendimentos` : 'Registre atendimentos'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Top 3 Serviços Mais Realizados */}
            <Card className="bg-white dark:bg-gray-800 shadow-sm border border-orange-100 dark:border-gray-700 rounded-xl">
              <CardHeader>
                <CardTitle className="text-orange-900 dark:text-white">Top 3 Serviços Mais Realizados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topServicos.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-orange-600 dark:text-orange-400 text-lg">Nenhum serviço encontrado</p>
                    <p className="text-orange-500 dark:text-orange-500 text-sm mt-2">
                      Registre seus primeiros atendimentos para ver as estatísticas
                    </p>
                  </div>
                ) : (
                  topServicos.map((service, index) => (
                    <div
                      key={service.nome}
                      className="flex items-center justify-between p-4 rounded-lg border border-orange-100 dark:border-gray-600 bg-orange-50 dark:bg-gray-700 hover:bg-orange-100 dark:hover:bg-gray-600 transition-colors"
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
                          <p className="font-medium text-orange-900 dark:text-white">{service.nome}</p>
                          <p className="text-sm text-orange-600 dark:text-orange-400">
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
