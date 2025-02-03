# Prova de Conteito de Utilizacao do Supabase como back-end

Este é um projeto de gerenciamento de tarefas desenvolvido utilizando **React**, **Vite** e **Supabase**. Ele permite que os usuários autentiquem, adicionem, visualizem e gerenciem suas tarefas com políticas de segurança implementadas diretamente no banco de dados.

## Tecnologias Utilizadas

- **React**: Biblioteca para construção da interface do usuário.
- **Vite**: Ferramenta de build rápida para desenvolvimento de aplicações frontend modernas.
- **Supabase**: Plataforma backend que fornece autenticação, banco de dados PostgreSQL, e APIs prontas.

---

## Estrutura do Projeto

```
src/
│
├── components/          # Componentes React reutilizáveis
│   ├── AddTask.jsx      # Componente para adicionar uma nova tarefa
│   ├── Header.jsx       # Cabeçalho do aplicativo
│   ├── Login.jsx        # Tela de login para autenticação de usuários
│   ├── Task.jsx         # Representação individual de uma tarefa
│   └── TaskList.jsx     # Lista de todas as tarefas
│
├── service/             # Lógica de interação com o Supabase
│   ├── authService.js   # Serviços de autenticação
│   ├── supabaseClient.js # Configuração do cliente Supabase
│   └── taskService.js   # Serviços para gerenciamento de tarefas
│
├── App.jsx              # Componente principal da aplicação
├── main.jsx             # Ponto de entrada da aplicação
│
├── .env                 # Variáveis de ambiente sensíveis
├── eslint.config.js     # Configuração do ESLint
├── vite.config.js       # Configuração do Vite
└── README.md            # Documentação do projeto
```

---

## Configuração do Ambiente

1. Clone o repositório:

   ```
   git clone git@github.com:ralfguth/poc-supabase-todo.git
   cd poc-supabase-todo
   ```

2. Instale as dependências:

   ```
   npm install
   ```

3. Configure as variáveis de ambiente no arquivo `.env`:

   ```
   VITE_SUPABASE_URL=<sua_url_do_supabase>
   VITE_SUPABASE_ANON_KEY=<sua_chave_anonima>
   ```

4. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```

---

## Funcionalidades

- **Autenticação**: Somente usuários com e-mails previamente cadastrados podem se registrar e acessar o sistema.
- **Gerenciamento de Tarefas**:
  - Adicionar novas tarefas.
  - Visualizar lista de tarefas.
  - Atualizar e remover tarefas.

---

## Políticas de Segurança

- **Tabela `allowed_users`**:
  - Apenas leitura permitida pelo frontend.
  - Inserções, atualizações e exclusões são restritas ao painel do Supabase.
- **Tabela `tasks`**:
  - As tarefas são vinculadas aos usuários autenticados.
  - Políticas de Row Level Security (RLS) garantem acesso seguro aos dados.

---

## Scripts Disponíveis

- **`npm run dev`**: Inicia o ambiente de desenvolvimento.
- **`npm run build`**: Cria o build para produção.
- **`npm run preview`**: Visualiza o build de produção localmente.
- **`npm run lint`**: Verifica erros de lint no código.
