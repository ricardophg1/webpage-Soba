# 🎨 Guia de Estilo

## 🎯 Princípios de Design

### Cores
```css
/* Cores principais */
--primary: hsl(30 60% 55%);     /* Laranja suave */
--secondary: hsl(30 25% 95%);   /* Bege suave */
--background: hsl(220 30% 98%); /* Azul marinho suave */

/* Tons de texto */
--foreground: hsl(220 30% 12%);
--muted: hsl(220 20% 92%);
```

### Tipografia
```css
/* Títulos */
h1: 3rem/48px (bold)
h2: 2.25rem/36px (bold)
h3: 1.5rem/24px (semibold)

/* Corpo */
body: 1rem/16px (regular)
small: 0.875rem/14px (regular)
```

### Espaçamento
```css
/* Sistema de Grid */
4px - Espaçamento mínimo
8px - Espaçamento pequeno
16px - Espaçamento médio
24px - Espaçamento grande
32px - Espaçamento extra grande
```

## 💅 Componentes UI

### Botões
```tsx
/* Primário */
<Button>
  Botão Primário
</Button>

/* Secundário */
<Button variant="outline">
  Botão Secundário
</Button>

/* Ghost */
<Button variant="ghost">
  Botão Ghost
</Button>
```

### Cards
```tsx
<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descrição</CardDescription>
  </CardHeader>
  <CardContent>
    Conteúdo
  </CardContent>
</Card>
```

### Formulários
```tsx
<Form>
  <FormField>
    <FormLabel>Campo</FormLabel>
    <FormControl>
      <Input />
    </FormControl>
    <FormMessage />
  </FormField>
</Form>
```

## 📱 Responsividade

### Breakpoints
```css
/* Mobile First */
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Media Queries
```css
/* Mobile */
@media (max-width: 640px) {
  /* Estilos */
}

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) {
  /* Estilos */
}

/* Desktop */
@media (min-width: 1025px) {
  /* Estilos */
}
```

## 🎭 Animações

### Transições
```css
/* Padrão */
transition-all duration-300 ease-in-out

/* Suave */
transition-all duration-500 ease-out

/* Rápida */
transition-all duration-150 ease-in
```

### Hover States
```css
/* Escala */
hover:scale-105

/* Opacidade */
hover:opacity-80

/* Sombra */
hover:shadow-lg
```

## 📏 Grid System

### Container
```tsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Conteúdo */}
</div>
```

### Grid
```tsx
/* 2 Colunas */
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  {/* Items */}
</div>

/* 3 Colunas */
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {/* Items */}
</div>
```

## 🎯 Boas Práticas

1. Use variáveis CSS para cores e valores reutilizáveis
2. Mantenha consistência no espaçamento
3. Siga o sistema de grid
4. Use componentes shadcn/ui quando possível
5. Mantenha responsividade mobile-first
6. Use animações com moderação
7. Mantenha acessibilidade em mente