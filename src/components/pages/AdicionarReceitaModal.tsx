
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { DollarSign, Calendar } from 'lucide-react';

interface AdicionarReceitaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReceita: (receita: any) => void;
}

export const AdicionarReceitaModal: React.FC<AdicionarReceitaModalProps> = ({
  isOpen,
  onClose,
  onAddReceita
}) => {
  const [formData, setFormData] = useState({
    categoria: '',
    descricao: '',
    valor: '',
    data: new Date().toISOString().split('T')[0]
  });

  const categorias = [
    'Gorjeta',
    'Serviço Extra',
    'Venda de Produtos',
    'Comissão',
    'Outros'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.categoria || !formData.descricao || !formData.valor) {
      return;
    }

    onAddReceita(formData);
    
    // Reset form
    setFormData({
      categoria: '',
      descricao: '',
      valor: '',
      data: new Date().toISOString().split('T')[0]
    });
    
    onClose();
  };

  const handleClose = () => {
    setFormData({
      categoria: '',
      descricao: '',
      valor: '',
      data: new Date().toISOString().split('T')[0]
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 border-orange-200 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-orange-900 dark:text-white">
            <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-lg">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <span>Adicionar Receita</span>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="categoria" className="text-orange-800 dark:text-gray-200 font-medium">
              Categoria
            </Label>
            <Select value={formData.categoria} onValueChange={(value) => setFormData(prev => ({ ...prev, categoria: value }))}>
              <SelectTrigger className="mt-1 border-2 border-orange-200 dark:border-gray-600 focus:border-green-400 dark:focus:border-green-400 bg-white dark:bg-gray-700 text-orange-900 dark:text-white rounded-lg h-12">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-orange-200 dark:border-gray-600">
                {categorias.map((categoria) => (
                  <SelectItem key={categoria} value={categoria} className="text-orange-900 dark:text-white hover:bg-orange-50 dark:hover:bg-gray-700">
                    {categoria}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="descricao" className="text-orange-800 dark:text-gray-200 font-medium">
              Descrição
            </Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
              placeholder="Descreva a receita..."
              className="mt-1 border-2 border-orange-200 dark:border-gray-600 focus:border-green-400 dark:focus:border-green-400 bg-white dark:bg-gray-700 text-orange-900 dark:text-white rounded-lg resize-none"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="valor" className="text-orange-800 dark:text-gray-200 font-medium">
              Valor (R$)
            </Label>
            <Input
              id="valor"
              type="number"
              step="0.01"
              min="0"
              value={formData.valor}
              onChange={(e) => setFormData(prev => ({ ...prev, valor: e.target.value }))}
              placeholder="0,00"
              className="mt-1 border-2 border-orange-200 dark:border-gray-600 focus:border-green-400 dark:focus:border-green-400 bg-white dark:bg-gray-700 text-orange-900 dark:text-white rounded-lg h-12"
            />
          </div>

          <div>
            <Label htmlFor="data" className="text-orange-800 dark:text-gray-200 font-medium flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Data da Receita</span>
            </Label>
            <Input
              id="data"
              type="date"
              value={formData.data}
              onChange={(e) => setFormData(prev => ({ ...prev, data: e.target.value }))}
              className="mt-1 border-2 border-orange-200 dark:border-gray-600 focus:border-green-400 dark:focus:border-green-400 bg-white dark:bg-gray-700 text-orange-900 dark:text-white rounded-lg h-12"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="border-2 border-orange-200 dark:border-gray-600 text-orange-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 rounded-lg"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md hover:shadow-lg transition-all rounded-lg"
              disabled={!formData.categoria || !formData.descricao || !formData.valor}
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Adicionar Receita
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
