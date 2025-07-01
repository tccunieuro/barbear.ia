
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Scissors, 
  DollarSign,
  MapPin,
  Loader2
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useAtendimentos } from '@/hooks/useAtendimentos';

export const AgendaPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { data: atendimentos = [], isLoading } = useAtendimentos();

  // Filtrar atendimentos por data selecionada - correção do problema de timezone
  const atendimentosDoDia = atendimentos.filter(atendimento => {
    const dataAtendimento = new Date(atendimento.data_atendimento + 'T00:00:00');
    const dataSelecionada = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
    return dataAtendimento.toDateString() === dataSelecionada.toDateString();
  }).sort((a, b) => a.hora_inicio.localeCompare(b.hora_inicio));

  if (isLoading) {
    return (
      <div className="p-4 md:p-6 space-y-6 bg-orange-50 dark:bg-gray-900 min-h-full flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-orange-600" />
          <span className="text-orange-700 dark:text-orange-300">Carregando agenda...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 bg-orange-50 dark:bg-gray-900 min-h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-sm border border-orange-200 dark:border-gray-700">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-orange-900 dark:text-white">Agenda</h1>
          <p className="text-orange-700 dark:text-orange-300 mt-1">
            Visualize seus agendamentos por data
          </p>
        </div>
        
        {/* Seletor de Data */}
        <div className="mt-4 md:mt-0">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full md:w-[280px] justify-start text-left font-normal border-orange-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-orange-900 dark:text-white hover:bg-orange-50 dark:hover:bg-gray-600",
                  !selectedDate && "text-orange-500 dark:text-orange-400"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-orange-600 dark:text-orange-400" />
                {selectedDate ? (
                  format(selectedDate, "PPP", { locale: ptBR })
                ) : (
                  <span>Selecionar data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800 border-orange-200 dark:border-gray-600">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                initialFocus
                className="dark:text-white"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Estatísticas do Dia */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Card className="bg-white dark:bg-gray-800 shadow-sm border border-orange-200 dark:border-gray-700 hover:shadow-md transition-shadow rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-400">Agendamentos</CardTitle>
            <CalendarIcon className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900 dark:text-white">{atendimentosDoDia.length}</div>
            <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
              {format(selectedDate, "dd/MM/yyyy")}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 shadow-sm border border-orange-200 dark:border-gray-700 hover:shadow-md transition-shadow rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-400">Faturamento</CardTitle>
            <DollarSign className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900 dark:text-white">
              R$ {atendimentosDoDia.reduce((total, atendimento) => total + Number(atendimento.valor), 0).toFixed(2)}
            </div>
            <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Total do dia</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 shadow-sm border border-orange-200 dark:border-gray-700 hover:shadow-md transition-shadow rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-400">Duração Total</CardTitle>
            <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900 dark:text-white">
              {atendimentosDoDia.filter(a => a.hora_fim).length > 0 ? (
                (() => {
                  const totalMinutos = atendimentosDoDia
                    .filter(a => a.hora_fim)
                    .reduce((total, atendimento) => {
                      const inicio = new Date(`2000-01-01T${atendimento.hora_inicio}`);
                      const fim = new Date(`2000-01-01T${atendimento.hora_fim}`);
                      return total + (fim.getTime() - inicio.getTime()) / (1000 * 60);
                    }, 0);
                  const horas = Math.floor(totalMinutos / 60);
                  const minutos = Math.round(totalMinutos % 60);
                  return `${horas}h ${minutos}m`;
                })()
              ) : '0h 0m'}
            </div>
            <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Tempo trabalhado</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Agendamentos */}
      <Card className="bg-white dark:bg-gray-800 shadow-sm border border-orange-200 dark:border-gray-700 rounded-xl">
        <CardHeader>
          <CardTitle className="text-orange-900 dark:text-white">
            Agendamentos - {format(selectedDate, "dd/MM/yyyy", { locale: ptBR })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {atendimentosDoDia.length === 0 ? (
            <div className="text-center py-8">
              <CalendarIcon className="h-12 w-12 text-orange-300 dark:text-orange-600 mx-auto mb-4" />
              <p className="text-orange-600 dark:text-orange-400 text-lg">Nenhum agendamento para esta data</p>
              <p className="text-orange-500 dark:text-orange-500 text-sm mt-2">
                Selecione outra data para ver os agendamentos
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {atendimentosDoDia.map((atendimento) => (
                <div key={atendimento.id} className="p-4 border border-orange-100 dark:border-gray-600 rounded-lg hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <h3 className="font-semibold text-lg text-orange-900 dark:text-white">
                            {atendimento.hora_inicio}
                            {atendimento.hora_fim && ` - ${atendimento.hora_fim}`}
                          </h3>
                          <span className={cn(
                            "px-2 py-1 text-xs rounded-full",
                            atendimento.status === 'concluido' 
                              ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                              : atendimento.status === 'agendado'
                              ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                              : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400"
                          )}>
                            {atendimento.status || 'agendado'}
                          </span>
                        </div>
                        
                        <div className="space-y-1">
                          {atendimento.clientes && (
                            <div className="flex items-center text-sm text-orange-700 dark:text-orange-300">
                              <User className="h-3 w-3 mr-2 flex-shrink-0" />
                              <span>{atendimento.clientes.nome}</span>
                            </div>
                          )}
                          
                          {atendimento.servicos && (
                            <div className="flex items-center text-sm text-orange-700 dark:text-orange-300">
                              <Scissors className="h-3 w-3 mr-2 flex-shrink-0" />
                              <span>{atendimento.servicos.nome}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center text-sm text-orange-700 dark:text-orange-300">
                            <DollarSign className="h-3 w-3 mr-2 flex-shrink-0" />
                            <span>R$ {Number(atendimento.valor).toFixed(2)}</span>
                          </div>
                          
                          {atendimento.observacoes && (
                            <div className="text-sm text-orange-600 dark:text-orange-400 mt-2">
                              <strong>Observações:</strong> {atendimento.observacoes}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
