
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Transacao {
  id: string;
  user_id: string;
  tipo: 'receita' | 'despesa';
  categoria: string;
  descricao: string;
  valor: number;
  data_transacao: string;
  atendimento_id?: string;
  created_at: string;
  updated_at: string;
}

export const useTransacoes = () => {
  return useQuery({
    queryKey: ['transacoes'],
    queryFn: async () => {
      console.log('💰 Buscando transações...');
      
      const { data: { user } } = await supabase.auth.getUser();
      console.log('👤 Usuário atual:', user?.id);
      
      if (!user) {
        console.log('❌ Usuário não autenticado');
        throw new Error('Usuário não autenticado');
      }

      const { data, error } = await supabase
        .from('transacoes')
        .select('*')
        .eq('user_id', user.id)
        .order('data_transacao', { ascending: false });

      console.log('💰 Dados das transações:', data);
      console.log('❗ Erro (se houver):', error);

      if (error) {
        console.error('Erro ao buscar transações:', error);
        throw error;
      }
      
      return data as Transacao[];
    },
  });
};

export const useCreateTransacao = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (transacaoData: Omit<Transacao, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('transacoes')
        .insert({ ...transacaoData, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transacoes'] });
      toast({
        title: "Sucesso",
        description: "Transação criada com sucesso!",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Erro ao criar transação: " + error.message,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteTransacao = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('transacoes')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transacoes'] });
      toast({
        title: "Sucesso",
        description: "Transação excluída com sucesso!",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Erro ao excluir transação: " + error.message,
        variant: "destructive",
      });
    },
  });
};
