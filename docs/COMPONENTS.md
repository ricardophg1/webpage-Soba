# 📚 Guia de Componentes

## 🎨 Componentes UI

### Hero
O componente principal da página inicial que apresenta a mensagem central da empresa.

```tsx
<Hero />
```

**Props:**
- Não recebe props

### Benefits
Apresenta os principais benefícios da plataforma.

```tsx
<Benefits />
```

**Props:**
- Não recebe props

### Services
Lista os serviços oferecidos pela empresa.

```tsx
<Services />
```

**Props:**
- Não recebe props

### Gallery
Exibe uma galeria de projetos com animações.

```tsx
<Gallery />
```

**Props:**
- Não recebe props

## 🔧 Componentes Funcionais

### RegisterModal
Modal de registro de usuários com validações.

```tsx
<RegisterModal />
```

**Props:**
- Não recebe props, usa Zustand para gerenciamento de estado

### ScheduleModal
Modal para agendamento de visitas.

```tsx
<ScheduleModal />
```

**Props:**
- Não recebe props, usa Zustand para gerenciamento de estado

## 🎯 Hooks Personalizados

### useRegisterModal
```tsx
const { isOpen, openModal, closeModal } = useRegisterModal();
```

### useScheduleModal
```tsx
const { isOpen, openModal, closeModal } = useScheduleModal();
```

### useToast
```tsx
const { toast } = useToast();
```

## 🔍 Exemplos de Uso

### Registro de Usuário
```tsx
import { useRegisterModal } from '@/hooks/use-register-modal';

function Component() {
  const { openModal } = useRegisterModal();
  
  return (
    <Button onClick={openModal}>
      Cadastre-se
    </Button>
  );
}
```

### Agendamento
```tsx
import { useScheduleModal } from '@/hooks/use-schedule-modal';

function Component() {
  const { openModal } = useScheduleModal();
  
  return (
    <Button onClick={openModal}>
      Agendar Visita
    </Button>
  );
}
```