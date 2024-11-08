import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
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
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useScheduleModal } from '@/hooks/use-schedule-modal';
import { useToast } from '@/hooks/use-toast';
import { scheduleAppointment } from '@/lib/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const formSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string()
    .min(10, 'Telefone inválido')
    .max(15, 'Telefone inválido')
    .refine((value) => {
      const numbers = value.replace(/\D/g, '');
      return numbers.length === 10 || numbers.length === 11;
    }, 'Telefone inválido'),
  date: z.date({
    required_error: "Por favor selecione uma data",
  }),
  time: z.string().min(1, 'Por favor selecione um horário'),
  serviceType: z.string().min(1, 'Por favor selecione um tipo de serviço'),
});

const timeSlots = [
  '09:00',
  '10:00',
  '11:00',
  '14:00',
  '15:00',
  '16:00',
];

const serviceTypes = [
  'Construção Residencial',
  'Reforma Completa',
  'Reforma Parcial',
  'Decoração',
  'Projeto Arquitetônico',
  'Consultoria',
];

export function ScheduleModal() {
  const { isOpen, closeModal } = useScheduleModal();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('info');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      time: '',
      serviceType: '',
    },
  });

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    
    if (digits.length === 0) {
      return '';
    } else if (digits.length <= 2) {
      return `(${digits}`;
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length <= 10) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    } else {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
    }
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
    let value = event.target.value;
    const digits = value.replace(/\D/g, '');
    
    if (digits.length <= 11) {
      const formattedValue = formatPhoneNumber(value);
      onChange(formattedValue);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      const formattedValues = {
        ...values,
        phone: values.phone.replace(/\D/g, ''),
      };

      await scheduleAppointment(formattedValues);
      
      toast({
        title: "Agendamento Confirmado!",
        description: (
          <div className="flex flex-col gap-1">
            <p>Obrigado pela preferência, {values.name}!</p>
            <p>Sua visita está agendada para {format(values.date, "dd 'de' MMMM", { locale: ptBR })} às {values.time}.</p>
            <p>Enviaremos um email com mais detalhes para {values.email}.</p>
          </div>
        ),
        duration: 5000,
      });

      closeModal();
      form.reset();
    } catch (error) {
      toast({
        title: "Erro no agendamento",
        description: "Ocorreu um erro ao agendar sua visita. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const nextTab = () => {
    if (activeTab === 'info') {
      const { name, email, phone } = form.getValues();
      if (name && email && phone) {
        setActiveTab('service');
      } else {
        form.trigger(['name', 'email', 'phone']);
      }
    } else if (activeTab === 'service') {
      const { serviceType } = form.getValues();
      if (serviceType) {
        setActiveTab('date');
      } else {
        form.trigger(['serviceType']);
      }
    }
  };

  const previousTab = () => {
    if (activeTab === 'service') setActiveTab('info');
    if (activeTab === 'date') setActiveTab('service');
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Agende uma Visita</DialogTitle>
          <DialogDescription>
            Escolha a melhor data e horário para nossa equipe técnica visitar seu projeto.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">Dados</TabsTrigger>
                <TabsTrigger value="service">Serviço</TabsTrigger>
                <TabsTrigger value="date">Agendamento</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="João Silva" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="joao.silva@exemplo.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="(11) 99999-9999"
                          onChange={(e) => handlePhoneChange(e, field.onChange)}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-muted-foreground">
                        Aceita telefone fixo ou celular
                      </p>
                    </FormItem>
                  )}
                />

                <Button type="button" onClick={nextTab} className="w-full">
                  Próximo
                </Button>
              </TabsContent>

              <TabsContent value="service" className="space-y-4">
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

                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={previousTab}>
                    Voltar
                  </Button>
                  <Button type="button" className="flex-1" onClick={nextTab}>
                    Próximo
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="date" className="space-y-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data da Visita</FormLabel>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return date < today || date.getDay() === 0 || date.getDay() === 6;
                        }}
                        initialFocus
                        className="mx-auto"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horário</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o horário" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={previousTab}>
                    Voltar
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading ? 'Agendando...' : 'Agendar Visita'}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}