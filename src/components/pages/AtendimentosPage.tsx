
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedQuarter, setSelectedQuarter] = useState(Math.floor(new Date().getMonth() / 3));
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const { data: atendimentos = [], isLoading: loadingAtendimentos } = useAtendimentos();
  const { data: servicos = [], isLoading: loadingServicos } = useServicos();

  // Função para obter início da semana (segunda-feira)
  const getStartOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Segunda-feira
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  // Função para obter fim da semana (domingo)
  const getEndOfWeek = (startOfWeek: Date) => {
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    return endOfWeek;
  };

  // Filtrar atendimentos por período (usando a mesma lógica da dashboard)
  const filtrarAtendimentos = () => {
    const hoje = new Date();

    switch (periodo) {
      case 'semanal': {
        const inicioSemana = getStartOfWeek(hoje);
        const fimSemana = getEndOfWeek(inicioSemana);
        return atendimentos.filter(a => {
          const dataAtendimento = new Date(a.data_atendimento + 'T00:00:00');
          return dataAtendimento >= inicioSemana && dataAtendimento <= fimSemana;
        });
      }

      case 'mensal':
        return atendimentos.filter(a => {
          const dataAtendimento = new Date(a.data_atendimento);
          return (
            dataAtendimento.getMonth() === selectedMonth &&
            dataAtendimento.getFullYear() === new Date().getFullYear()
          );
        });

      case 'trimestral': {
        const mesInicio = selectedQuarter * 3;
        const mesFim = mesInicio + 2;
        return atendimentos.filter(a => {
          const dataAtendimento = new Date(a.data_atendimento);
          const mes = dataAtendimento.getMonth();
          return (
            mes >= mesInicio &&
            mes <= mesFim &&
            dataAtendimento.getFullYear() === new Date().getFullYear()
          );
        });
      }

      case 'anual':
        return atendimentos.filter(a => {
          const dataAtendimento = new Date(a.data_atendimento);
          return dataAtendimento.getFullYear() === selectedYear;
        });

      case 'diario':
      default:
        return atendimentos.filter(a => {
          const dataAtendimento = new Date(a.data_atendimento + 'T00:00:00');
          const hoje = new Date();
          return (
            dataAtendimento.getDate() === hoje.getDate() &&
            dataAtendimento.getMonth() === hoje.getMonth() &&
            dataAtendimento.getFullYear() === hoje.getFullYear()
          );
        });
    }
  };


  // Processar dados dos atendimentos para gráficos
  const processarDadosGrafico = (period: string) => {
    const atendimentosFiltrados = filtrarAtendimentos();
    if (!atendimentosFiltrados.length) return [];

    const hoje = new Date();
    let dadosFiltrados: any[] = [];

    switch (period) {
      case 'diario':
        // Horário de funcionamento da barbearia: 9:00 às 20:00
        for (let hora = 9; hora <= 20; hora++) {
          const horaStr = hora.toString().padStart(2, '0') + 'h';
          
          const count = atendimentosFiltrados.filter(a => {
            const horaInicio = parseInt(a.hora_inicio.split(':')[0]);
            return horaInicio === hora;
          }).length;

          dadosFiltrados.push({ nome: horaStr, atendimentos: count });
        }
        break;

      case 'semanal':
        const diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
        const inicioSemana = getStartOfWeek(hoje);
        
        for (let i = 0; i < 7; i++) {
          const data = new Date(inicioSemana);
          data.setDate(inicioSemana.getDate() + i);
          
          const count = atendimentosFiltrados.filter(a => {
            const dataAtendimento = new Date(a.data_atendimento + 'T00:00:00');
            return dataAtendimento.toDateString() === data.toDateString();
          }).length;

          dadosFiltrados.push({ 
            nome: diasSemana[i], 
            atendimentos: count 
          });
        }
        break;

      case 'mensal':
        // Todos os dias do mês selecionado
        const diasNoMes = new Date(new Date().getFullYear(), selectedMonth + 1, 0).getDate();
        for (let dia = 1; dia <= diasNoMes; dia++) {
          const count = atendimentosFiltrados.filter(a => {
            const dataAtendimento = new Date(a.data_atendimento + 'T00:00:00');
            return dataAtendimento.getDate() === dia && dataAtendimento.getMonth() === selectedMonth;
          }).length;
          
          dadosFiltrados.push({ 
            nome: `${dia}/${selectedMonth + 1}`, 
            atendimentos: count 
          });
        }
        break;

      case 'trimestral':
        // Meses do trimestre selecionado
        const mesesTrimestre = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        const mesInicioTrim = selectedQuarter * 3;
        
        for (let i = 0; i < 3; i++) {
          const mesAtual = mesInicioTrim + i;
          const count = atendimentosFiltrados.filter(a => {
            const dataAtendimento = new Date(a.data_atendimento);
            return dataAtendimento.getMonth() === mesAtual;
          }).length;
          
          dadosFiltrados.push({ 
            nome: mesesTrimestre[mesAtual], 
            atendimentos: count 
          });
        }
        break;

      case 'anual':
        // Meses do ano selecionado
        const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        for (let mes = 0; mes < 12; mes++) {
          const count = atendimentosFiltrados.filter(a => {
            const dataAtendimento = new Date(a.data_atendimento);
            return dataAtendimento.getMonth() === mes;
          }).length;
          
          dadosFiltrados.push({ 
            nome: meses[mes], 
            atendimentos: count 
          });
        }
        break;

      default:
        dadosFiltrados = [];
    }

    return dadosFiltrados;
  };

  // Calcular top 3 serviços baseado no período filtrado
  const calcularTopServicos = () => {
    const atendimentosFiltrados = filtrarAtendimentos();
    if (!atendimentosFiltrados.length || !servicos.length) return [];

    const servicoCount: { [key: string]: { nome: string; count: number } } = {};
    
    atendimentosFiltrados.forEach(atendimento => {
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

  // Gerar anos disponíveis
  const anosDisponiveis = () => {
    const anos = new Set<number>();
    atendimentos.forEach(a => {
      anos.add(new Date(a.data_atendimento).getFullYear());
    });
    return Array.from(anos).sort((a, b) => b - a);
  };

  // Renderizar seletor de período específico
  const renderPeriodSelector = () => {
    switch (periodo) {
      case 'semanal':
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
            <div className="text-2xl font-bold text-orange-900 dark:text-white">
              {filtrarAtendimentos().length}
            </div>
            <p className="text-xs text-orange-600 dark:text-orange-400">
              {periodo === 'diario' ? 'Atendimentos de hoje' :
               periodo === 'semanal' ? 'Atendimentos desta semana' :
               periodo === 'mensal' ? 'Atendimentos do período mensal' :
               periodo === 'trimestral' ? 'Atendimentos do período trimestral' :
               'Atendimentos do período anual'}
            </p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-white dark:bg-gray-800 shadow-sm border border-orange-200 dark:border-gray-700 hover:shadow-md transition-shadow rounded-xl">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
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
              {renderPeriodSelector()}
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
