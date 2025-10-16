# MyTasks App

Aplicação web moderna para gerenciamento de tarefas com interface intuitiva e responsiva.

## 📋 Sobre o Projeto

MyTasks App é o frontend da plataforma MyTasks, construído com React e TypeScript, oferecendo uma experiência de usuário fluida e moderna para gerenciar suas tarefas diárias.

### Principais Funcionalidades

- 🔐 Sistema de autenticação (login e registro)
- ✅ Criação, edição e exclusão de tarefas
- 📅 Datepicker para definir prazos
- 🎯 Marcação de tarefas como concluídas
- 🗑️ Exclusão em lote de tarefas concluídas
- 👤 Gerenciamento de perfil de usuário
- 🔔 Sistema de notificações toast
- ⚡ Interface responsiva e animadas
- 🎨 Design moderno com Tailwind CSS
- 🌐 Rotas protegidas e públicas

## 🏗️ Arquitetura

O projeto segue uma estrutura organizada e escalável:

```
├── components/     # Componentes reutilizáveis da UI
├── config/         # Configurações da API e variáveis de ambiente
├── libs/           # Bibliotecas e configurações de terceiros
├── pages/          # Páginas da aplicação
├── routes/         # Configuração de rotas e providers
├── store/          # Gerenciamento de estado com Zustand
├── types/          # Definições de tipos TypeScript
└── utils/          # Funções utilitárias e schemas de validação
```

## 🚀 Tecnologias

- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool e dev server
- **React Router 7** - Roteamento
- **Zustand** - Gerenciamento de estado
- **Tailwind CSS 4** - Framework CSS utility-first
- **HeroUI** - Biblioteca de componentes UI
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Axios** - Cliente HTTP
- **Framer Motion** - Animações
- **Lucide React** - Ícones
- **Biome** - Linter e formatador

## 📦 Pré-requisitos

- Node.js (versão 22+)
- npm 
- [MyTasks API](https://github.com/vinicioscst/mytasks-api) rodando (backend)

## ⚙️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/vinicioscst/mytasks-app.git
cd mytasks-app
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
VITE_API_URL=http://localhost:3000
```

## 🏃 Executando o Projeto

### Desenvolvimento
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build de Produção
```bash
npm run build
```

### Preview do Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## 🎨 Funcionalidades Detalhadas

### Autenticação
- Tela de login com validação
- Registro de novos usuários
- Persistência de sessão
- Logout seguro

### Dashboard
- Listagem de todas as tarefas
- Visualização de tarefas pendentes e concluídas
- Indicadores visuais de prazo (atrasadas, próximas do vencimento)

### Gerenciamento de Tarefas
- Modal de criação com título, descrição e data de vencimento
- Edição de tarefas existentes
- Marcação rápida de conclusão via checkbox
- Exclusão individual com confirmação
- Exclusão em lote de tarefas concluídas
- Visualização detalhada de tarefas

### Perfil do Usuário
- Atualização de informações
- Opção de exclusão da conta com confirmação

## 🔐 Gerenciamento de Estado

A aplicação utiliza Zustand para gerenciar três stores principais:

- **authStore**: Autenticação e dados do usuário logado
- **tasksStore**: Lista de tarefas e operações CRUD
- **userStore**: Dados do perfil do usuário

## 🎯 Validação de Formulários

Todos os formulários são validados usando:
- **React Hook Form** para controle de formulários
- **Zod** para schemas de validação
- **@hookform/resolvers** para integração

## 📱 Responsividade

A interface é totalmente responsiva e otimizada para:
- 📱 Mobile (smartphones)
- 📱 Tablet
- 💻 Desktop

## 🎭 Animações

Animações suaves e modernas implementadas com Framer Motion para:
- Transições de página
- Modais
- Interações de componentes
- Loading states

## 🧩 Componentes Principais

### Autenticação
- `auth-card.tsx` - Container para formulários de auth
- `login-form.tsx` - Formulário de login
- `register-form.tsx` - Formulário de registro

### Tarefas
- `tasks-list.tsx` - Lista de tarefas
- `task-item.tsx` - Item individual de tarefa
- `task-checkbox.tsx` - Checkbox customizado
- `create-or-update-task-modal.tsx` - Modal de criação/edição
- `view-task-modal.tsx` - Modal de visualização
- `delete-task-modal.tsx` - Modal de confirmação de exclusão
- `delete-completed-tasks-modal.tsx` - Modal para exclusão em lote

### Layout
- `nav.tsx` - Barra de navegação
- `container.tsx` - Container principal

### Utilitários
- `task-item-skeleton.tsx` - Loading skeleton

## 🔒 Rotas

### Públicas
- `/` - Página inicial | Login | Cadastro

### Protegidas (Requer autenticação)
- `/dashboard` - Dashboard principal com tarefas

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento com hot reload
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview

# Formatar código com Biome
npm run lint
```

## 🌐 Integração com API

A aplicação se comunica com a MyTasks API através do Axios, com:
- Interceptors para tratamento de erros
- Autenticação via tokens
- Configuração centralizada em `config/api.ts`

## 📝 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

Vinicios Costa - [GitHub](https://github.com/vinicioscst)

## 🔗 Links Relacionados

- [MyTasks API](https://github.com/vinicioscst/mytasks-api) - Backend da aplicação