# StudyFlow 🎯

> Aplicação web simples, acolhedora e intuitiva desenvolvida para ajudar estudantes iniciantes a organizarem, visualizarem e acompanharem seus objetivos de estudo com foco e clareza.

---

## 📌 Sobre o Projeto

Estudantes que estão começando sua jornada educacional frequentemente enfrentam dificuldades para estruturar suas metas de estudo, perdendo a visão do progresso e o foco no que realmente importa. 

O **StudyFlow** resolve esse problema fornecendo um ambiente centralizado e descomplicado para gerenciamento prático de metas de estudo diárias, semanais ou mensais, com feedback visual em tempo real e persistência automática no navegador.

---

## ✨ Funcionalidades Principais (CRUD)

- **Criar Objetivos (Create):**
  - Cadastro intuitivo com **título**, **descrição**, **prazo** e **status inicial**.
  - Atalhos práticos de prazos (`+3 dias`, `+1 semana`, `+15 dias`) para facilitar a definição de metas alcançáveis.
  - Validação em tempo real com mensagens de orientação claras.

- **Visualizar e Acompanhar (Read):**
  - Exibição dos objetivos em formato de **cartões visuais (*cards*)**.
  - **Painel do Estudante:** Contador do total de objetivos cadastrados, divisão por status e barra de progresso percentual dinâmica.
  - Formatação de datas no padrão brasileiro (`DD/MM/AAAA`) com alertas inteligentes de proximidade do prazo (*Vence hoje*, *X dias restantes*, *Atrasado*).
  - **Estado Vazio Acolhedor (*Empty State*):** Mensagem motivacional e botão com sugestões de metas iniciais para quem está começando.

- **Atualizar Objetivos (Update):**
  - Modal de edição pré-preenchido para alterar título, descrição, prazo ou status a qualquer momento.
  - Ações rápidas de 1 clique direto no cartão (*Começar*, *Concluir*, *Reabrir*).

- **Exclusão Segura (Delete):**
  - Diálogo de confirmação obrigatório antes de remover qualquer meta, evitando perdas acidentais de dados.

- **Filtros e Busca em Tempo Real:**
  - Filtro por abas de status: *Todos*, *Não iniciados*, *Em andamento* e *Concluídos*.
  - Busca textual instantânea por título e descrição.
  - Ordenação flexível: por prazo mais próximo, prazo mais distante, data de criação ou ordem alfabética.

- **Persistência de Dados:**
  - Todos os dados são salvos no **`localStorage`** do navegador, mantendo as metas preservadas mesmo ao fechar ou recarregar a página.

---

## 🛠️ Tecnologias Utilizadas

- **[React 19](https://react.dev/):** Biblioteca para interfaces de usuário declarativas e componentes funcionais com hooks.
- **[TypeScript](https://www.typescriptlang.org/):** Tipagem estática estrita para garantir segurança e previsibilidade no código.
- **[Vite](https://vitejs.dev/):** Ferramenta de build rápida e moderna para desenvolvimento frontend.
- **[Tailwind CSS v4](https://tailwindcss.com/):** Framework utilitário de estilização responsiva e acessível.
- **[Lucide React](https://lucide.dev/):** Conjunto consistente de ícones vetoriais modernos.
- **Web Storage API (`localStorage`):** Persistência de dados cliente sem dependência de back-end.

---

## 📂 Estrutura do Projeto

```plaintext
studyflow/
├── src/
│   ├── components/
│   │   ├── DeleteConfirmModal.tsx # Modal de confirmação para exclusão segura
│   │   ├── EmptyState.tsx         # Mensagens informativas para lista vazia/filtros
│   │   ├── FilterControls.tsx     # Filtros por status, busca e ordenação
│   │   ├── GoalCard.tsx           # Cartão individual do objetivo de estudo
│   │   ├── GoalFormModal.tsx      # Formulário unificado de criação e edição
│   │   ├── Header.tsx             # Barra de navegação e cabeçalho da aplicação
│   │   └── StatsBar.tsx           # Contadores de metas e progresso geral
│   ├── services/
│   │   └── goalStorage.ts         # Serviço dedicado de leitura/escrita no localStorage
│   ├── types/
│   │   └── goal.ts                # Definições de tipos, interfaces e constantes
│   ├── utils/
│   │   └── date.ts                # Funções de formatação e cálculo de prazos em pt-BR
│   ├── App.tsx                    # Orquestrador de estado e fluxo principal
│   ├── index.css                  # Estilos globais e import do Tailwind
│   └── main.tsx                   # Ponto de entrada do React
├── index.html                     # HTML base com meta tags e fontes
├── package.json                   # Dependências e scripts do projeto
├── tsconfig.json                  # Configurações do compilador TypeScript
└── vite.config.ts                 # Configuração do Vite e plugins
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Passo a Passo

1. **Clone ou acesse o diretório do projeto:**
   ```bash
   cd studyflow
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse no seu navegador:**
   Abra [http://localhost:3000](http://localhost:3000) (ou a porta indicada no terminal).

5. **Para gerar a versão de produção:**
   ```bash
   npm run build
   ```

---

## 🧪 Critérios de Validação e Testes

| Requisito | Status | Como Validar |
| :--- | :---: | :--- |
| **Criar Objetivo** | ✅ | Clicar em "Novo Objetivo", preencher os campos e verificar se ele aparece na lista. |
| **Listar Cartões** | ✅ | Verificar os cartões exibindo título, descrição, prazo brasileiro e status. |
| **Contador Total** | ✅ | Conferir o painel superior com o total e a distribuição por status. |
| **Editar Objetivo** | ✅ | Clicar no ícone de lápis em um cartão, alterar valores e salvar. |
| **Confirmar Exclusão**| ✅ | Clicar no ícone de lixeira e validar que a remoção só ocorre após confirmar no modal. |
| **Persistência Local**| ✅ | Recarregar a página (F5) e verificar que todas as metas continuam salvas. |
| **Responsividade** | ✅ | Testar em telas de smartphone, tablet e desktop. |

---

## 📄 Licença

Este projeto é desenvolvido para fins educacionais e de produtividade pessoal.
