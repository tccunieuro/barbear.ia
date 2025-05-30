
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
        <div className="absolute inset-0 bg-gray-900"></div>
        <div className="relative z-10">
          <Card className="w-full max-w-md bg-white shadow-2xl border border-gray-200 rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50"></div>
            <div className="relative z-10">
              <CardHeader className="text-center pb-6 pt-8 bg-white">
                <div className="flex justify-center items-center mb-6">
                  <div className="bg-gradient-to-br from-gray-600 to-gray-800 p-4 rounded-xl shadow-lg">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-light text-gray-900 mb-2">
                  Email Enviado!
                </CardTitle>
                <p className="text-gray-600 font-light leading-relaxed">
                  Verifique sua caixa de entrada e clique no link para redefinir sua senha.
                </p>
              </CardHeader>
              <CardContent className="px-8 pb-8 bg-white">
                <Button
                  onClick={onBack}
                  className="w-full bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 text-white font-medium py-3 h-12 transition-all duration-200 shadow-lg hover:shadow-xl rounded-lg border-0"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar ao login
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="absolute inset-0 bg-gray-900"></div>
      <div className="relative z-10">
        <Card className="w-full max-w-md bg-white shadow-2xl border border-gray-200 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50"></div>
          <div className="relative z-10">
            <CardHeader className="text-center pb-6 pt-8 bg-white">
              <div className="flex justify-center items-center mb-6">
                <div className="bg-gradient-to-br from-gray-800 to-black p-4 rounded-xl shadow-lg">
                  <Scissors className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-light text-gray-900 mb-2">
                Recuperar Senha
              </CardTitle>
              <p className="text-gray-600 font-light">
                Digite seu email para receber um link de recuperação
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6 px-8 pb-8 bg-white">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-400 focus:ring-0 transition-all duration-200 text-gray-900 placeholder:text-gray-400 rounded-lg h-12"
                  />
                </div>
                
                <div className="space-y-3 pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 text-white font-medium py-3 h-12 transition-all duration-200 shadow-lg hover:shadow-xl rounded-lg border-0"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Enviando...' : 'Enviar link de recuperação'}
                  </Button>
                  
                  <Button
                    type="button"
                    onClick={onBack}
                    className="w-full bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 font-medium py-3 h-12 transition-all duration-200 rounded-lg border-2 border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar ao login
                  </Button>
                </div>
              </form>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};
