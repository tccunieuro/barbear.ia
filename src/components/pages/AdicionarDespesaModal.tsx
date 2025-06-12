
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdicionarDespesaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDespesa: (despesa: any) => void;
  onEditDespesa?: (despesa: any) => void;
  editingDespesa?: any;
}

export const AdicionarDespesaModal: React.FC<AdicionarDespesaModalProps> = ({ 
  isOpen, 
  onClose, 
  onAddDespesa,
  onEditDespesa,
  editingDespesa
}) => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (editingDespesa) {
      setDescricao(editingDespesa.descricao);
      setValor(editingDespesa.valor.toString());
      setCategoria(editingDespesa.categoria);
    } else {
      setDescricao('');
      setValor('');
      setCategoria('');
    }
  }, [editingDespesa]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!descricao || !valor || !categoria) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    const despesaData = {
      id: editingDespesa ? editingDespesa.id : Date.now(),
      tipo: 'despesa',
      descricao,
      valor: parseFloat(valor),
      data: editingDespesa ? editingDespesa.data : new Date().toLocaleDateString('pt-BR'),
      categoria
    };

    if (editingDespesa && onEditDespesa) {
      onEditDespesa(despesaData);
      toast({
        title: "Sucesso",
        description: "Despesa editada com sucesso!",
      });
    } else {
      onAddDespesa(despesaData);
      toast({
        title: "Sucesso",
        description: "Despesa adicionada com sucesso!",
      });
    }

    setDescricao('');
    setValor('');
    setCategoria('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl border border-orange-200 rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between border-b border-orange-100">
          <CardTitle className="text-xl font-semibold text-orange-900">
            {editingDespesa ? 'Editar Despesa' : 'Adicionar Despesa'}
          </CardTitle>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-orange-500 hover:text-orange-700 hover:bg-orange-50 rounded-lg"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="descricao" className="text-orange-800 font-medium">Descrição</Label>
              <Input
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Ex: Energia elétrica"
                className="border-2 border-orange-200 focus:border-orange-400 focus:ring-orange-400 bg-white text-orange-900 placeholder:text-orange-400 rounded-lg h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="valor" className="text-orange-800 font-medium">Valor (R$)</Label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                placeholder="0,00"
                className="border-2 border-orange-200 focus:border-orange-400 focus:ring-orange-400 bg-white text-orange-900 placeholder:text-orange-400 rounded-lg h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoria" className="text-orange-800 font-medium">Categoria</Label>
              <select
                id="categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full border-2 border-orange-200 focus:border-orange-400 focus:ring-orange-400 rounded-lg h-12 px-3 text-orange-900 bg-white"
                required
              >
                <option value="" className="text-orange-400">Selecione uma categoria</option>
                <option value="Utilidades">Utilidades</option>
                <option value="Limpeza">Limpeza</option>
                <option value="Produtos">Produtos</option>
                <option value="Manutenção">Manutenção</option>
                <option value="Aluguel">Aluguel</option>
                <option value="Outros">Outros</option>
              </select>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                onClick={onClose}
                className="flex-1 bg-orange-100 hover:bg-orange-200 text-orange-800 hover:text-orange-900 border-2 border-orange-300 hover:border-orange-400 rounded-lg"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                {editingDespesa ? 'Salvar' : 'Adicionar'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
