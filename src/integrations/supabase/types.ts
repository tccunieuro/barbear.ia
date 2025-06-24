export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      atendimentos: {
        Row: {
          cliente_id: string | null
          created_at: string | null
          data_atendimento: string
          hora_fim: string | null
          hora_inicio: string
          id: string
          observacoes: string | null
          servico_id: string | null
          status: string | null
          updated_at: string | null
          user_id: string
          valor: number
        }
        Insert: {
          cliente_id?: string | null
          created_at?: string | null
          data_atendimento: string
          hora_fim?: string | null
          hora_inicio: string
          id?: string
          observacoes?: string | null
          servico_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
          valor: number
        }
        Update: {
          cliente_id?: string | null
          created_at?: string | null
          data_atendimento?: string
          hora_fim?: string | null
          hora_inicio?: string
          id?: string
          observacoes?: string | null
          servico_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "atendimentos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "atendimentos_servico_id_fkey"
            columns: ["servico_id"]
            isOneToOne: false
            referencedRelation: "servicos"
            referencedColumns: ["id"]
          },
        ]
      }
      clientes: {
        Row: {
          created_at: string | null
          email: string | null
          endereco: string | null
          id: string
          nome: string
          telefone: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          endereco?: string | null
          id?: string
          nome: string
          telefone?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          endereco?: string | null
          id?: string
          nome?: string
          telefone?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      Leads_Modelo: {
        Row: {
          AtendimentoFinalizado: boolean | null
          conversation_history: Json | null
          id: number
          remoteJid: string
          response_id: string | null
          Timestamp: string | null
          Tokens: number | null
        }
        Insert: {
          AtendimentoFinalizado?: boolean | null
          conversation_history?: Json | null
          id?: number
          remoteJid?: string
          response_id?: string | null
          Timestamp?: string | null
          Tokens?: number | null
        }
        Update: {
          AtendimentoFinalizado?: boolean | null
          conversation_history?: Json | null
          id?: number
          remoteJid?: string
          response_id?: string | null
          Timestamp?: string | null
          Tokens?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          nome_barbearia: string | null
          nome_completo: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id: string
          nome_barbearia?: string | null
          nome_completo: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          nome_barbearia?: string | null
          nome_completo?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      servicos: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          duracao: number | null
          id: string
          nome: string
          preco: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          duracao?: number | null
          id?: string
          nome: string
          preco: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          duracao?: number | null
          id?: string
          nome?: string
          preco?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      Tools_Modelo: {
        Row: {
          descricao: string | null
          id: number
          nome: string | null
          tool: Json | null
          type: string | null
        }
        Insert: {
          descricao?: string | null
          id?: number
          nome?: string | null
          tool?: Json | null
          type?: string | null
        }
        Update: {
          descricao?: string | null
          id?: number
          nome?: string | null
          tool?: Json | null
          type?: string | null
        }
        Relationships: []
      }
      transacoes: {
        Row: {
          atendimento_id: string | null
          categoria: string
          created_at: string | null
          data_transacao: string
          descricao: string
          id: string
          tipo: string
          updated_at: string | null
          user_id: string
          valor: number
        }
        Insert: {
          atendimento_id?: string | null
          categoria: string
          created_at?: string | null
          data_transacao: string
          descricao: string
          id?: string
          tipo: string
          updated_at?: string | null
          user_id: string
          valor: number
        }
        Update: {
          atendimento_id?: string | null
          categoria?: string
          created_at?: string | null
          data_transacao?: string
          descricao?: string
          id?: string
          tipo?: string
          updated_at?: string | null
          user_id?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "transacoes_atendimento_id_fkey"
            columns: ["atendimento_id"]
            isOneToOne: false
            referencedRelation: "atendimentos"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
