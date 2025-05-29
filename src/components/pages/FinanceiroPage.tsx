
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  DollarSign, 
  TrendingUp, 
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data atualizado para todos os períodos
const mockData = {
  daily: [
    { name: 'Hoje', receita: 850, despesa: 120, lucro: 730 },
    { name: 'Ontem', receita: 720, despesa: 100, lucro: 620 },
  ],
  weekly: [
    { name: 'Seg', receita: 650, despesa: 180, lucro: 470 },
    { name: 'Ter', receita: 480, despesa: 120, lucro: 360 },
    { name: 'Qua', receita: 780, despesa: 200, lucro: 580 },
    { name: 'Qui', receita: 620, despesa: 140, lucro: 480 },
    { name: 'Sex', receita: 890, despesa: 220, lucro: 670 },
    { name: 'Sáb', receita: 1200, despesa: 280, lucro: 920 },
    { name: 'Dom', receita: 520, despesa: 130, lucro: 390 },
  ],
  quarterly: [
    { name: '1º Tri', receita: 52400, despesa: 9600, lucro: 42800 },
    { name: '2º Tri', receita: 54200, despesa: 10100, lucro: 44100 },
    { name: '3º Tri', receita: 55600, despesa: 9800, lucro: 45800 },
    { name: '4º Tri', receita: 56800, despesa: 10500, lucro: 46300 },
  ],
  yearly: [
    { name: '2021', receita: 180000, despesa: 35000, lucro: 145000 },
    { name: '2022', receita: 195000, despesa: 37000, lucro: 158000 },
    { name: '2023', receita: 210000, despesa: 38500, lucro: 171500 },
    { name: '2024', receita: 219000, despesa: 40000, lucro: 179000 },
  ]
};

interface Despesa {
  id: number;
  nome: string;
  valor: number;
  data: string;
  categoria: string;
}

const getMetricsByPeriod = (period: string) => {
  switch (period) {
    case 'daily':
      return {
        totalReceita: 850,
        totalDespesa: 120,
        totalLucro: 730,
        margemLucro: '85.9',
        crescimento: '18.1'
      };
    case 'weekly':
      return {
        totalReceita: 5140,
        totalDespesa: 1270,
        totalLucro: 3870,
        margemLucro: '75.3',
        crescimento: '12.5'
      };
    case 'quarterly':
      return {
        totalReceita: 55600,
        totalDespesa: 9800,
        totalLucro: 45800,
        margemLucro: '82.4',
        crescimento: '8.7'
      };
    case 'yearly':
      return {
        totalReceita: 219000,
        totalDespesa: 40000,
        totalLucro: 179000,
        margemLucro: '81.7',
        crescimento: '4.3'
      };
    default:
      return {
        totalReceita: 18500,
        totalDespesa: 3200,
        totalLucro: 15300,
        margemLucro: '82.7',
        crescimento: '10.1'
      };
  }
};

const getPeriodLabel = (period: string) => {
  switch (period) {
    case 'daily': return 'Dia';
    case 'weekly': return 'Semana';
    case 'quarterly': return 'Trimestre';
    case 'yearly': return 'Ano';
    default: return 'Mês';
  }
};

