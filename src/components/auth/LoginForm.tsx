
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Scissors, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LoginFormProps {
  onLogin: (credentials: { email: string; password: string; remember: boolean }) => void;
  onForgotPassword: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
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
    
    // Simular autenticação
    setTimeout(() => {
      onLogin({ email, password, remember });
      setIsLoading(false);
      toast({
        title: "Sucesso",
        description: "Login realizado com sucesso!",
      });
    }, 1000);
  };

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
              <CardTitle className="text-3xl font-light text-gray-900 mb-2">
                BarberManager
              </CardTitle>
              <p className="text-gray-600 font-light">Gestão completa para sua barbearia</p>
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
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">Senha</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-400 focus:ring-0 transition-all duration-200 text-gray-900 placeholder:text-gray-400 pr-12 rounded-lg h-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors rounded-r-lg"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={remember}
                      onCheckedChange={(checked) => setRemember(checked as boolean)}
                      className="border-2 border-gray-300 data-[state=checked]:bg-gray-800 data-[state=checked]:border-gray-800"
                    />
                    <Label htmlFor="remember" className="text-sm text-gray-600 font-normal">
                      Lembrar-me
                    </Label>
                  </div>
                  
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={onForgotPassword}
                    className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 p-2 h-auto font-normal text-sm transition-all duration-200 rounded-lg"
                  >
                    Esqueci minha senha
                  </Button>
                </div>
                
                <div className="space-y-3 pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 text-white font-medium py-3 h-12 transition-all duration-200 shadow-lg hover:shadow-xl rounded-lg border-0"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Entrando...' : 'Entrar'}
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
