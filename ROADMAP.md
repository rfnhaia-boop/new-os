# ROADMAP — NEW OS

## 👁️ Visão do Produto
O **NEW OS** é o sistema operacional de inteligência corporativa da New. Ele unifica em uma única plataforma a documentação de processos, playbooks institucionais, fluxos de trabalho operacionais e tomadas de decisão guiadas por dados. Foi construído com foco em extrema performance, escalabilidade de dados, estética premium e experiência do usuário otimizada.

---

## 🏗️ Decisões de Arquitetura
1. **Next.js & App Router (SSG por Padrão)**: Geração estática de rotas (SSG) usando `generateStaticParams` para tempo de resposta instantâneo e robustez na entrega.
2. **Design System Atômico**: Componentes visuais desacoplados de regras de negócio em `src/components/ui/`, centralizando tokens de estilo (fundo `#0A0A0A`, cards `#111111`, bordas `#27272A`).
3. **Camada de Dados Isolada**: Todas as informações estáticas do sistema residem centralizadas na pasta `src/data/`. Nenhuma página consome ou define dados estruturais de forma hardcoded. Isso pavimenta o caminho para a futura integração com APIs e bancos de dados.
4. **Busca Global Centralizada**: Padrão de interação Ctrl + K integrado no layout principal (`AppShell`) atuando sobre todos os documentos e caminhos do sistema.

---

## 📦 Módulos Existentes
- **Dashboard (`/`)**: Visão geral de métricas, atividades, continuação rápida e acesso aos módulos.
- **Biblioteca de Documentos (`/documents`)**: Repositório completo de playbooks com busca e filtragem.
- **Visualizador Dinâmico (`/documents/[slug]`)**: Renderizador genérico e escalável para qualquer documento cadastrado.
- **Empresa (`/company`)**: Hub contendo documentos institucionais, missão, visão e valores.
- **NEX (`/nex`)**: Espaço operacional com os pilares operacionais e o fluxo da Jornada Comercial.

---

## 🏆 Sprints Concluídas

### Fase 1 — Fundação
- [x] **Sprint 01**: Criação do projeto base (Next.js, TypeScript, Tailwind CSS, Lucide).
- [x] **Sprint 02**: Estruturação do Layout (Sidebar responsiva, Header superior).
- [x] **Sprint 03**: Página Inicial (Dashboard de resumo e atividades).
- [x] **Sprint 04**: Biblioteca de Documentos (Filtros, busca e lista).
- [x] **Sprint 05**: Rota Dinâmica de Documentos (Visualizador unificado com relacionados).
- [x] **Sprint 06**: Área Empresa & Área NEX (Navegação estruturada e Jornada Comercial).

### Fase 2 — Funcionalidades
- [x] **Sprint 07**: Busca Global (Ctrl + K interativo por teclado).
- [x] **Sprint 08**: Centralização da Camada de Dados (interfaces e isolamento em `src/data/`).
- [x] **Sprint 09**: Favoritos (Mecanismo de favoritar documentos com persistência em localStorage).
- [x] **Sprint 10**: Recentes (Histórico de leitura ordenado com formatação de data relativa e integração no Dashboard).
- [x] **Sprint 11**: Tags e Filtros (Pesquisa normalizada multi-campo, filtros combinados na biblioteca, chips de tags e recomendador inteligente).
- [x] **Sprint 12**: Versionamento (Histórico completo de alterações com changelogs individuais, visualizador e rotas dedicadas por versão).
- [x] **Sprint 13**: Editor de Documentos (Interface baseada em blocos, navegação rápida por estrutura, edição de metadados e sincronização local).
- [x] **Sprint 14**: Usuários e Permissões (Modelagem de papéis, perfis de acesso, matriz de controle de permissões visual e proteção de ações).
- [x] **Sprint 15**: Clientes e CRM Base (Visualização em Kanban de funil de vendas, propostas vinculadas, contatos e métricas comerciais).
- [x] **Sprint 16**: Projetos e Entregas (Módulo operacional com entregáveis reativos, prazos, saúde do projeto, equipes e visão unificada).
- [x] **Sprint 17**: Tarefas e Gestão de Trabalho (Quadro Kanban interativo de tarefas diárias, filtros cruzados por projeto e responsáveis, prazos atrasados e controle de delegação).
- [x] **Sprint 18**: IA e Assistente de Documentos (Integração de assistente inteligente simulado com interface de chat moderna e acesso contextual com "anexos" de documentos do sistema baseados em palavras-chave).

---

## 🎉 Status do Projeto
**Versão local front-end — Concluída** 

O NEW OS está operante, modularizado, tipado de ponta-a-ponta e com uma base escalável para as próximas fases reais de integração com backend e banco de dados.

### 🚀 Próximas fases possíveis:
- Backend e banco de dados (Ex: Node/Nest + Prisma, ou Supabase)
- Autenticação real (Ex: NextAuth, Supabase Auth)
- Migração dos dados locais (Mover `src/data` para o banco)
- Site e Instagram da New/NEX (Integração de leads/marketing)
