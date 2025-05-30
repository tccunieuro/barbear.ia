
import React, { useState } from 'react';
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
}

export const AdicionarDespesaModal: React.FC<AdicionarDespesaModalProps> = ({ 
  isOpen, 
  onClose, 
  onAddDespesa 
}) => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const { toast } = useToast();

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

    const novaDespesa = {
      id: Date.now(),
      tipo: 'despesa',
      descricao,
      valor: parseFloat(valor),
      data: new Date().toLocaleDateString('pt-BR'),
      categoria
    };

    onAddDespesa(novaDespesa);
    setDescricao('');
    setValor('');
    setCategoria('');
    onClose();
    
    toast({
      title: "Sucesso",
      description: "Despesa adicionada com sucesso!",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl border border-gray-200 rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900">Adicionar Despesa</CardTitle>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="descricao" className="text-gray-700 font-medium">Descrição</Label>
              <Input
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Ex: Energia elétrica"
                className="border-2 border-gray-300 focus:border-gray-600 rounded-lg h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="valor" className="text-gray-700 font-medium">Valor (R$)</Label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                placeholder="0,00"
                className="border-2 border-gray-300 focus:border-gray-600 rounded-lg h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoria" className="text-gray-700 font-medium">Categoria</Label>
              <select
                id="categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full border-2 border-gray-300 focus:border-gray-600 rounded-lg h-12 px-3 text-gray-900 bg-white"
                required
              >
                <option value="">Selecione uma categoria</option>
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
                className="flex-1 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 border-2 border-gray-300 hover:border-gray-400 rounded-lg"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 text-white rounded-lg"
              >
                Adicionar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
