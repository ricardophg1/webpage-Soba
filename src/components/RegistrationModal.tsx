import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRegistrationModal } from '@/hooks/use-registration-modal';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  email: z.string().email('Email inválido'),
  location: z.string().min(2, 'Localização é obrigatória'),
  serviceType: z.string().min(2, 'Tipo de serviço é obrigatório'),
});

const serviceTypes = [
  'Construção Residencial',
  'Reforma Completa',
  'Reforma Parcial',
  'Decoração',
  'Projeto Arquitetônico',
  'Consultoria',
  'Outros',
];

export function RegistrationModal() {
  const { isOpen, closeModal } = useRegistrationModal();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      location: '',
      serviceType: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Store user data
      localStorage.setItem('userRegistration', JSON.stringify({
        ...values,
        timestamp: new Date().toISOString(),
      }));

      toast({
        title: 'Cadastro realizado com sucesso!',
        description: 'Bem-vindo à Soba Construções.',
      });

      closeModal();
    } catch (error) {
      toast({
        title: 'Erro no cadastro',
        description: 'Por favor, tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete seu Cadastro</DialogTitle>
          <DialogDescription>
            Para continuar, precisamos de algumas informações básicas.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="seu.email@exemplo.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade/Estado</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="São Paulo, SP"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Serviço</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o serviço desejado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {serviceTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Cadastrando...' : 'Concluir Cadastro'}
            </Button>
          </form>
        </Form>

        <div className="text-xs text-muted-foreground text-center mt-4">
          Ao se cadastrar, você concorda com nossos{' '}
          <a href="/termos" className="text-primary hover:underline">
            Termos de Uso
          </a>{' '}
          e{' '}
          <a href="/privacidade" className="text-primary hover:underline">
            Política de Privacidade
          </a>
          .
        </div>
      </DialogContent>
    </Dialog>
  );
}