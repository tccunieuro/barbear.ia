
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Atendimento {
  id: string;
  user_id: string;
  cliente_id?: string;
  servico_id?: string;
  data_atendimento: string;
  hora_inicio: string;
  hora_fim?: string;
  valor: number;
  observacoes?: string;
  status: string;
  created_at: string;
  updated_at: string;
  clientes?: { nome: string };
  servicos?: { nome: string };
}

export const useAtendimentos = () => {
  return useQuery({
    queryKey: ['atendimentos'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('atendimentos')
        .select(`
          *,
          clientes(nome),
          servicos(nome)
        `)
        .eq('user_id', user.id)
        .order('data_atendimento', { ascending: false });

      if (error) throw error;
      return data as Atendimento[];
    },
  });
};

export const useCreateAtendimento = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (atendimentoData: Omit<Atendimento, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'clientes' | 'servicos'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('atendimentos')
        .insert({ ...atendimentoData, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['atendimentos'] });
      toast({
        title: "Sucesso",
        description: "Atendimento criado com sucesso!",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Erro ao criar atendimento: " + error.message,
        variant: "destructive",
      });
    },
  });
};
