
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff } from 'lucide-react';
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-primary p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl border border-primary/20 rounded-xl overflow-hidden">
        <CardHeader className="text-center pb-6 pt-8 bg-white">
          <div className="flex justify-center items-center mb-6">
            <div className="bg-gradient-to-br from-primary/10 to-primary/20 p-4 rounded-xl shadow-lg">
              <img 
                src="/lovable-uploads/463a377e-e8e1-437a-9231-6185a4234daf.png" 
                alt="Barbear.ia Logo" 
                className="h-12 w-auto object-contain"
              />
            </div>
          </div>
          <CardTitle className="text-3xl font-light text-primary mb-2">
            Barbear.ia
          </CardTitle>
          <p className="text-primary/70 font-light">Gestão completa para sua barbearia</p>
        </CardHeader>
        
        <CardContent className="space-y-6 px-8 pb-8 bg-white">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-primary font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-2 border-primary/20 bg-white focus:bg-white focus:border-primary focus:ring-0 transition-all duration-200 text-primary placeholder:text-primary/40 rounded-lg h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-primary font-medium">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-2 border-primary/20 bg-white focus:bg-white focus:border-primary focus:ring-0 transition-all duration-200 text-primary placeholder:text-primary/40 pr-12 rounded-lg h-12"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-primary/10 text-primary/60 hover:text-primary transition-colors rounded-r-lg"
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
                  className="border-2 border-primary/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label htmlFor="remember" className="text-sm text-primary/70 font-normal">
                  Lembrar-me
                </Label>
              </div>
              
              <Button
                type="button"
                variant="ghost"
                onClick={onForgotPassword}
                className="text-primary hover:text-primary/80 hover:bg-primary/10 p-2 h-auto font-normal text-sm transition-all duration-200 rounded-lg"
              >
                Esqueci minha senha
              </Button>
            </div>
            
            <div className="space-y-3 pt-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-medium py-3 h-12 transition-all duration-200 shadow-lg hover:shadow-xl rounded-lg border-0"
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