export const FinanceiroPage: React.FC = () => {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');
  const [despesas, setDespesas] = useState<Despesa[]>([
    { id: 1, nome: 'Aluguel', valor: 1500, data: '2024-01-01', categoria: 'Fixo' },
    { id: 2, nome: 'Material', valor: 300, data: '2024-01-05', categoria: 'Variável' },
  ]);
  const [novaDespesa, setNovaDespesa] = useState({
    nome: '',
    valor: '',
    data: '',
    categoria: ''
  });
  const [editandoDespesa, setEditandoDespesa] = useState<number | null>(null);

  const getCurrentData = () => {
    return mockData[selectedPeriod as keyof typeof mockData] || mockData.weekly;
  };

  const metrics = getMetricsByPeriod(selectedPeriod);
  const periodLabel = getPeriodLabel(selectedPeriod);

  const adicionarDespesa = () => {
    if (!novaDespesa.nome || !novaDespesa.valor || !novaDespesa.data || !novaDespesa.categoria) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive"
      });
      return;
    }

    const despesa: Despesa = {
      id: Date.now(),
      nome: novaDespesa.nome,
      valor: parseFloat(novaDespesa.valor),
      data: novaDespesa.data,
      categoria: novaDespesa.categoria
    };

    setDespesas([...despesas, despesa]);
    setNovaDespesa({ nome: '', valor: '', data: '', categoria: '' });
    
    toast({
      title: "Sucesso",
      description: "Despesa adicionada com sucesso"
    });
  };

  const excluirDespesa = (id: number) => {
    setDespesas(despesas.filter(d => d.id !== id));
    toast({
      title: "Sucesso",
      description: "Despesa excluída com sucesso"
    });
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Faturamento e Despesas</h1>
        </div>
      </div>

      {/* Period Buttons */}
      <div className="flex space-x-2">
        {['daily', 'weekly', 'quarterly', 'yearly'].map((period) => (
          <Button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`${
              selectedPeriod === period 
                ? 'bg-blue-800 text-white' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {period === 'daily' ? 'Diário' : 
             period === 'weekly' ? 'Semanal' : 
             period === 'quarterly' ? 'Trimestral' : 'Anual'}
          </Button>
        ))}
      </div>

      {/* Resumo Financeiro */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Resumo Financeiro do {periodLabel}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Faturamento</p>
                  <p className="text-3xl font-bold text-gray-900">R$ {metrics.totalReceita.toLocaleString('pt-BR')}</p>
                  <p className="text-sm text-gray-600">Em relação ao período anterior</p>
                </div>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">{metrics.crescimento}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div>
                <p className="text-sm font-medium text-gray-600">Despesas</p>
                <p className="text-3xl font-bold text-gray-900">R$ {metrics.totalDespesa.toLocaleString('pt-BR')}</p>
                <p className="text-sm text-gray-600">Total do período</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Lucro Líquido</p>
                  <p className="text-3xl font-bold text-gray-900">R$ {metrics.totalLucro.toLocaleString('pt-BR')}</p>
                  <p className="text-sm text-gray-600">Receita - Despesas</p>
                </div>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">{metrics.crescimento}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Receita vs Despesas</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={getCurrentData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  `R$ ${Number(value).toLocaleString('pt-BR')}`, 
                  name === 'receita' ? 'Receita' : 'Despesa'
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="receita" 
                stroke="#22c55e" 
                strokeWidth={3}
                name="receita"
              />
              <Line 
                type="monotone" 
                dataKey="despesa" 
                stroke="#ef4444" 
                strokeWidth={3}
                name="despesa"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Controle de Despesas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Controle de Despesas</span>
            <Button 
              onClick={adicionarDespesa}
              className="bg-blue-800 hover:bg-blue-900"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Despesa
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Formulário de Nova Despesa */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg bg-gray-50">
            <div>
              <Label htmlFor="nome">Nome da Despesa</Label>
              <Input
                id="nome"
                value={novaDespesa.nome}
                onChange={(e) => setNovaDespesa({...novaDespesa, nome: e.target.value})}
                placeholder="Ex: Aluguel"
              />
            </div>
            <div>
              <Label htmlFor="valor">Valor</Label>
              <Input
                id="valor"
                type="number"
                value={novaDespesa.valor}
                onChange={(e) => setNovaDespesa({...novaDespesa, valor: e.target.value})}
                placeholder="0,00"
              />
            </div>
            <div>
              <Label htmlFor="data">Data</Label>
              <Input
                id="data"
                type="date"
                value={novaDespesa.data}
                onChange={(e) => setNovaDespesa({...novaDespesa, data: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="categoria">Categoria</Label>
              <Select value={novaDespesa.categoria} onValueChange={(value) => setNovaDespesa({...novaDespesa, categoria: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fixo">Fixo</SelectItem>
                  <SelectItem value="Variável">Variável</SelectItem>
                  <SelectItem value="Eventual">Eventual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Lista de Despesas */}
          <div className="space-y-2">
            <h3 className="font-semibold">Despesas Cadastradas</h3>
            {despesas.map((despesa) => (
              <div key={despesa.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1 grid grid-cols-4 gap-4">
                  <div>
                    <p className="font-medium">{despesa.nome}</p>
                  </div>
                  <div>
                    <p>R$ {despesa.valor.toLocaleString('pt-BR')}</p>
                  </div>
                  <div>
                    <p>{new Date(despesa.data).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{despesa.categoria}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setEditandoDespesa(despesa.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => excluirDespesa(despesa.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
