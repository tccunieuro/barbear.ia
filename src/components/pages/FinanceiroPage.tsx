
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Calendar as CalendarIcon,
  Edit,
  Trash2,
  Loader2,
  X
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AdicionarDespesaModal } from './AdicionarDespesaModal';
import { AdicionarReceitaModal } from './AdicionarReceitaModal';
import { useTransacoes, useCreateTransacao, useDeleteTransacao } from '@/hooks/useTransacoes';

export const FinanceiroPage: React.FC = () => {
  const [modalDespesaOpen, setModalDespesaOpen] = useState(false);
  const [modalReceitaOpen, setModalReceitaOpen] = useState(false);
  const [editingDespesa, setEditingDespesa] = useState(null);
  
  const { data: transacoes = [], isLoading, error } = useTransacoes();
  const createTransacaoMutation = useCreateTransacao();
  const deleteTransacaoMutation = useDeleteTransacao();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  
  // Calcular totais
  const totalReceitas = transacoes
    .filter(t => t.tipo === 'receita')
    .reduce((sum, t) => sum + Number(t.valor), 0);
  
  const totalDespesas = transacoes
    .filter(t => t.tipo === 'despesa')
    .reduce((sum, t) => sum + Number(t.valor), 0);
  
  const lucroLiquido = totalReceitas - totalDespesas;

  // Filtrar transações por data selecionada ou mostrar apenas as últimas 5
  const transacoesFiltradas = selectedDate 
    ? transacoes.filter(t => {
        const dataTransacao = new Date(t.data_transacao);
        const dataSelecionada = new Date(selectedDate);
        return dataTransacao.toDateString() === dataSelecionada.toDateString();
      })
    : transacoes.slice(0, 5);

  // Processar dados para o gráfico (últimos 6 meses)
  const processarDadosGrafico = () => {
    const dados: { [key: string]: { receitas: number; despesas: number } } = {};
    const hoje = new Date();
    
    // Inicializar últimos 6 meses
    for (let i = 5; i >= 0; i--) {
      const mes = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
      const nomeMes = mes.toLocaleDateString('pt-BR', { month: 'short' });
      dados[nomeMes] = { receitas: 0, despesas: 0 };
    }

    // Agrupar transações por mês
    transacoes.forEach(transacao => {
      const dataTransacao = new Date(transacao.data_transacao);
      const nomeMes = dataTransacao.toLocaleDateString('pt-BR', { month: 'short' });
      
      if (dados[nomeMes]) {
        if (transacao.tipo === 'receita') {
          dados[nomeMes].receitas += Number(transacao.valor);
        } else {
          dados[nomeMes].despesas += Number(transacao.valor);
        }
      }
    });

    return Object.entries(dados).map(([nome, valores]) => ({
      nome,
      receitas: valores.receitas,
      despesas: valores.despesas
    }));
  };

  const dadosGrafico = processarDadosGrafico();

  const handleAddDespesa = (novaDespesa: any) => {
    const transacaoData = {
      tipo: 'despesa' as const,
      categoria: novaDespesa.categoria,
      descricao: novaDespesa.descricao,
      valor: Number(novaDespesa.valor),
      data_transacao: novaDespesa.data || new Date().toISOString().split('T')[0]
    };
    
    createTransacaoMutation.mutate(transacaoData);
  };

  const handleAddReceita = (novaReceita: any) => {
    const transacaoData = {
      tipo: 'receita' as const,
      categoria: novaReceita.categoria,
      descricao: novaReceita.descricao,
      valor: Number(novaReceita.valor),
      data_transacao: novaReceita.data || new Date().toISOString().split('T')[0]
    };
    
    createTransacaoMutation.mutate(transacaoData);
  };

  const handleDeleteTransacao = (id: string) => {
    deleteTransacaoMutation.mutate(id);
  };

  const formatarData = (dataString: string) => {
    return new Date(dataString).toLocaleDateString('pt-BR');
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-6 space-y-6 bg-orange-50 dark:bg-gray-900 min-h-full flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-orange-600" />
          <span className="text-orange-700 dark:text-orange-300">Carregando dados financeiros...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-6 space-y-6 bg-orange-50 dark:bg-gray-900 min-h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-2">Erro ao carregar dados financeiros</p>
          <p className="text-sm text-orange-700 dark:text-orange-300">Por favor, faça login para acessar seus dados</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 bg-orange-50 dark:bg-gray-900 min-h-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-sm border border-orange-200 dark:border-gray-700 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-orange-900 dark:text-white">Financeiro</h1>
          <p className="text-orange-700 dark:text-gray-300 mt-1">Controle completo das suas finanças</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            onClick={() => setModalReceitaOpen(true)}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md hover:shadow-lg transition-all rounded-lg w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Receita
          </Button>
          <Button 
            onClick={() => setModalDespesaOpen(true)}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md hover:shadow-lg transition-all rounded-lg w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Despesa
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Card className="bg-white dark:bg-gray-800 shadow-sm border border-orange-200 dark:border-gray-700 hover:shadow-md transition-shadow rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-400">Receitas</CardTitle>
            <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-lg">
              <ArrowUpRight className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900 dark:text-white">{formatarMoeda(totalReceitas)}</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              Total acumulado
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 shadow-sm border border-orange-200 dark:border-gray-700 hover:shadow-md transition-shadow rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-400">Despesas</CardTitle>
            <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">
              <ArrowDownRight className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900 dark:text-white">{formatarMoeda(totalDespesas)}</div>
            <p className="text-xs text-red-600 flex items-center mt-1">
              <TrendingDown className="h-3 w-3 mr-1" />
              Total acumulado
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 shadow-sm border border-orange-200 dark:border-gray-700 hover:shadow-md transition-shadow rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-400">Lucro</CardTitle>
            <div className="bg-orange-100 dark:bg-orange-900/20 p-2 rounded-lg">
              <DollarSign className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${lucroLiquido >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatarMoeda(lucroLiquido)}
            </div>
            <p className="text-xs text-orange-600 dark:text-orange-400 flex items-center mt-1">
              {lucroLiquido >= 0 ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              Receitas - Despesas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Receitas vs Despesas */}
      <Card className="bg-white dark:bg-gray-800 shadow-sm border border-orange-200 dark:border-gray-700 rounded-xl">
        <CardHeader>
          <CardTitle className="text-orange-900 dark:text-white">Receitas vs Despesas</CardTitle>
        </CardHeader>
        <CardContent>
          {dadosGrafico.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosGrafico}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
                <XAxis dataKey="nome" stroke="#ea580c" />
                <YAxis stroke="#ea580c" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #fed7aa',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => formatarMoeda(value)}
                />
                <Bar dataKey="receitas" fill="#10b981" name="Receitas" />
                <Bar dataKey="despesas" fill="#ef4444" name="Despesas" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-300 flex items-center justify-center text-orange-600 dark:text-orange-400">
              Nenhuma transação encontrada para gerar o gráfico
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lista de Transações - Layout Mobile Otimizado */}
      <Card className="bg-white dark:bg-gray-800 shadow-sm border border-orange-200 dark:border-gray-700 rounded-xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-orange-900 dark:text-white">
              {selectedDate ? 'Transações do Dia Selecionado' : 'Últimas 5 Transações'}
            </CardTitle>
            <div className="flex items-center gap-2">
              {selectedDate && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDate(undefined)}
                  className="text-orange-700 border-orange-200 hover:bg-orange-50"
                >
                  <X className="h-4 w-4 mr-1" />
                  Limpar Filtro
                </Button>
              )}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal border-orange-200 text-orange-700 hover:bg-orange-50",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Filtrar por data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {transacoesFiltradas.length === 0 ? (
            <div className="text-center py-8">
              <DollarSign className="h-12 w-12 text-orange-300 dark:text-orange-600 mx-auto mb-4" />
              <p className="text-orange-600 dark:text-orange-400 text-lg">
                {selectedDate ? 'Nenhuma transação encontrada para esta data' : 'Nenhuma transação registrada'}
              </p>
              <p className="text-orange-500 dark:text-orange-500 text-sm mt-2">
                {selectedDate ? 'Tente selecionar uma data diferente' : 'Comece adicionando suas primeiras receitas e despesas'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {transacoesFiltradas.map((transacao) => (
                <div key={transacao.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-orange-100 dark:border-gray-600 rounded-lg hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors space-y-3 sm:space-y-0">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      transacao.tipo === 'receita' ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'
                    }`}>
                      {transacao.tipo === 'receita' ? (
                        <ArrowUpRight className="h-5 w-5 text-green-600" />
                      ) : (
                        <ArrowDownRight className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-orange-900 dark:text-white truncate">{transacao.descricao}</p>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-orange-700 dark:text-gray-300">
                        <div className="flex items-center space-x-1">
                          <CalendarIcon className="h-3 w-3" />
                          <span>{formatarData(transacao.data_transacao)}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs bg-orange-100 dark:bg-gray-700 text-orange-800 dark:text-orange-300">
                          {transacao.categoria}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end space-x-3">
                    <div className={`text-lg font-semibold ${
                      transacao.tipo === 'receita' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transacao.tipo === 'receita' ? '+' : '-'}{formatarMoeda(Number(transacao.valor))}
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteTransacao(transacao.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 p-2"
                        disabled={deleteTransacaoMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AdicionarDespesaModal
        isOpen={modalDespesaOpen}
        onClose={() => setModalDespesaOpen(false)}
        onAddDespesa={handleAddDespesa}
        onEditDespesa={() => {}}
        editingDespesa={editingDespesa}
      />

      <AdicionarReceitaModal
        isOpen={modalReceitaOpen}
        onClose={() => setModalReceitaOpen(false)}
        onAddReceita={handleAddReceita}
      />
    </div>
  );
};
