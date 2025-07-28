
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Servico {
  id: string;
  user_id: string;
  nome: string;
  preco: number;
  duracao?: number;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export const useServicos = () => {
  return useQuery({
    queryKey: ['servicos'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      const { data, error } = await supabase
        .from('servicos')
        .select('*')
        .eq('user_id', user.id)
        .eq('ativo', true)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }
      
      return data as Servico[];
    },
  });
};

export const useCreateServico = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (servicoData: Omit<Servico, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('servicos')
        .insert({ ...servicoData, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['servicos'] });
      toast({
        title: "Sucesso",
        description: "Serviço criado com sucesso!",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Erro ao criar serviço: " + error.message,
        variant: "destructive",
      });
    },
  });
};
