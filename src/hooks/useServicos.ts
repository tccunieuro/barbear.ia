
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
      console.log('✂️ Buscando serviços...');
      
      const { data: { user } } = await supabase.auth.getUser();
      console.log('👤 Usuário atual:', user?.id);
      
      if (!user) {
        console.log('❌ Usuário não autenticado');
        throw new Error('Usuário não autenticado');
      }

      const { data, error } = await supabase
        .from('servicos')
        .select('*')
        .eq('user_id', user.id)
        .eq('ativo', true)
        .order('created_at', { ascending: false });

      console.log('✂️ Dados dos serviços:', data);
      console.log('❗ Erro (se houver):', error);

      if (error) {
        console.error('Erro ao buscar serviços:', error);
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
