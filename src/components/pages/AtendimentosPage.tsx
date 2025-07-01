import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Scissors,
  Crown,
  Medal,
  Award,
  Loader2
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAtendimentos } from '@/hooks/useAtendimentos';
import { useServicos } from '@/hooks/useServicos';

export const AtendimentosPage: React.FC = () => {
  const [periodo, setPeriodo] = useState('semanal');
  const { data: atendimentos = [], isLoading: loadingAtendimentos } = useAtendimentos();
  const { data: servicos = [], isLoading: loadingServicos } = useServicos();

  // Processar dados dos atendimentos para gráficos com inteligência aprimorada
  const processarDadosGrafico = (period: string) => {
    if (!atendimentos.length) return [];

    const hoje = new Date();
    let dadosFiltrados: any[] = [];

    switch (period) {
      case 'diario':
        // Últimas 8 horas do dia atual
        for (let i = 7; i >= 0; i--) {
          const hora = new Date(hoje);
          hora.setHours(hoje.getHours() - i);
          const horaStr = hora.getHours().toString().padStart(2, '0') + 'h';
          
          const count = atendimentos.filter(a => {
            const dataAtendimento = new Date(a.data_atendimento + 'T' + a.hora_inicio);
            return dataAtendimento.getHours() === hora.getHours() && 
                   dataAtendimento.toDateString() === hoje.toDateString();
          }).length;

          dadosFiltrados.push({ nome: horaStr, atendimentos: count });
        }
        break;

      case 'semanal':
        // Últimos 7 dias organizados: Segunda, Terça, Quarta, Quinta, Sexta, Sábado, Domingo
        const diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
        
        // Calcular segunda-feira da semana atual
        const inicioSemana = new Date(hoje);
        const diaSemana = hoje.getDay();
        const diasParaSegunda = diaSemana === 0 ? -6 : 1 - diaSemana; // Se domingo (0), volta 6 dias
        inicioSemana.setDate(hoje.getDate() + diasParaSegunda);
        
        for (let i = 0; i < 7; i++) {
          const data = new Date(inicioSemana);
          data.setDate(inicioSemana.getDate() + i);
          
          const count = atendimentos.filter(a => {
            const dataAtendimento = new Date(a.data_atendimento);
            return dataAtendimento.toDateString() === data.toDateString();
          }).length;

          dadosFiltrados.push({ 
            nome: diasSemana[i], 
            atendimentos: count 
          });
        }
        break;

      case 'mensal':
        // Últimos 12 meses
        const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        for (let i = 11; i >= 0; i--) {
          const mes = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
          const proximoMes = new Date(hoje.getFullYear(), hoje.getMonth() - i + 1, 0);

          const count = atendimentos.filter(a => {
            const dataAtendimento = new Date(a.data_atendimento);
            return dataAtendimento >= mes && dataAtendimento <= proximoMes;
          }).length;

          dadosFiltrados.push({ 
            nome: `${meses[mes.getMonth()]} ${mes.getFullYear()}`, 
            atendimentos: count 
          });
        }
        break;

      case 'trimestral':
        // Últimos 4 trimestres
        const trimestres = [
          { nome: 'Jan-Mar', meses: [0, 1, 2] },
          { nome: 'Abr-Jun', meses: [3, 4, 5] },
          { nome: 'Jul-Set', meses: [6, 7, 8] },
          { nome: 'Out-Dez', meses: [9, 10, 11] }
        ];

        const anoAtual = hoje.getFullYear();
        const mesAtual = hoje.getMonth();
        const trimestreAtual = Math.floor(mesAtual / 3);

        for (let i = 3; i >= 0; i--) {
          let ano = anoAtual;
          let trimestre = trimestreAtual - i;
          
          if (trimestre < 0) {
            ano--;
            trimestre += 4;
          }

          const inicioTrimestre = new Date(ano, trimestres[trimestre].meses[0], 1);
          const fimTrimestre = new Date(ano, trimestres[trimestre].meses[2] + 1, 0);

          const count = atendimentos.filter(a => {
            const dataAtendimento = new Date(a.data_atendimento);
            return dataAtendimento >= inicioTrimestre && dataAtendimento <= fimTrimestre;
          }).length;

          dadosFiltrados.push({ 
            nome: `${trimestres[trimestre].nome} ${ano}`, 
            atendimentos: count 
          });
        }
        break;

      case 'anual':
        // Últimos 3 anos
        for (let i = 2; i >= 0; i--) {
          const ano = hoje.getFullYear() - i;
          const inicioAno = new Date(ano, 0, 1);
          const fimAno = new Date(ano, 11, 31);

          const count = atendimentos.filter(a => {
            const dataAtendimento = new Date(a.data_atendimento);
            return dataAtendimento >= inicioAno && dataAtendimento <= fimAno;
          }).length;

          dadosFiltrados.push({ 
            nome: ano.toString(), 
            atendimentos: count 
          });
        }
        break;

      default:
        dadosFiltrados = [
          { nome: 'Seg', atendimentos: 0 },
          { nome: 'Ter', atendimentos: 0 },
          { nome: 'Qua', atendimentos: 0 },
          { nome: 'Qui', atendimentos: 0 },
          { nome: 'Sex', atendimentos: 0 },
          { nome: 'Sáb', atendimentos: 0 },
          { nome: 'Dom', atendimentos: 0 },
        ];
    }

    return dadosFiltrados;
  };

  // Calcular top 3 serviços
  const calcularTopServicos = () => {
    if (!atendimentos.length || !servicos.length) return [];

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
      .slice(0, 3)
      .map((servico, index) => ({
        posicao: index + 1,
        servico: servico.nome,
        quantidade: servico.count
      }));
  };

  const dadosGrafico = processarDadosGrafico(periodo);
  const topServicos = calcularTopServicos();

  const getRankIcon = (posicao: number) => {
    switch (posicao) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-orange-400" />;
      case 3:
        return <Award className="h-5 w-5 text-orange-600" />;
      default:
        return null;
    }
  };

  if (loadingAtendimentos || loadingServicos) {
    return (
      <div className="p-4 md:p-6 space-y-6 bg-orange-50 dark:bg-gray-900 min-h-full flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-orange-600" />
          <span className="text-orange-700 dark:text-orange-300">Carregando atendimentos...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 bg-orange-50 dark:bg-gray-900 min-h-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-sm border border-orange-100 dark:border-gray-700">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-orange-900 dark:text-white">Atendimentos</h1>
          <p className="text-orange-700 dark:text-orange-300 mt-1">Análise de performance e serviços mais procurados</p>
        </div>
      </div>

      {/* Card de Métrica com Filtros */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <Card className="bg-white dark:bg-gray-800 shadow-sm border border-orange-200 dark:border-gray-700 hover:shadow-md transition-shadow rounded-xl">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-400">Total de Atendimentos</CardTitle>
              <div className="bg-orange-100 dark:bg-orange-900/20 p-2 rounded-lg">
                <Users className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-orange-900 dark:text-white">{atendimentos.length}</div>
            <p className="text-xs text-orange-600 dark:text-orange-400">
              Total de atendimentos registrados
            </p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-white dark:bg-gray-800 shadow-sm border border-orange-200 dark:border-gray-700 hover:shadow-md transition-shadow rounded-xl">
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
                      : 'bg-white dark:bg-gray-700 hover:bg-orange-50 dark:hover:bg-gray-600 text-orange-700 dark:text-gray-300 border border-orange-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-gray-500 shadow-sm'
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
      <Card className="bg-white dark:bg-gray-800 shadow-sm border border-orange-200 dark:border-gray-700 rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-orange-900 dark:text-white">
            <span>Atendimentos por {
              periodo === 'diario' ? 'Hora' : 
              periodo === 'semanal' ? 'Dia' : 
              periodo === 'mensal' ? 'Mês' : 
              periodo === 'trimestral' ? 'Trimestre' : 
              'Ano'
            }</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {dadosGrafico.length > 0 ? (
            <div className="w-full overflow-x-auto">
              <div style={{ minWidth: '600px', width: '100%', height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dadosGrafico}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
                    <XAxis 
                      dataKey="nome" 
                      stroke="#ea580c"
                      fontSize={12}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis stroke="#ea580c" fontSize={12} />
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
              </div>
            </div>
          ) : (
            <div className="h-300 flex items-center justify-center text-orange-600 dark:text-orange-400">
              Nenhum atendimento encontrado para este período
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top 3 Serviços Mais Realizados */}
      <Card className="bg-white dark:bg-gray-800 shadow-sm border border-orange-200 dark:border-gray-700 rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-orange-900 dark:text-white">
            <Scissors className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            <span>Top 3 Serviços Mais Procurados</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {topServicos.length > 0 ? (
            <div className="space-y-4">
              {topServicos.map((servico, index) => (
                <div 
                  key={servico.posicao}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
                    index === 0 ? 'border-yellow-200 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30' :
                    index === 1 ? 'border-orange-200 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30' :
                    'border-orange-300 dark:border-orange-600 bg-orange-100 dark:bg-orange-800/20 hover:bg-orange-150 dark:hover:bg-orange-800/30'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getRankIcon(servico.posicao)}
                      <span className="text-2xl font-bold text-orange-800 dark:text-orange-200">#{servico.posicao}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-orange-900 dark:text-white">{servico.servico}</h3>
                      <p className="text-sm text-orange-700 dark:text-orange-300">
                        {servico.quantidade} atendimentos
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Scissors className="h-12 w-12 text-orange-300 dark:text-orange-600 mx-auto mb-4" />
              <p className="text-orange-600 dark:text-orange-400 text-lg">Nenhum serviço encontrado</p>
              <p className="text-orange-500 dark:text-orange-500 text-sm mt-2">
                Registre seus primeiros atendimentos para ver as estatísticas
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
