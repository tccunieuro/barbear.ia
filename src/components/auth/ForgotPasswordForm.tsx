
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Mail, Scissors } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ForgotPasswordFormProps {
  onBack: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Erro",
        description: "Por favor, insira seu email.",
        variant: "destructive"
      });
      return;
    }

    if (!email.includes('@')) {
      toast({
        title: "Erro",
        description: "Por favor, insira um email válido.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simular envio de email
    setTimeout(() => {
      setEmailSent(true);
      setIsLoading(false);
      toast({
        title: "Email enviado!",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      });
    }, 2000);
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-trinks-orange/10 to-trinks-orange/5 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center items-center mb-4">
              <div className="bg-green-500 p-3 rounded-full">
                <Mail className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Email Enviado!
            </CardTitle>
            <p className="text-gray-600">
              Verifique sua caixa de entrada e clique no link para redefinir sua senha.
            </p>
          </CardHeader>
          <CardContent>
            <Button
              onClick={onBack}
              variant="outline"
              className="w-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-trinks-orange/10 to-trinks-orange/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <div className="bg-trinks-orange p-3 rounded-full">
              <Scissors className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Recuperar Senha
          </CardTitle>
          <p className="text-gray-600">
            Digite seu email para receber um link de recuperação
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-trinks-orange hover:bg-trinks-orange-dark"
              disabled={isLoading}
            >
              {isLoading ? 'Enviando...' : 'Enviar link de recuperação'}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="w-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
