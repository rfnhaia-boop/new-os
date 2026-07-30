import { ActorReference } from "./actors";
import { ImprovementProposal } from "./suggestions";
import { ImpactAssessment } from "./impact";
import { OperationalIngestion } from "./ingestion";

export const mockHumanActor: ActorReference = {
  type: "human",
  id: "user-rafael",
  name: "Rafael",
};

export const mockAIActor: ActorReference = {
  type: "ai_agent",
  id: "agent-cto",
  name: "CTO Agent",
};



export const mockFlowIngestion: OperationalIngestion = {
  id: "ing-flow-001",
  projectId: "proj_flow",
  title: "Flow — Entrega 3: Agenda Interna / Operação do Dia",
  referenceDate: "2026-07-22",
  sourceType: "conversation",
  sourceContent: `## Resumo Operacional: Flow - Entrega 3 (2026-07-22)

**Concluídos:**
- Correção do cancelamento de atendimentos concluídos.
- Validação de conflito de horário em walk-ins.
- Validação de disponibilidade na reatribuição de profissional.
- Implementação de check-in e fila de espera.
- Implementação de chamada do cliente e NoShow.
- Histórico operacional com AppointmentEvent.
- Implementação do papel Receptionist.
- Criação de BarberStaffMembership.
- Autorização baseada em vínculo ativo.
- Criação do StaffController.
- Reagendamento interno.
- Painel de Recepção responsivo.
- Correção do tratamento UTC/BRT.
- Suíte automatizada com 81 testes passando.

**Em andamento:**
- Refatoração da Minha Agenda do Profissional.
- Extração de componentes compartilhados (AppointmentRow, AppointmentStatusBadge, AppointmentActionButton, AppointmentSection).
- Conclusão do Bloco 2.16.

**Planejados:**
- Calendário diário, semanal e mensal.
- Drag-and-drop.
- Validação jornada completa.

**Decisões:**
- Histórico operacional por eventos (AppointmentEvent).
- Separação identidade x vínculo (BarberStaffMembership).
- Autorização contextual.
- Datas em BRT.`,
  actor: mockHumanActor,
  status: "approved",
  createdAt: "2026-07-22T00:00:00Z",
  updatedAt: "2026-07-22T00:00:00Z",
  createdBy: mockHumanActor,
  relatedEntities: [],
  changes: [
    // Completed
    { id: "c1", type: "task", title: "Correção do cancelamento de atendimentos concluídos", description: "Bug corrigido", classification: "completed", requiresApproval: false },
    { id: "c2", type: "task", title: "Validação de conflito de horário em walk-ins", description: "Nova validação", classification: "completed", requiresApproval: false },
    { id: "c3", type: "task", title: "Validação de disponibilidade na reatribuição de profissional", description: "Nova validação", classification: "completed", requiresApproval: false },
    { id: "c4", type: "task", title: "Implementação de check-in", description: "Nova funcionalidade", classification: "completed", requiresApproval: false },
    { id: "c5", type: "task", title: "Implementação de fila de espera", description: "Nova funcionalidade", classification: "completed", requiresApproval: false },
    { id: "c6", type: "task", title: "Implementação de chamada do cliente", description: "Nova funcionalidade", classification: "completed", requiresApproval: false },
    { id: "c7", type: "task", title: "Implementação de NoShow", description: "Nova funcionalidade", classification: "completed", requiresApproval: false },
    { id: "c8", type: "architecture", title: "Histórico operacional com AppointmentEvent", description: "Nova entidade estrutural", classification: "completed", requiresApproval: false },
    { id: "c9", type: "task", title: "Implementação do papel Receptionist", description: "Nova funcionalidade", classification: "completed", requiresApproval: false },
    { id: "c10", type: "architecture", title: "Criação de BarberStaffMembership", description: "Nova entidade", classification: "completed", requiresApproval: false },
    { id: "c11", type: "architecture", title: "Autorização baseada em vínculo ativo", description: "Novo padrão de autoriazação", classification: "completed", requiresApproval: false },
    { id: "c12", type: "architecture", title: "Criação do StaffController", description: "Controller dedicado", classification: "completed", requiresApproval: false },
    { id: "c13", type: "task", title: "Reagendamento interno", description: "Nova funcionalidade", classification: "completed", requiresApproval: false },
    { id: "c14", type: "task", title: "Painel de Recepção", description: "Nova funcionalidade", classification: "completed", requiresApproval: false },
    { id: "c15", type: "task", title: "Correção do tratamento UTC/BRT", description: "Bug corrigido", classification: "completed", requiresApproval: false },
    { id: "c16", type: "task", title: "Responsividade para desktop, tablet e mobile", description: "Melhoria de UI", classification: "completed", requiresApproval: false },
    { id: "c17", type: "task", title: "Eliminação de truncamento e scroll horizontal", description: "Bug corrigido", classification: "completed", requiresApproval: false },
    { id: "c18", type: "progress", title: "Suíte automatizada com 81 de 81 testes passando", description: "Progresso de QA", classification: "completed", requiresApproval: false },
    
    // In Progress
    { id: "c19", type: "task", title: "Refatoração da Minha Agenda do Profissional", description: "Reescrevendo a tela", classification: "in_progress", requiresApproval: false },
    { id: "c20", type: "architecture", title: "Extração de componentes compartilhados", description: "AppointmentRow, AppointmentStatusBadge, AppointmentActionButton, AppointmentSection", classification: "in_progress", requiresApproval: false },
    { id: "c21", type: "task", title: "Eliminação de duplicações entre Recepção e Minha Agenda", description: "Reuso de componentes", classification: "in_progress", requiresApproval: false },
    { id: "c22", type: "roadmap", title: "Conclusão do Bloco 2.16", description: "Feature em desenvolvimento", classification: "in_progress", requiresApproval: false },

    // Planned
    { id: "c23", type: "roadmap", title: "Calendário diário", description: "Visualização diária", classification: "planned", requiresApproval: false },
    { id: "c24", type: "roadmap", title: "Calendário semanal", description: "Visualização semanal", classification: "planned", requiresApproval: false },
    { id: "c25", type: "roadmap", title: "Calendário mensal", description: "Visualização mensal", classification: "planned", requiresApproval: false },
    { id: "c26", type: "task", title: "Drag-and-drop", description: "Interação avançada", classification: "planned", requiresApproval: false },
    { id: "c27", type: "task", title: "Validação completa da jornada Dono → Recepção → Profissional", description: "Testes end-to-end", classification: "planned", requiresApproval: false },

    // Decisions
    { id: "c28", type: "decision", title: "DEC-FLOW-001: Histórico operacional por eventos", description: "Utilizar AppointmentEvent para registrar o histórico operacional dos atendimentos. Motivação: evitar múltiplas colunas específicas em Appointment e manter uma linha do tempo auditável.", classification: "completed", target: { entityType: "decision", entityId: "dec-flow-001" }, requiresApproval: false },
    { id: "c29", type: "decision", title: "DEC-FLOW-002: Separação entre identidade e vínculo operacional", description: "Utilizar BarberStaffMembership para representar o vínculo entre usuário e barbearia. Motivação: separar a identidade global do usuário de seu papel e pertencimento.", classification: "completed", target: { entityType: "decision", entityId: "dec-flow-002" }, requiresApproval: false },
    { id: "c30", type: "decision", title: "DEC-FLOW-003: Autorização contextual por vínculo ativo", description: "Validar vínculo ativo com a barbearia, em vez de confiar somente no papel presente no token.", classification: "completed", target: { entityType: "decision", entityId: "dec-flow-003" }, requiresApproval: false },
    { id: "c31", type: "decision", title: "DEC-FLOW-004: Datas operacionais centralizadas em BRT", description: "Centralizar o cálculo das datas da agenda utilizando horário de Brasília.", classification: "completed", target: { entityType: "decision", entityId: "dec-flow-004" }, requiresApproval: false },
    { id: "c32", type: "decision", title: "DEC-FLOW-005: Componentes operacionais compartilhados", description: "Recepção e Minha Agenda devem reutilizar os mesmos componentes operacionais.", classification: "in_progress", target: { entityType: "decision", entityId: "dec-flow-005" }, requiresApproval: false },

    // Patterns
    { id: "c33", type: "pattern", title: "Identidade separada de vínculo organizacional", description: "Separar a entidade global de usuário da entidade que representa vínculo, papel, status e pertencimento dentro de uma organização.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-001" }, requiresApproval: true },
    { id: "c34", type: "pattern", title: "Autorização contextual por vínculo ativo", description: "Autorizações devem considerar identidade, papel, vínculo, status do vínculo e acesso à entidade solicitada.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-002" }, requiresApproval: true },
    { id: "c35", type: "pattern", title: "Histórico operacional baseado em eventos", description: "Alterações importantes de uma entidade devem ser representadas por eventos relacionados e auditáveis, evitando crescimento excessivo da entidade principal.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-003" }, requiresApproval: true },

    // Cross Project Impacts
    { id: "c36", type: "cross_project_impact", title: "Impacto no projeto Flow", description: "Impacto direto e positivo. A Agenda Interna passou a representar melhor a operação presencial real da barbearia.", classification: "informational", target: { entityType: "project", entityId: "proj_flow" }, requiresApproval: false },
    { id: "c37", type: "cross_project_impact", title: "Impacto no projeto NEW OS", description: "A evolução da Flow originou o primeiro caso real da funcionalidade de Ingestão Operacional.", classification: "informational", target: { entityType: "project", entityId: "proj_new_os" }, requiresApproval: false },
    { id: "c38", type: "cross_project_impact", title: "Impacto no projeto ERP", description: "Os padrões de vínculo organizacional, autorização contextual e histórico por eventos podem ser avaliados em módulos futuros.", classification: "informational", target: { entityType: "project", entityId: "proj_erp" }, requiresApproval: false },
  ]
};

export const mockFlowDocIngestion: OperationalIngestion = {
  id: "ing-flow-doc-001",
  kind: "documentation",
  projectId: "proj_flow",
  title: "Fundação Documental do Flow",
  referenceDate: "2026-07-22",
  sourceType: "system",
  sourceContent: "Ingestão oficial da documentação do produto FLOW.\nResultado: 0 de 10 documentos ingeridos.\nMotivo: documentos-fonte ausentes no repositório.",
  actor: mockAIActor,
  status: "partial",
  createdAt: "2026-07-22T00:00:00Z",
  updatedAt: "2026-07-22T00:00:00Z",
  createdBy: mockAIActor,
  relatedEntities: [],
  changes: []
};

export const mockNexBrandingIngestion: OperationalIngestion = {
  id: "ing-nex-001",
  kind: "operational",
  projectId: "proj_nex",
  title: "Sessão de Branding — Evolução da Metodologia de Identidade Visual",
  referenceDate: "2026-07-22",
  sourceType: "conversation",
  sourceContent: `## Resumo Operacional: Sessão de Branding NEX (2026-07-22)

**Status da sessão:** Concluída
**Área:** Branding
**Categoria:** Design System

**Resultado principal:**
A metodologia de construção da identidade visual da NEX foi alterada.
O símbolo deixa de ser o ponto inicial.
A linguagem visual passa a ser a fundação do sistema.

**Decisões:**
- DEC-NEX-001: A linguagem visual passa a ser a fundação do sistema.
- DEC-NEX-002: A comunicação não deverá representar tecnologia.
- DEC-NEX-003: Glass Layer torna-se princípio oficial do sistema visual da marca.
- DEC-NEX-004: Metodologia oficial: Pesquisa -> Linguagem -> Sistema -> Símbolo.

**Pesquisas concluídas:**
- Pesquisa 06 — Famílias de Símbolos
- Pesquisa 07 — Geometrias Fundamentais

**Explorações:**
Diversas explorações geométricas foram realizadas (representam aprendizado, não a identidade definitiva).

**Descoberta principal:**
O problema principal não está no desenho do símbolo, mas na ausência de uma linguagem geométrica consolidada.

**Hipótese aberta:**
Estrutura como Linguagem Visual. (Em investigação)

**Próximas pesquisas (Roadmap):**
- Engenharia estrutural
- Arquitetura contemporânea
- Design industrial
- Sistemas de wayfinding
- Padrões naturais de crescimento
- Geometrias matemáticas
- Identidades de museus
- Análise estrutural de marcas icônicas`,
  actor: mockHumanActor,
  status: "approved",
  createdAt: "2026-07-22T00:00:00Z",
  updatedAt: "2026-07-22T00:00:00Z",
  createdBy: mockHumanActor,
  relatedEntities: [],
  changes: [
    { id: "nex-c1", type: "decision", title: "DEC-NEX-001: Linguagem visual como fundação", description: "O símbolo deixa de ser o ponto inicial da identidade. A linguagem visual passa a ser a fundação do sistema.", classification: "completed", target: { entityType: "decision", entityId: "dec-nex-001" }, requiresApproval: false },
    { id: "nex-c2", type: "decision", title: "DEC-NEX-002: Não representação de tecnologia", description: "A comunicação visual da NEX não deverá representar tecnologia. Elementos associados a IA, software, código, circuitos, cubos, hexágonos, foguetes e símbolos genéricos de startups deixam de fazer parte da linguagem oficial.", classification: "completed", target: { entityType: "decision", entityId: "dec-nex-002" }, requiresApproval: false },
    { id: "nex-c3", type: "decision", title: "DEC-NEX-003: Glass Layer como princípio", description: "Glass Layer torna-se um princípio oficial do sistema visual da marca. Seu comportamento poderá evoluir ao longo do tempo sem alterar a identidade institucional.", classification: "completed", target: { entityType: "decision", entityId: "dec-nex-003" }, requiresApproval: false },
    { id: "nex-c4", type: "decision", title: "DEC-NEX-004: Metodologia oficial", description: "A metodologia oficial passa a seguir: Pesquisa → Linguagem → Sistema → Símbolo", classification: "completed", target: { entityType: "decision", entityId: "dec-nex-004" }, requiresApproval: false },

    { id: "nex-c5", type: "progress", title: "Pesquisa 06 — Famílias de Símbolos", description: "Pesquisa concluída conforme resumo operacional.", classification: "completed", requiresApproval: false },
    { id: "nex-c6", type: "progress", title: "Pesquisa 07 — Geometrias Fundamentais", description: "Pesquisa concluída conforme resumo operacional.", classification: "completed", requiresApproval: false },

    { id: "nex-c7", type: "progress", title: "Explorações Geométricas", description: "Diversas explorações geométricas foram realizadas. Representam aprendizado e não a identidade definitiva da marca.", classification: "informational", requiresApproval: false },

    { id: "nex-c8", type: "progress", title: "Descoberta: Ausência de linguagem consolidada", description: "O problema principal não está no desenho do símbolo. Está na ausência de uma linguagem geométrica consolidada. O símbolo deverá surgir como consequência dessa linguagem.", classification: "informational", requiresApproval: false },

    { id: "nex-c9", type: "progress", title: "Hipótese: Estrutura como Linguagem Visual", description: "Investigar uma linguagem baseada em estrutura, engenharia, arquitetura, equilíbrio, compressão, tração e tensão antes da definição do símbolo definitivo.", classification: "in_progress", requiresApproval: false },

    { id: "nex-c10", type: "roadmap", title: "Engenharia estrutural", description: "Próxima pesquisa", classification: "planned", requiresApproval: false },
    { id: "nex-c11", type: "roadmap", title: "Arquitetura contemporânea", description: "Próxima pesquisa", classification: "planned", requiresApproval: false },
    { id: "nex-c12", type: "roadmap", title: "Design industrial", description: "Próxima pesquisa", classification: "planned", requiresApproval: false },
    { id: "nex-c13", type: "roadmap", title: "Sistemas de wayfinding", description: "Próxima pesquisa", classification: "planned", requiresApproval: false },
    { id: "nex-c14", type: "roadmap", title: "Padrões naturais de crescimento", description: "Próxima pesquisa", classification: "planned", requiresApproval: false },
    { id: "nex-c15", type: "roadmap", title: "Geometrias matemáticas", description: "Próxima pesquisa", classification: "planned", requiresApproval: false },
    { id: "nex-c16", type: "roadmap", title: "Identidades de museus", description: "Próxima pesquisa", classification: "planned", requiresApproval: false },
    { id: "nex-c17", type: "roadmap", title: "Análise estrutural de marcas icônicas", description: "Próxima pesquisa", classification: "planned", requiresApproval: false },

    { id: "nex-c18", type: "pattern", title: "PATTERN-NEX-001", description: "Grandes identidades são consequência de sistemas e não de símbolos.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-nex-001" }, requiresApproval: true },
    { id: "nex-c19", type: "pattern", title: "PATTERN-NEX-002", description: "Toda identidade deve possuir uma gramática antes de possuir um logotipo.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-nex-002" }, requiresApproval: true },
    { id: "nex-c20", type: "pattern", title: "PATTERN-NEX-003", description: "A comunicação deve representar propósito e não tecnologia.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-nex-003" }, requiresApproval: true },

    { id: "nex-c21", type: "cross_project_impact", title: "Impacto: NEW", description: "A evolução da linguagem visual da NEX poderá influenciar este sistema futuramente.", classification: "informational", target: { entityType: "project", entityId: "proj_new" }, requiresApproval: false },
    { id: "nex-c22", type: "cross_project_impact", title: "Impacto: NEW OS", description: "A evolução da linguagem visual da NEX poderá influenciar este sistema futuramente.", classification: "informational", target: { entityType: "project", entityId: "proj_new_os" }, requiresApproval: false },
    { id: "nex-c23", type: "cross_project_impact", title: "Impacto: Sistema de PDFs", description: "A evolução da linguagem visual da NEX poderá influenciar este sistema futuramente.", classification: "informational", target: { entityType: "project", entityId: "proj_pdfs" }, requiresApproval: false },
    { id: "nex-c24", type: "cross_project_impact", title: "Impacto: Design System", description: "A evolução da linguagem visual da NEX poderá influenciar este sistema futuramente.", classification: "informational", target: { entityType: "project", entityId: "proj_design_system" }, requiresApproval: false },
    { id: "nex-c25", type: "cross_project_impact", title: "Impacto: Dashboards", description: "A evolução da linguagem visual da NEX poderá influenciar este sistema futuramente.", classification: "informational", target: { entityType: "project", entityId: "proj_dashboards" }, requiresApproval: false },
    { id: "nex-c26", type: "cross_project_impact", title: "Impacto: Produtos futuros", description: "A evolução da linguagem visual da NEX poderá influenciar este sistema futuramente.", classification: "informational", target: { entityType: "project", entityId: "proj_future" }, requiresApproval: false },

    { id: "nex-c27", type: "progress", title: "Knowledge Candidate: Gramática Geométrica", description: "Candidato para futura documentação institucional.", classification: "planned", requiresApproval: false },
    { id: "nex-c28", type: "progress", title: "Knowledge Candidate: Glass Layer", description: "Candidato para futura documentação institucional.", classification: "planned", requiresApproval: false },
    { id: "nex-c29", type: "progress", title: "Knowledge Candidate: Estrutura como Linguagem Visual", description: "Candidato para futura documentação institucional.", classification: "planned", requiresApproval: false },
    { id: "nex-c30", type: "progress", title: "Knowledge Candidate: Evolução Estruturada", description: "Candidato para futura documentação institucional.", classification: "planned", requiresApproval: false },
  ]
};

export const mockFlowControlIngestion: OperationalIngestion = {
  id: "ing-flow-control-001",
  kind: "operational",
  projectId: "proj_flow",
  title: "Módulo de Controle — Fundação, Primeira Interface e Direcionamento de UX",
  referenceDate: "2026-07-23",
  sourceType: "conversation",
  sourceContent: `## Resumo Operacional: Módulo de Controle do Flow (2026-07-23)

**Status do Projeto Atualizado:**
- Fundação documental concluída.
- Desenvolvimento retorna ao foco no produto.
- Módulo de Controle iniciado.
- Primeira interface implementada.
- Refinamento de UX em andamento.
- Integrações permanecem planejadas para etapa posterior.

**Decisões:**
- DEC-FLOW-006: O Módulo de Controle passa a ser o coração operacional do Flow.
- DEC-FLOW-007: O escopo do módulo deixa de representar um painel técnico, focando exclusivamente no operacional.
- DEC-FLOW-008: Toda a primeira fase do módulo será construída utilizando dados mockados.
- DEC-FLOW-009: O Dashboard principal não será alterado prematuramente. Evolução isolada.
- DEC-FLOW-010: A validação de UX possui prioridade sobre novas funcionalidades.

**Arquitetura:**
- Reutilização integral do Design System existente.
- Ausência de arquitetura paralela.
- Isolamento do módulo.
- Desenvolvimento baseado em mock data.
- Preservação da arquitetura atual do Dashboard.

**Implementações (Mocks Visuais):**
- Cabeçalho Operacional
- Ações Rápidas
- Resumo do Dia
- Operação Agora
- Fila de Espera
- Agenda do Dia
- Equipe
- Alertas Operacionais

**Auditoria de UX:**
- reduzir espaço das ações rápidas
- compactar KPIs
- aumentar destaque da Operação Agora
- aproximar fila da área principal
- reforçar hierarquia visual
- aproximar o layout da operação real de uma barbearia
Qualidade atual aproximada: 7/10 (observação interna)

**Roadmap:**
- Próximas etapas: refinamento da experiência, hierarquia visual, redução de ruído, velocidade de leitura, aproximação da operação real.
- Pendentes: backend, WebSocket, pagamentos, integrações externas.
`,
  actor: mockHumanActor,
  status: "approved",
  createdAt: "2026-07-23T00:00:00Z",
  updatedAt: "2026-07-23T00:00:00Z",
  createdBy: mockHumanActor,
  relatedEntities: [],
  changes: [
    { id: "fc-c1", type: "decision", title: "DEC-FLOW-006: Coração Operacional", description: "O Módulo de Controle passa a ser o coração operacional do Flow, concentrando a operação diária da barbearia.", classification: "completed", target: { entityType: "decision", entityId: "dec-flow-006" }, requiresApproval: false },
    { id: "fc-c2", type: "decision", title: "DEC-FLOW-007: Escopo Operacional Exclusivo", description: "O escopo do módulo deixa de representar um painel técnico e foca apenas em agenda, fila, atendimentos, profissionais, clientes e alertas.", classification: "completed", target: { entityType: "decision", entityId: "dec-flow-007" }, requiresApproval: false },
    { id: "fc-c3", type: "decision", title: "DEC-FLOW-008: Dados Mockados na Primeira Fase", description: "Toda a primeira fase do módulo será construída utilizando dados mockados.", classification: "completed", target: { entityType: "decision", entityId: "dec-flow-008" }, requiresApproval: false },
    { id: "fc-c4", type: "decision", title: "DEC-FLOW-009: Dashboard Isolado", description: "O Dashboard principal não será alterado prematuramente. Evolução será isolada até atingir maturidade.", classification: "completed", target: { entityType: "decision", entityId: "dec-flow-009" }, requiresApproval: false },
    { id: "fc-c5", type: "decision", title: "DEC-FLOW-010: Prioridade em UX", description: "A validação de UX possui prioridade sobre novas funcionalidades e integrações.", classification: "completed", target: { entityType: "decision", entityId: "dec-flow-010" }, requiresApproval: false },

    { id: "fc-c6", type: "architecture", title: "Reutilização do Design System", description: "Reutilização integral do Design System existente.", classification: "completed", requiresApproval: false },
    { id: "fc-c7", type: "architecture", title: "Ausência de Arquitetura Paralela", description: "Isolamento do módulo sem criação de arquitetura paralela.", classification: "completed", requiresApproval: false },
    { id: "fc-c8", type: "architecture", title: "Preservação do Dashboard", description: "Preservação da arquitetura atual do Dashboard.", classification: "completed", requiresApproval: false },

    { id: "fc-c9", type: "task", title: "Cabeçalho Operacional", description: "Implementação visual com dados simulados.", classification: "completed", requiresApproval: false },
    { id: "fc-c10", type: "task", title: "Ações Rápidas", description: "Implementação visual com dados simulados.", classification: "completed", requiresApproval: false },
    { id: "fc-c11", type: "task", title: "Resumo do Dia", description: "Implementação visual com dados simulados.", classification: "completed", requiresApproval: false },
    { id: "fc-c12", type: "task", title: "Operação Agora", description: "Implementação visual com dados simulados.", classification: "completed", requiresApproval: false },
    { id: "fc-c13", type: "task", title: "Fila de Espera", description: "Implementação visual com dados simulados.", classification: "completed", requiresApproval: false },
    { id: "fc-c14", type: "task", title: "Agenda do Dia", description: "Implementação visual com dados simulados.", classification: "completed", requiresApproval: false },
    { id: "fc-c15", type: "task", title: "Equipe", description: "Implementação visual com dados simulados.", classification: "completed", requiresApproval: false },
    { id: "fc-c16", type: "task", title: "Alertas Operacionais", description: "Implementação visual com dados simulados.", classification: "completed", requiresApproval: false },

    { id: "fc-c17", type: "progress", title: "Auditoria de UX: Redução de espaço", description: "Reduzir espaço das ações rápidas e compactar KPIs.", classification: "in_progress", requiresApproval: false },
    { id: "fc-c18", type: "progress", title: "Auditoria de UX: Operação e Fila", description: "Aumentar destaque da Operação Agora e aproximar fila da área principal.", classification: "in_progress", requiresApproval: false },
    { id: "fc-c19", type: "progress", title: "Auditoria de UX: Hierarquia e Realidade", description: "Reforçar hierarquia visual e aproximar o layout da operação real de uma barbearia.", classification: "in_progress", requiresApproval: false },
    { id: "fc-c20", type: "progress", title: "Avaliação Interna de Interface", description: "Qualidade atual aproximada: 7/10 (observação interna da equipe de produto).", classification: "informational", requiresApproval: false },

    { id: "fc-c21", type: "roadmap", title: "Refinamento da experiência", description: "Próxima etapa do roadmap.", classification: "planned", requiresApproval: false },
    { id: "fc-c22", type: "roadmap", title: "Backend, WebSocket e Pagamentos", description: "Integrações externas e serviços reais (mantidos pendentes).", classification: "planned", requiresApproval: false },

    { id: "fc-c23", type: "pattern", title: "PATTERN-FLOW-004", description: "Painéis operacionais devem priorizar leitura rápida em vez de densidade de informação.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-flow-004" }, requiresApproval: true },
    { id: "fc-c24", type: "pattern", title: "PATTERN-FLOW-005", description: "A experiência operacional deve ser validada antes da integração técnica.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-flow-005" }, requiresApproval: true },
    { id: "fc-c25", type: "pattern", title: "PATTERN-FLOW-006", description: "A primeira implementação de novos módulos deve utilizar dados mockados para validar UX antes da conexão com serviços reais.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-flow-006" }, requiresApproval: true },

    { id: "fc-c26", type: "cross_project_impact", title: "Impacto Potencial: NEW OS", description: "Relacionamento de impacto futuro.", classification: "informational", target: { entityType: "project", entityId: "proj_new_os" }, requiresApproval: false },
    { id: "fc-c27", type: "cross_project_impact", title: "Impacto Potencial: Design System e Component Library", description: "Relacionamento de impacto futuro.", classification: "informational", target: { entityType: "project", entityId: "proj_design_system" }, requiresApproval: false },
    { id: "fc-c28", type: "cross_project_impact", title: "Impacto Potencial: Dashboards futuros", description: "Relacionamento de impacto futuro.", classification: "informational", target: { entityType: "project", entityId: "proj_dashboards" }, requiresApproval: false },

    { id: "fc-c29", type: "progress", title: "Knowledge Candidate: Painel Operacional", description: "Candidato para documentação.", classification: "planned", requiresApproval: false },
    { id: "fc-c30", type: "progress", title: "Knowledge Candidate: Operação Agora", description: "Candidato para documentação.", classification: "planned", requiresApproval: false },
    { id: "fc-c31", type: "progress", title: "Knowledge Candidate: Hierarquia Operacional", description: "Candidato para documentação.", classification: "planned", requiresApproval: false },
    { id: "fc-c32", type: "progress", title: "Knowledge Candidate: Dashboard Operacional", description: "Candidato para documentação.", classification: "planned", requiresApproval: false },
    { id: "fc-c33", type: "progress", title: "Knowledge Candidate: Fluxo de Controle Diário", description: "Candidato para documentação.", classification: "planned", requiresApproval: false },
  ]
};

export const mockFlowConsolidationIngestion: OperationalIngestion = {
  id: "ing-flow-consolidation-001",
  kind: "operational",
  projectId: "proj_flow",
  title: "Consolidação da Jornada Operacional, Central Operacional e Infraestrutura PostgreSQL",
  referenceDate: "2026-07-23",
  sourceType: "conversation",
  sourceContent: `## Resumo Operacional: Consolidação do Produto Flow (2026-07-23)

**Fase:** Consolidação de Produto

**Status Institucional:**
- Jornada Operacional consolidada.
- Central Operacional visualmente consolidada.
- Infraestrutura PostgreSQL consolidada.
- Frontend em estabilização contínua.
- Preparação para integração completa do MVP.

**Decisões:**
- DEC-FLOW-011: "Abertura de Caixa" substituído por "Jornada Operacional".
- DEC-FLOW-012: Central Operacional torna-se o ponto oficial de início e encerramento da operação diária.
- DEC-FLOW-013: A interface da Central Operacional é considerada funcionalmente congelada.
- DEC-FLOW-014: Backend e Frontend em frentes independentes, integração após estabilização.
- DEC-FLOW-015: Estratégia de pequenos commits isolados permanece como padrão oficial.

**Jornada Operacional (Conceito):**
Fluxo: Sistema bloqueado -> Abertura da operação -> Operação ativa -> Fechamento operacional -> Sistema bloqueado.

**Backend (Infraestrutura pronta para produção):**
Auditoria do schema, correção de incompatibilidades, validação de banco vazio/upgrade/rollback, ampliação de testes automatizados e consolidação PostgreSQL.

**Frontend:**
Limpeza de imports, eliminação de \`any\`, contratos de tipos e redução de dívida técnica. Nenhum lote alterou o comportamento das telas.

**Processo Operacional (Divisão temporária da sessão):**
- Antigravity: UX, UI, Experiência Visual.
- Claude: Domínio, Backend, PostgreSQL, Arquitetura.
- Codex: Estabilidade, Lint, Tipagem, Limpeza, Produção.
`,
  actor: mockHumanActor,
  status: "approved",
  createdAt: "2026-07-23T22:00:00Z",
  updatedAt: "2026-07-23T22:00:00Z",
  createdBy: mockHumanActor,
  relatedEntities: [],
  changes: [
    { id: "fco-c1", type: "decision", title: "DEC-FLOW-011: Jornada Operacional", description: "O conceito de 'Abertura de Caixa' é oficialmente substituído por 'Jornada Operacional', representando todo o ciclo diário.", classification: "completed", target: { entityType: "decision", entityId: "dec-flow-011" }, requiresApproval: false },
    { id: "fco-c2", type: "decision", title: "DEC-FLOW-012: Início e Encerramento", description: "A Central Operacional torna-se o ponto oficial de início e encerramento da operação diária.", classification: "completed", target: { entityType: "decision", entityId: "dec-flow-012" }, requiresApproval: false },
    { id: "fco-c3", type: "decision", title: "DEC-FLOW-013: Interface Congelada", description: "A interface da Central Operacional está funcionalmente congelada. Foco em integrações.", classification: "completed", target: { entityType: "decision", entityId: "dec-flow-013" }, requiresApproval: false },
    { id: "fco-c4", type: "decision", title: "DEC-FLOW-014: Evolução Independente", description: "Backend e Frontend permanecem evoluindo em frentes independentes.", classification: "completed", target: { entityType: "decision", entityId: "dec-flow-014" }, requiresApproval: false },
    { id: "fco-c5", type: "decision", title: "DEC-FLOW-015: Pequenos Commits", description: "Estratégia de pequenos commits isolados como padrão oficial.", classification: "completed", target: { entityType: "decision", entityId: "dec-flow-015" }, requiresApproval: false },

    { id: "fco-c6", type: "progress", title: "Definição definitiva da Jornada Operacional", description: "Marco evolutivo concluído.", classification: "completed", requiresApproval: false },
    { id: "fco-c7", type: "progress", title: "Consolidação visual da Central Operacional", description: "Marco evolutivo concluído.", classification: "completed", requiresApproval: false },
    { id: "fco-c8", type: "progress", title: "Estabilização incremental do frontend", description: "Marco evolutivo concluído.", classification: "completed", requiresApproval: false },
    { id: "fco-c9", type: "progress", title: "Consolidação da infraestrutura PostgreSQL", description: "Marco evolutivo concluído.", classification: "completed", requiresApproval: false },

    { id: "fco-c10", type: "architecture", title: "Fluxo Oficial da Jornada Operacional", description: "Sistema bloqueado -> Abertura da operação -> Operação ativa -> Fechamento operacional -> Sistema bloqueado.", classification: "informational", requiresApproval: false },

    { id: "fco-c11", type: "task", title: "Backend: Infraestrutura PostgreSQL", description: "Auditoria do schema, correção de incompatibilidades, validações de upgrade/rollback, checklists e scripts.", classification: "completed", requiresApproval: false },
    { id: "fco-c12", type: "task", title: "Frontend: Estabilização de Tipagem", description: "Remoção de imports, eliminação de any e criação de contratos de tipos. Nenhum comportamento funcional alterado.", classification: "completed", requiresApproval: false },
    { id: "fco-c13", type: "task", title: "Processo: Divisão Operacional", description: "Divisão de frentes (Antigravity/Claude/Codex) durante a sessão para evolução do sistema.", classification: "informational", requiresApproval: false },

    { id: "fco-c14", type: "roadmap", title: "Construção inicial da Central Operacional", description: "Encerrado com sucesso.", classification: "completed", requiresApproval: false },
    { id: "fco-c15", type: "roadmap", title: "Implementação completa da Jornada Operacional no backend", description: "Mover para foco principal.", classification: "planned", requiresApproval: false },
    { id: "fco-c16", type: "roadmap", title: "Endpoints reais", description: "Mover para foco principal.", classification: "planned", requiresApproval: false },
    { id: "fco-c17", type: "roadmap", title: "Integração Frontend ↔ Backend", description: "Mover para foco principal.", classification: "planned", requiresApproval: false },
    { id: "fco-c18", type: "roadmap", title: "Validação funcional completa", description: "Mover para foco principal.", classification: "planned", requiresApproval: false },
    { id: "fco-c19", type: "roadmap", title: "Preparação do MVP", description: "Mover para foco principal.", classification: "planned", requiresApproval: false },

    { id: "fco-c20", type: "pattern", title: "PATTERN-FLOW-007", description: "Conceitos operacionais devem representar o processo completo e não apenas etapas isoladas.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-flow-007" }, requiresApproval: true },
    { id: "fco-c21", type: "pattern", title: "PATTERN-FLOW-008", description: "Interfaces operacionais devem ser congeladas antes do início das integrações.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-flow-008" }, requiresApproval: true },
    { id: "fco-c22", type: "pattern", title: "PATTERN-FLOW-009", description: "Infraestrutura deve ser validada em ambiente equivalente ao de produção antes da preparação do MVP.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-flow-009" }, requiresApproval: true },
    { id: "fco-c23", type: "pattern", title: "PATTERN-FLOW-010", description: "Pequenos commits isolados reduzem risco e facilitam auditoria durante estabilizações.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-flow-010" }, requiresApproval: true },

    { id: "fco-c24", type: "cross_project_impact", title: "Impacto: NEW OS", description: "Relacionamento institucional.", classification: "informational", target: { entityType: "project", entityId: "proj_new_os" }, requiresApproval: false },
    { id: "fco-c25", type: "cross_project_impact", title: "Impacto: Backend Foundation", description: "Relacionamento institucional.", classification: "informational", target: { entityType: "project", entityId: "proj_backend_foundation" }, requiresApproval: false },
    { id: "fco-c26", type: "cross_project_impact", title: "Impacto: PostgreSQL Standards", description: "Relacionamento institucional.", classification: "informational", target: { entityType: "project", entityId: "proj_postgres_standards" }, requiresApproval: false },
    { id: "fco-c27", type: "cross_project_impact", title: "Impacto: Design System", description: "Relacionamento institucional.", classification: "informational", target: { entityType: "project", entityId: "proj_design_system" }, requiresApproval: false },
    { id: "fco-c28", type: "cross_project_impact", title: "Impacto: Component Library", description: "Relacionamento institucional.", classification: "informational", target: { entityType: "project", entityId: "proj_component_library" }, requiresApproval: false },
    { id: "fco-c29", type: "cross_project_impact", title: "Impacto: Arquitetura Operacional", description: "Relacionamento institucional.", classification: "informational", target: { entityType: "project", entityId: "proj_operational_arch" }, requiresApproval: false },
    { id: "fco-c30", type: "cross_project_impact", title: "Impacto: MVP Framework", description: "Relacionamento institucional.", classification: "informational", target: { entityType: "project", entityId: "proj_mvp_framework" }, requiresApproval: false },

    { id: "fco-c31", type: "progress", title: "Knowledge Candidate: Jornada Operacional", description: "Candidato para documentação.", classification: "planned", requiresApproval: false },
    { id: "fco-c32", type: "progress", title: "Knowledge Candidate: Ciclo Operacional Diário", description: "Candidato para documentação.", classification: "planned", requiresApproval: false },
    { id: "fco-c33", type: "progress", title: "Knowledge Candidate: Central Operacional", description: "Candidato para documentação.", classification: "planned", requiresApproval: false },
    { id: "fco-c34", type: "progress", title: "Knowledge Candidate: Consolidação de Produto", description: "Candidato para documentação.", classification: "planned", requiresApproval: false },
    { id: "fco-c35", type: "progress", title: "Knowledge Candidate: Estratégia de Estabilização", description: "Candidato para documentação.", classification: "planned", requiresApproval: false },
    { id: "fco-c36", type: "progress", title: "Knowledge Candidate: Arquitetura de Integração", description: "Candidato para documentação.", classification: "planned", requiresApproval: false },
    { id: "fco-c37", type: "progress", title: "Knowledge Candidate: Infraestrutura PostgreSQL Validada", description: "Candidato para documentação.", classification: "planned", requiresApproval: false },
  ]
};

export const mockNexStrategyIngestion: OperationalIngestion = {
  id: "ing-nex-strategy-001",
  kind: "operational",
  projectId: "proj_nex",
  title: "Transição da Estratégia para Operação Comercial",
  referenceDate: "2026-07-23",
  sourceType: "conversation",
  sourceContent: `## Resumo Operacional: Transição Estratégica da NEX (2026-07-23)

**Fase anterior:** Estruturação Estratégica
**Nova fase:** Operação Comercial

**Status Institucional:**
- Missão operacional consolidada.
- Modelo de crescimento definido.
- Plano de execução imediata aprovado.
- Início da validação em projetos reais.

**Decisões:**
- DEC-NEX-005: Não será agência nem software house. É a interface entre a NEW e o mercado.
- DEC-NEX-006: Missão: validar mercado, gerar receita, implantar soluções, financiar a holding e acelerar evolução.
- DEC-NEX-007: Duas fases (Fase 1: Previsibilidade/Financiamento -> Fase 2: Crescimento/Projetos Premium).
- DEC-NEX-008: Escalabilidade via método. "Processo padronizado. Soluções personalizadas."
- DEC-NEX-009: Operação enxuta com parcerias externas quando necessário.

**Marcos Estratégicos:**
Definição da missão, consolidação do posicionamento, definição de fases e modelo operacional, planejamento de validação.

**Roadmap Imediato:**
Operar metodologia internamente, validar no Estúdio Martel e na Isa, refinar processo comercial, produzir conteúdo e iniciar prospecção.
`,
  actor: mockHumanActor,
  status: "approved",
  createdAt: "2026-07-23T22:30:00Z",
  updatedAt: "2026-07-23T22:30:00Z",
  createdBy: mockHumanActor,
  relatedEntities: [],
  changes: [
    { id: "ns-c1", type: "decision", title: "DEC-NEX-005: Interface com o Mercado", description: "A NEX não será construída como uma agência tradicional nem como uma software house. Sua função oficial é atuar como a interface entre a NEW e o mercado.", classification: "completed", target: { entityType: "decision", entityId: "dec-nex-005" }, requiresApproval: false },
    { id: "ns-c2", type: "decision", title: "DEC-NEX-006: Missão Operacional", description: "Missão: validar mercado, gerar receita, implantar soluções, financiar o crescimento da holding e acelerar a evolução dos produtos da NEW.", classification: "completed", target: { entityType: "decision", entityId: "dec-nex-006" }, requiresApproval: false },
    { id: "ns-c3", type: "decision", title: "DEC-NEX-007: Fases de Crescimento", description: "Crescimento em 2 fases. Fase 1: previsibilidade e financiamento. Fase 2: arquitetura de crescimento e consultoria premium. A Fase 1 financia a Fase 2.", classification: "completed", target: { entityType: "decision", entityId: "dec-nex-007" }, requiresApproval: false },
    { id: "ns-c4", type: "decision", title: "DEC-NEX-008: Escalabilidade pelo Método", description: "Processo padronizado. Soluções personalizadas.", classification: "completed", target: { entityType: "decision", entityId: "dec-nex-008" }, requiresApproval: false },
    { id: "ns-c5", type: "decision", title: "DEC-NEX-009: Operação Enxuta", description: "Operação enxuta. Especialidades externas por parceiros conforme a necessidade.", classification: "completed", target: { entityType: "decision", entityId: "dec-nex-009" }, requiresApproval: false },

    { id: "ns-c6", type: "progress", title: "Definição da missão operacional", description: "Marco estratégico atingido.", classification: "completed", requiresApproval: false },
    { id: "ns-c7", type: "progress", title: "Consolidação do posicionamento institucional", description: "Marco estratégico atingido.", classification: "completed", requiresApproval: false },
    { id: "ns-c8", type: "progress", title: "Definição das duas fases de crescimento", description: "Marco estratégico atingido.", classification: "completed", requiresApproval: false },
    { id: "ns-c9", type: "progress", title: "Definição do modelo operacional", description: "Marco estratégico atingido.", classification: "completed", requiresApproval: false },
    { id: "ns-c10", type: "progress", title: "Planejamento da primeira validação prática", description: "Marco estratégico atingido.", classification: "completed", requiresApproval: false },

    { id: "ns-c11", type: "roadmap", title: "Estruturação estratégica inicial", description: "Encerrado.", classification: "completed", requiresApproval: false },
    { id: "ns-c12", type: "roadmap", title: "Operar a metodologia internamente", description: "Mover para foco principal.", classification: "planned", requiresApproval: false },
    { id: "ns-c13", type: "roadmap", title: "Validar no Estúdio Martel", description: "Mover para foco principal.", classification: "planned", requiresApproval: false },
    { id: "ns-c14", type: "roadmap", title: "Validar na Isa", description: "Mover para foco principal.", classification: "planned", requiresApproval: false },
    { id: "ns-c15", type: "roadmap", title: "Refinar o processo comercial", description: "Mover para foco principal.", classification: "planned", requiresApproval: false },
    { id: "ns-c16", type: "roadmap", title: "Produzir conteúdo institucional (Instagram e LinkedIn)", description: "Mover para foco principal.", classification: "planned", requiresApproval: false },
    { id: "ns-c17", type: "roadmap", title: "Iniciar prospecção", description: "Utilizando a própria metodologia. Mover para foco principal.", classification: "planned", requiresApproval: false },

    { id: "ns-c18", type: "pattern", title: "PI-NEX-001: Princípio Filosófico", description: "Constância constrói sobrevivência. Metodologia constrói crescimento.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pi-nex-001" }, requiresApproval: true },
    { id: "ns-c19", type: "pattern", title: "PI-NEX-002: Princípio Metodológico", description: "Processo padronizado. Soluções personalizadas.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pi-nex-002" }, requiresApproval: true },
    { id: "ns-c20", type: "pattern", title: "PI-NEX-003: Princípio Operacional", description: "A NEX existe para devolver tempo de construção para a NEW, transformando receita recorrente em capacidade contínua de desenvolvimento da holding.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pi-nex-003" }, requiresApproval: true },

    { id: "ns-c21", type: "pattern", title: "PATTERN-NEX-004", description: "Empresas da holding devem evoluir por metodologias antes da expansão operacional.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-nex-004" }, requiresApproval: true },
    { id: "ns-c22", type: "pattern", title: "PATTERN-NEX-005", description: "Processos padronizados permitem soluções altamente personalizadas.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-nex-005" }, requiresApproval: true },
    { id: "ns-c23", type: "pattern", title: "PATTERN-NEX-006", description: "A validação deve ocorrer em projetos reais antes da escalabilidade comercial.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-nex-006" }, requiresApproval: true },
    { id: "ns-c24", type: "pattern", title: "PATTERN-NEX-007", description: "A operação comercial deve financiar a evolução contínua dos produtos da holding.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-nex-007" }, requiresApproval: true },

    { id: "ns-c25", type: "cross_project_impact", title: "Impacto Institucional", description: "Impacto no projeto NEW Holding", classification: "informational", target: { entityType: "project", entityId: "proj_new_holding" }, requiresApproval: false },
    { id: "ns-c26", type: "cross_project_impact", title: "Impacto Institucional", description: "Impacto no projeto FLOW", classification: "informational", target: { entityType: "project", entityId: "proj_flow" }, requiresApproval: false },
    { id: "ns-c27", type: "cross_project_impact", title: "Impacto Institucional", description: "Impacto no projeto ERP", classification: "informational", target: { entityType: "project", entityId: "proj_erp" }, requiresApproval: false },
    { id: "ns-c28", type: "cross_project_impact", title: "Impacto Institucional", description: "Impacto no projeto CRM", classification: "informational", target: { entityType: "project", entityId: "proj_crm" }, requiresApproval: false },
    { id: "ns-c29", type: "cross_project_impact", title: "Impacto Institucional", description: "Impacto no projeto NEW OS", classification: "informational", target: { entityType: "project", entityId: "proj_new_os" }, requiresApproval: false },
    { id: "ns-c30", type: "cross_project_impact", title: "Impacto Institucional", description: "Impacto em Branding, Comercial e Marketing", classification: "informational", target: { entityType: "project", entityId: "proj_branding_mkt" }, requiresApproval: false },

    { id: "ns-c31", type: "progress", title: "Knowledge Candidate: Arquitetura de Crescimento", description: "Candidato para futura documentação institucional.", classification: "planned", requiresApproval: false },
    { id: "ns-c32", type: "progress", title: "Knowledge Candidate: Interface Mercado–Holding", description: "Candidato para futura documentação institucional.", classification: "planned", requiresApproval: false },
    { id: "ns-c33", type: "progress", title: "Knowledge Candidate: Processo Padronizado", description: "Candidato para futura documentação institucional.", classification: "planned", requiresApproval: false },
    { id: "ns-c34", type: "progress", title: "Knowledge Candidate: Soluções Personalizadas", description: "Candidato para futura documentação institucional.", classification: "planned", requiresApproval: false },
    { id: "ns-c35", type: "progress", title: "Knowledge Candidate: Fase de Fundação", description: "Candidato para futura documentação institucional.", classification: "planned", requiresApproval: false },
    { id: "ns-c36", type: "progress", title: "Knowledge Candidate: Fase de Expansão", description: "Candidato para futura documentação institucional.", classification: "planned", requiresApproval: false },
    { id: "ns-c37", type: "progress", title: "Knowledge Candidate: Metodologia Comercial", description: "Candidato para futura documentação institucional.", classification: "planned", requiresApproval: false },
    { id: "ns-c38", type: "progress", title: "Knowledge Candidate: Operação Comercial Enxuta", description: "Candidato para futura documentação institucional.", classification: "planned", requiresApproval: false },
  ]
};

export const mockFlowMvpIngestion: OperationalIngestion = {
  id: "ing-flow-mvp-001",
  kind: "operational",
  projectId: "proj_flow",
  title: "Conclusão da Jornada Operacional e Preparação para o Piloto",
  referenceDate: "2026-07-25",
  sourceType: "conversation",
  sourceContent: `## Resumo Operacional: FLOW (2026-07-25)

**Fase Oficial:** Preparação para Piloto

**Status Institucional:**
Nesta sessão foi concluída a implementação da Jornada Operacional do FLOW para o MVP.
O backend foi finalizado, documentado e congelado para o MVP.
O frontend foi integrado ao contrato definitivo da API, eliminando dependências do mock (mantido apenas por variável de ambiente).
A partir desta ingestão, o foco do projeto deixa de ser construção estrutural e passa oficialmente para estabilização, acabamentos e validação em ambiente real.

**Decisões Arquiteturais:**
- DEC-FLOW-016: A Jornada Operacional é considerada concluída para o MVP. Novas funcionalidades ficam bloqueadas até o término do piloto.
- DEC-FLOW-017: Frontend e Backend passam a utilizar o contrato definitivo da API. O modo mock permanece apenas como ferramenta de desenvolvimento.
- DEC-FLOW-018: O projeto entra oficialmente na fase Preparação para Piloto. A prioridade passa a ser estabilidade, testes, UX e validação operacional.

**Pendências:**
- Executar validação PostgreSQL via Docker/Testcontainers.
- Executar revisão visual automatizada.
- Conectar interface visual de Entrada e Retirada de Caixa.

**Lição Institucional:**
A conclusão de um módulo deve ser seguida por seu congelamento para o MVP, permitindo que a validação de mercado ocorra antes da expansão de escopo.
`,
  actor: mockHumanActor,
  status: "approved",
  createdAt: "2026-07-25T01:00:00Z",
  updatedAt: "2026-07-25T01:00:00Z",
  createdBy: mockHumanActor,
  relatedEntities: [],
  changes: [
    { id: "fmvp-c1", type: "decision", title: "DEC-FLOW-016: MVP Congelado", description: "A Jornada Operacional é considerada concluída para o MVP. Novas funcionalidades bloqueadas até término do piloto.", classification: "completed", target: { entityType: "decision", entityId: "dec-flow-016" }, requiresApproval: false },
    { id: "fmvp-c2", type: "decision", title: "DEC-FLOW-017: API Definitiva", description: "Frontend e Backend passam a utilizar contrato definitivo da API. Mock é apenas ferramenta de dev.", classification: "completed", target: { entityType: "decision", entityId: "dec-flow-017" }, requiresApproval: false },
    { id: "fmvp-c3", type: "decision", title: "DEC-FLOW-018: Preparação para Piloto", description: "Projeto entra em Preparação para Piloto. Foco em estabilidade, testes, UX e validação operacional.", classification: "completed", target: { entityType: "decision", entityId: "dec-flow-018" }, requiresApproval: false },

    { id: "fmvp-c4", type: "progress", title: "Backend da Jornada Operacional concluído", description: "Marco evolutivo", classification: "completed", requiresApproval: false },
    { id: "fmvp-c5", type: "progress", title: "Frontend integrado ao backend", description: "Marco evolutivo", classification: "completed", requiresApproval: false },
    { id: "fmvp-c6", type: "progress", title: "Contrato definitivo estabelecido", description: "Marco evolutivo", classification: "completed", requiresApproval: false },
    { id: "fmvp-c7", type: "progress", title: "Estados operacionais implementados", description: "Marco evolutivo", classification: "completed", requiresApproval: false },
    { id: "fmvp-c8", type: "progress", title: "Auditoria operacional concluída", description: "Marco evolutivo", classification: "completed", requiresApproval: false },
    { id: "fmvp-c9", type: "progress", title: "Imutabilidade após encerramento validada", description: "Marco evolutivo", classification: "completed", requiresApproval: false },
    { id: "fmvp-c10", type: "progress", title: "Sistema preparado para piloto", description: "Marco evolutivo", classification: "completed", requiresApproval: false },

    { id: "fmvp-c11", type: "roadmap", title: "Jornada Operacional", description: "Concluído", classification: "completed", requiresApproval: false },
    { id: "fmvp-c12", type: "roadmap", title: "Backend Principal", description: "Concluído", classification: "completed", requiresApproval: false },
    { id: "fmvp-c13", type: "roadmap", title: "Integração Frontend", description: "Concluído", classification: "completed", requiresApproval: false },

    { id: "fmvp-c14", type: "roadmap", title: "Página do Profissional", description: "Novo foco", classification: "planned", requiresApproval: false },
    { id: "fmvp-c15", type: "roadmap", title: "SEO", description: "Novo foco", classification: "planned", requiresApproval: false },
    { id: "fmvp-c16", type: "roadmap", title: "Suporte básico", description: "Novo foco", classification: "planned", requiresApproval: false },
    { id: "fmvp-c17", type: "roadmap", title: "Testes PostgreSQL finais", description: "Novo foco", classification: "planned", requiresApproval: false },
    { id: "fmvp-c18", type: "roadmap", title: "Revisão visual", description: "Novo foco", classification: "planned", requiresApproval: false },
    { id: "fmvp-c19", type: "roadmap", title: "Deploy piloto", description: "Novo foco", classification: "planned", requiresApproval: false },
    { id: "fmvp-c20", type: "roadmap", title: "Validação nas primeiras barbearias", description: "Novo foco", classification: "planned", requiresApproval: false },

    { id: "fmvp-c21", type: "pattern", title: "PATTERN-FLOW-011", description: "Congelar módulos concluídos antes do piloto.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-flow-011" }, requiresApproval: true },
    { id: "fmvp-c22", type: "pattern", title: "PATTERN-FLOW-012", description: "Integração Frontend/Backend deve ocorrer apenas após estabilização do contrato da API.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-flow-012" }, requiresApproval: true },
    { id: "fmvp-c23", type: "pattern", title: "PATTERN-FLOW-013", description: "Backlog pós-MVP deve permanecer explicitamente separado das funcionalidades do piloto.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-flow-013" }, requiresApproval: true },

    { id: "fmvp-c24", type: "cross_project_impact", title: "Impacto: NEW OS", description: "Relacionamento institucional", classification: "informational", target: { entityType: "project", entityId: "proj_new_os" }, requiresApproval: false },
    { id: "fmvp-c25", type: "cross_project_impact", title: "Impacto: NEX", description: "Relacionamento institucional", classification: "informational", target: { entityType: "project", entityId: "proj_nex" }, requiresApproval: false },
    { id: "fmvp-c26", type: "cross_project_impact", title: "Impacto: CRM", description: "Relacionamento institucional", classification: "informational", target: { entityType: "project", entityId: "proj_crm" }, requiresApproval: false },
    { id: "fmvp-c27", type: "cross_project_impact", title: "Impacto: Arquitetura Institucional", description: "Relacionamento institucional", classification: "informational", target: { entityType: "project", entityId: "proj_architecture" }, requiresApproval: false },

    { id: "fmvp-c28", type: "progress", title: "Knowledge Candidate: MVP Congelado", description: "Candidato a documentação.", classification: "planned", requiresApproval: false },
    { id: "fmvp-c29", type: "progress", title: "Knowledge Candidate: Preparação para Piloto", description: "Candidato a documentação.", classification: "planned", requiresApproval: false },
    { id: "fmvp-c30", type: "progress", title: "Knowledge Candidate: Contrato Definitivo da API", description: "Candidato a documentação.", classification: "planned", requiresApproval: false },
    { id: "fmvp-c31", type: "progress", title: "Knowledge Candidate: Estratégia de Estabilização", description: "Candidato a documentação.", classification: "planned", requiresApproval: false },
    { id: "fmvp-c32", type: "progress", title: "Knowledge Candidate: Integração Full Stack", description: "Candidato a documentação.", classification: "planned", requiresApproval: false },
    { id: "fmvp-c33", type: "progress", title: "Knowledge Candidate: Backlog Pós-MVP", description: "Candidato a documentação.", classification: "planned", requiresApproval: false },
  ]
};

export const mockNexLanguageIngestion: OperationalIngestion = {
  id: "ing-nex-language-001",
  kind: "operational",
  projectId: "proj_nex",
  title: "Evolução da Metodologia de Design e Consolidação da NEX Design Language",
  referenceDate: "2026-07-25",
  sourceType: "conversation",
  sourceContent: `## Resumo Operacional: Evolução Institucional NEX (2026-07-25)

**Fase Oficial:** Consolidação da Linguagem de Produto

**Status Institucional:**
Durante o desenvolvimento da nova identidade da NEX foi identificado que a documentação estratégica produzida até então não era suficiente para gerar uma implementação visual consistente. A principal descoberta foi que existia uma lacuna entre estratégia e execução. Como consequência, a metodologia institucional da NEW foi ampliada, incorporando novas camadas responsáveis por transformar conhecimento em direção criativa e experiência visual. A NEX deixa de ser tratada como um site institucional e passa a ser compreendida como uma linguagem de produto reutilizável em todo o ecossistema NEW.

**Decisões:**
- DEC-NEX-010: A implementação visual deve ser precedida por Direção Criativa e Direção de Arte.
- DEC-NEX-011: A NEX Design Language torna-se a referência visual para produtos do ecossistema NEW.
- DEC-NEX-012: O objetivo do projeto deixa de ser construir um site e passa a ser construir uma linguagem visual reutilizável.
- DEC-NEX-013: A arquitetura técnica deve sustentar a experiência, nunca substituí-la.

**Lição Institucional:**
Existe uma diferença entre documentar uma estratégia e transformá-la em uma experiência. A metodologia oficial da NEW passa a incluir etapas de Direção Criativa, Direção de Arte e Storyboard para garantir que o conhecimento institucional seja convertido em interfaces consistentes.
`,
  actor: mockHumanActor,
  status: "approved",
  createdAt: "2026-07-25T01:50:00Z",
  updatedAt: "2026-07-25T01:50:00Z",
  createdBy: mockHumanActor,
  relatedEntities: [],
  changes: [
    { id: "nl-c1", type: "decision", title: "DEC-NEX-010: Direção Criativa e de Arte", description: "A implementação visual deve ser precedida por Direção Criativa e Direção de Arte.", classification: "completed", target: { entityType: "decision", entityId: "dec-nex-010" }, requiresApproval: false },
    { id: "nl-c2", type: "decision", title: "DEC-NEX-011: Referência Visual", description: "A NEX Design Language torna-se a referência visual para produtos do ecossistema NEW.", classification: "completed", target: { entityType: "decision", entityId: "dec-nex-011" }, requiresApproval: false },
    { id: "nl-c3", type: "decision", title: "DEC-NEX-012: Linguagem de Produto", description: "O objetivo deixa de ser construir um site e passa a ser construir uma linguagem visual reutilizável.", classification: "completed", target: { entityType: "decision", entityId: "dec-nex-012" }, requiresApproval: false },
    { id: "nl-c4", type: "decision", title: "DEC-NEX-013: Arquitetura e Experiência", description: "A arquitetura técnica deve sustentar a experiência, nunca substituí-la.", classification: "completed", target: { entityType: "decision", entityId: "dec-nex-013" }, requiresApproval: false },

    { id: "nl-c5", type: "progress", title: "Identificação da falha de transferência", description: "Marco evolutivo.", classification: "completed", requiresApproval: false },
    { id: "nl-c6", type: "progress", title: "Evolução oficial da metodologia institucional", description: "Marco evolutivo.", classification: "completed", requiresApproval: false },
    { id: "nl-c7", type: "progress", title: "Storyboard completo da Home", description: "Marco evolutivo.", classification: "completed", requiresApproval: false },
    { id: "nl-c8", type: "progress", title: "Manifesto da Experiência", description: "Marco evolutivo.", classification: "completed", requiresApproval: false },
    { id: "nl-c9", type: "progress", title: "Consolidação da NEX Design Language", description: "Marco evolutivo.", classification: "completed", requiresApproval: false },
    { id: "nl-c10", type: "progress", title: "Definição da narrativa da Home", description: "Marco evolutivo.", classification: "completed", requiresApproval: false },
    { id: "nl-c11", type: "progress", title: "Concepção inicial da Business System Engine", description: "Marco evolutivo.", classification: "completed", requiresApproval: false },

    { id: "nl-c12", type: "pattern", title: "PATTERN-NEX-008", description: "Toda implementação visual deve nascer de uma cadeia completa de contexto.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-nex-008" }, requiresApproval: true },
    { id: "nl-c13", type: "pattern", title: "PATTERN-NEX-009", description: "Experiência precede interface.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-nex-009" }, requiresApproval: true },
    { id: "nl-c14", type: "pattern", title: "PATTERN-NEX-010", description: "Arquitetura deve servir à narrativa visual.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-nex-010" }, requiresApproval: true },

    { id: "nl-c15", type: "pattern", title: "PI-NEX-005", description: "A estratégia só gera valor quando consegue ser percebida pelo usuário através da experiência.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pi-nex-005" }, requiresApproval: true },
    { id: "nl-c16", type: "pattern", title: "PI-NEX-006", description: "Toda linguagem visual da NEW deve nascer da sequência: Pesquisa -> Posicionamento -> DNA -> Brandbook -> Direção Criativa -> Direção de Arte -> Storyboard -> Manifesto da Experiência -> Implementação.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pi-nex-006" }, requiresApproval: true },

    { id: "nl-c17", type: "roadmap", title: "DNA da NEX", description: "Concluído", classification: "completed", requiresApproval: false },
    { id: "nl-c18", type: "roadmap", title: "Posicionamento", description: "Concluído", classification: "completed", requiresApproval: false },
    { id: "nl-c19", type: "roadmap", title: "Storyboard", description: "Concluído", classification: "completed", requiresApproval: false },
    { id: "nl-c20", type: "roadmap", title: "Manifesto da Experiência", description: "Concluído", classification: "completed", requiresApproval: false },
    { id: "nl-c21", type: "roadmap", title: "Linguagem de Produto", description: "Concluído", classification: "completed", requiresApproval: false },
    { id: "nl-c22", type: "roadmap", title: "Explorar composições do Hero", description: "Próxima fase", classification: "planned", requiresApproval: false },
    { id: "nl-c23", type: "roadmap", title: "Validar a identidade visual", description: "Próxima fase", classification: "planned", requiresApproval: false },
    { id: "nl-c24", type: "roadmap", title: "Consolidar a NEX Design Language", description: "Próxima fase", classification: "planned", requiresApproval: false },
    { id: "nl-c25", type: "roadmap", title: "Integrar a identidade à Business System Engine", description: "Próxima fase", classification: "planned", requiresApproval: false },
    { id: "nl-c26", type: "roadmap", title: "Refinar animações e narrativa", description: "Próxima fase", classification: "planned", requiresApproval: false },

    { id: "nl-c27", type: "cross_project_impact", title: "Impacto: NEW", description: "Relacionamento institucional", classification: "informational", target: { entityType: "project", entityId: "proj_new" }, requiresApproval: false },
    { id: "nl-c28", type: "cross_project_impact", title: "Impacto: FLOW", description: "Relacionamento institucional", classification: "informational", target: { entityType: "project", entityId: "proj_flow" }, requiresApproval: false },
    { id: "nl-c29", type: "cross_project_impact", title: "Impacto: CRM", description: "Relacionamento institucional", classification: "informational", target: { entityType: "project", entityId: "proj_crm" }, requiresApproval: false },
    { id: "nl-c30", type: "cross_project_impact", title: "Impacto: ERP", description: "Relacionamento institucional", classification: "informational", target: { entityType: "project", entityId: "proj_erp" }, requiresApproval: false },
    { id: "nl-c31", type: "cross_project_impact", title: "Impacto: Dashboards", description: "Relacionamento institucional", classification: "informational", target: { entityType: "project", entityId: "proj_dashboards" }, requiresApproval: false },
    { id: "nl-c32", type: "cross_project_impact", title: "Impacto: RP", description: "Relacionamento institucional", classification: "informational", target: { entityType: "project", entityId: "proj_rp" }, requiresApproval: false },
    { id: "nl-c33", type: "cross_project_impact", title: "Impacto: NEW OS", description: "Relacionamento institucional", classification: "informational", target: { entityType: "project", entityId: "proj_new_os" }, requiresApproval: false },

    { id: "nl-c34", type: "progress", title: "Knowledge Candidate: NEX Design Language", description: "Candidato a documentação.", classification: "planned", requiresApproval: false },
    { id: "nl-c35", type: "progress", title: "Knowledge Candidate: Manifesto da Experiência", description: "Candidato a documentação.", classification: "planned", requiresApproval: false },
    { id: "nl-c36", type: "progress", title: "Knowledge Candidate: Storyboard Institucional", description: "Candidato a documentação.", classification: "planned", requiresApproval: false },
    { id: "nl-c37", type: "progress", title: "Knowledge Candidate: Direção Criativa e Arte", description: "Candidato a documentação.", classification: "planned", requiresApproval: false },
    { id: "nl-c38", type: "progress", title: "Knowledge Candidate: Business System Engine", description: "Candidato a documentação.", classification: "planned", requiresApproval: false },
  ]
};

export const mockErpStrategyIngestion: OperationalIngestion = {
  id: "ing-erp-strategy-001",
  kind: "operational",
  projectId: "proj_erp",
  title: "Definição da Estratégia Comercial e Posicionamento do ERP",
  referenceDate: "2026-07-25",
  sourceType: "conversation",
  sourceContent: `## Resumo Operacional: Estratégia ERP (2026-07-25)

**Fase Oficial:** Fase de Prontidão Comercial e Validação Operacional

**Status Institucional:**
Após auditoria, foi decidido que o ERP deixa de ser tratado como projeto de desenvolvimento e passa a ser tratado como produto em comercialização. A base técnica possui maturidade para entrada no mercado. O gargalo não é programação, mas posicionamento e validação.
A nova ordem evolutiva passa a ser: Estratégia Comercial -> Clientes Piloto -> Refinamento -> Escala.

**Descobertas Fundamentais:**
- NEX: Não vende software. A NEX transforma tecnologia em produto (posiciona, empacota, comunica, valida e implanta). Esteira reutilizável.
- DNA NEW: A NEW existe para eliminar a complexidade desnecessária da operação. "Empresas já são complexas. O software não precisa ser."
- ERP (Diferencial): Representa uma nova experiência de operação focada em redução de atrito e de carga cognitiva. Não orientado a formulários, mas a tarefas.

**Estratégia Comercial & Demonstração:**
O processo começa pela dor do cliente, demonstra compreensão, soluciona, e depois apresenta a filosofia. "A sua dor é essa. A NEW pensou nisso." A demonstração comercial deve contar a história operacional e não navegar em telas desconexas.

**Marketplace Futuro:**
Visão estratégica de transformar o ERP em uma rede B2B operacional (Restaurantes -> Ceasa -> Fornecedores).
`,
  actor: mockHumanActor,
  status: "approved",
  createdAt: "2026-07-25T14:44:00Z",
  updatedAt: "2026-07-25T14:44:00Z",
  createdBy: mockHumanActor,
  relatedEntities: [],
  changes: [
    { id: "erp-c1", type: "decision", title: "Fase de Prontidão Comercial", description: "A próxima fase oficial do ERP é a Fase de Prontidão Comercial e Validação Operacional.", classification: "completed", requiresApproval: false },
    { id: "erp-c2", type: "decision", title: "Ordem Evolutiva Oficial", description: "Ordem corrigida para: Estratégia Comercial -> Clientes Piloto -> Refinamento -> Escala.", classification: "completed", requiresApproval: false },
    { id: "erp-c3", type: "decision", title: "Papel Oficial da NEX", description: "A NEX não vende software; transforma tecnologia em produto. Esteira reutilizável para toda a holding.", classification: "completed", requiresApproval: false },
    { id: "erp-c4", type: "decision", title: "Estratégia de Crescimento", description: "Conquistar clientes estratégicos com alta aderência, priorizando qualidade em vez de volume.", classification: "completed", requiresApproval: false },
    
    { id: "erp-c5", type: "pattern", title: "DNA Institucional", description: "A NEW existe para eliminar a complexidade desnecessária da operação das empresas. (Empresas já são complexas. O software não precisa ser.)", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-new-001" }, requiresApproval: true },
    { id: "erp-c6", type: "pattern", title: "Diferencial do ERP", description: "O ERP não tenta apenas adicionar módulos; tenta eliminar atritos da operação (redução de carga cognitiva).", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-erp-001" }, requiresApproval: true },
    { id: "erp-c7", type: "pattern", title: "Estratégia Comercial", description: "1. Compreender a dor. 2. Demonstrar compreensão. 3. Mostrar solução. 4. Filosofia NEW. (A sua dor é essa. A NEW pensou nisso.)", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-nex-011" }, requiresApproval: true },
    { id: "erp-c8", type: "pattern", title: "Demonstração por Narrativa", description: "Demonstrações comerciais devem contar uma história operacional completa, sem navegação puramente técnica por módulos.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-nex-012" }, requiresApproval: true },

    { id: "erp-c9", type: "progress", title: "Auditoria Técnica do ERP", description: "Concluída. Sistema validado para entrada no mercado.", classification: "completed", requiresApproval: false },
    { id: "erp-c10", type: "progress", title: "Definição do DNA da NEW", description: "Concluída.", classification: "completed", requiresApproval: false },

    { id: "erp-c11", type: "roadmap", title: "Pesquisa de Mercado", description: "Concorrentes, diferenciais e oportunidades.", classification: "planned", requiresApproval: false },
    { id: "erp-c12", type: "roadmap", title: "Estratégia Comercial (ERP)", description: "ICP, roteiro, demonstração, implantação.", classification: "planned", requiresApproval: false },
    { id: "erp-c13", type: "roadmap", title: "Estratégia de Marca (ERP)", description: "Identidade, narrativa, landing page.", classification: "planned", requiresApproval: false },
    { id: "erp-c14", type: "roadmap", title: "Estratégia Digital (ERP)", description: "Conteúdo, bastidores e casos reais.", classification: "planned", requiresApproval: false },
    { id: "erp-c15", type: "roadmap", title: "Estratégia Financeira (ERP)", description: "Precificação e recorrência.", classification: "planned", requiresApproval: false },
    
    { id: "erp-c16", type: "roadmap", title: "Visão Marketplace B2B", description: "Rede B2B operacional (visão de longo prazo).", classification: "planned", requiresApproval: false },

    { id: "erp-c17", type: "cross_project_impact", title: "Impacto: NEX", description: "Redefinição do papel central da empresa.", classification: "informational", target: { entityType: "project", entityId: "proj_nex" }, requiresApproval: false },
    { id: "erp-c18", type: "cross_project_impact", title: "Impacto: NEW", description: "Consolidação do DNA da holding.", classification: "informational", target: { entityType: "project", entityId: "proj_new" }, requiresApproval: false },
    { id: "erp-c19", type: "cross_project_impact", title: "Impacto: CRM", description: "Compartilha a mesma esteira de produto.", classification: "informational", target: { entityType: "project", entityId: "proj_crm" }, requiresApproval: false },
    { id: "erp-c20", type: "cross_project_impact", title: "Impacto: FLOW", description: "Compartilha o DNA de redução de atrito e esteira comercial.", classification: "informational", target: { entityType: "project", entityId: "proj_flow" }, requiresApproval: false },

    { id: "erp-c21", type: "progress", title: "Knowledge Candidate: DNA Institucional", description: "Candidato a documentação.", classification: "planned", requiresApproval: false },
    { id: "erp-c22", type: "progress", title: "Knowledge Candidate: Estratégia Comercial NEX", description: "Candidato a documentação.", classification: "planned", requiresApproval: false },
    { id: "erp-c23", type: "progress", title: "Knowledge Candidate: ERP Diferencial", description: "Candidato a documentação.", classification: "planned", requiresApproval: false },
  ]
};

export const mockNexCoreIngestion: OperationalIngestion = {
  id: "ing-nex-core-001",
  kind: "operational",
  projectId: "proj_nex",
  title: "Consolidação do NEX Core e da Estratégia Comercial da NEX",
  referenceDate: "2026-07-26",
  sourceType: "conversation",
  sourceContent: `## Resumo Operacional: Consolidação NEX Core (2026-07-26)

**Fase Oficial:** Estruturação do Produto e Modelo Comercial

**Status Institucional:**
Durante esta sessão foi consolidado o posicionamento definitivo da NEX. A empresa deixa oficialmente de ser tratada como uma agência ou software house e passa a representar a plataforma de implantação e evolução da infraestrutura digital das empresas. Foi definido o conceito do NEX Core como núcleo operacional da plataforma, além da arquitetura comercial, jornada do cliente, planos de entrada e estrutura de acompanhamento contínuo. A NEX passa a comercializar evolução, e não serviços isolados.

**Decisões:**
- DEC-NEX-014: A NEX passa a ser posicionada como uma plataforma de infraestrutura digital empresarial.
- DEC-NEX-015: O conceito central da experiência deixa de ser Dashboard e passa a ser Jornada.
- DEC-NEX-016: O NEX Core torna-se o núcleo operacional da plataforma.
- DEC-NEX-017: Toda venda deverá partir da evolução da empresa e não da venda de serviços individuais.

**Lição Institucional:**
Produtos tecnológicos não devem ser comercializados como funcionalidades. Eles devem representar uma evolução perceptível para o cliente. A experiência passa a ser organizada em torno de uma jornada contínua de crescimento, onde tecnologia, acompanhamento e estratégia fazem parte do mesmo produto.

**Resultado Final:**
A NEX passa oficialmente a ser reconhecida como o primeiro produto comercial do ecossistema NEW. Sua missão é implantar, acompanhar e evoluir a infraestrutura digital das empresas através de uma plataforma única, conectando Portal, NEX Core, Dashboard do Cliente, Dashboard da Equipe e Administração em uma única experiência integrada.
`,
  actor: mockHumanActor,
  status: "approved",
  createdAt: "2026-07-26T02:49:00Z",
  updatedAt: "2026-07-26T02:49:00Z",
  createdBy: mockHumanActor,
  relatedEntities: [],
  changes: [
    { id: "nc-c1", type: "decision", title: "DEC-NEX-014: Plataforma de Infraestrutura", description: "A NEX passa a ser posicionada como uma plataforma de infraestrutura digital empresarial.", classification: "completed", target: { entityType: "decision", entityId: "dec-nex-014" }, requiresApproval: false },
    { id: "nc-c2", type: "decision", title: "DEC-NEX-015: Jornada vs Dashboard", description: "O conceito central da experiência deixa de ser Dashboard e passa a ser Jornada.", classification: "completed", target: { entityType: "decision", entityId: "dec-nex-015" }, requiresApproval: false },
    { id: "nc-c3", type: "decision", title: "DEC-NEX-016: NEX Core", description: "O NEX Core torna-se o núcleo operacional da plataforma.", classification: "completed", target: { entityType: "decision", entityId: "dec-nex-016" }, requiresApproval: false },
    { id: "nc-c4", type: "decision", title: "DEC-NEX-017: Evolução vs Serviços", description: "Toda venda deverá partir da evolução da empresa e não da venda de serviços individuais.", classification: "completed", target: { entityType: "decision", entityId: "dec-nex-017" }, requiresApproval: false },

    { id: "nc-c5", type: "progress", title: "Definição do conceito NEX Core", description: "Marco evolutivo.", classification: "completed", requiresApproval: false },
    { id: "nc-c6", type: "progress", title: "Consolidação da arquitetura da plataforma", description: "Marco evolutivo.", classification: "completed", requiresApproval: false },
    { id: "nc-c7", type: "progress", title: "Definição dos três planos comerciais", description: "Marco evolutivo.", classification: "completed", requiresApproval: false },
    { id: "nc-c8", type: "progress", title: "Estruturação da jornada do cliente", description: "Marco evolutivo.", classification: "completed", requiresApproval: false },
    { id: "nc-c9", type: "progress", title: "Definição da arquitetura", description: "Portal -> NEX Core -> Dashboards.", classification: "completed", requiresApproval: false },
    { id: "nc-c10", type: "progress", title: "Consolidação da proposta de valor", description: "Marco evolutivo.", classification: "completed", requiresApproval: false },

    { id: "nc-c11", type: "pattern", title: "PATTERN-NEX-011", description: "A venda acontece através da infraestrutura, nunca através de serviços isolados.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-nex-011" }, requiresApproval: true },
    { id: "nc-c12", type: "pattern", title: "PATTERN-NEX-012", description: "Toda experiência do cliente deve representar uma jornada contínua de evolução.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-nex-012" }, requiresApproval: true },
    { id: "nc-c13", type: "pattern", title: "PATTERN-NEX-013", description: "O Dashboard existe para demonstrar evolução e não apenas indicadores.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-nex-013" }, requiresApproval: true },

    { id: "nc-c14", type: "pattern", title: "PI-NEX-007", description: "A NEX não vende tecnologia. A NEX implanta, acompanha e evolui a infraestrutura digital das empresas.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pi-nex-007" }, requiresApproval: true },
    { id: "nc-c15", type: "pattern", title: "PI-NEX-008", description: "O cliente deve perceber continuamente sua evolução através da plataforma, transformando acompanhamento em valor percebido.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pi-nex-008" }, requiresApproval: true },

    { id: "nc-c16", type: "roadmap", title: "Posicionamento da NEX", description: "Concluído", classification: "completed", requiresApproval: false },
    { id: "nc-c17", type: "roadmap", title: "Modelo Comercial", description: "Concluído", classification: "completed", requiresApproval: false },
    { id: "nc-c18", type: "roadmap", title: "Estrutura dos Planos", description: "Concluído", classification: "completed", requiresApproval: false },
    { id: "nc-c19", type: "roadmap", title: "Conceito NEX Core", description: "Concluído", classification: "completed", requiresApproval: false },
    { id: "nc-c20", type: "roadmap", title: "Jornada do Cliente", description: "Concluído", classification: "completed", requiresApproval: false },
    { id: "nc-c21", type: "roadmap", title: "Arquitetura da Plataforma", description: "Concluído", classification: "completed", requiresApproval: false },
    
    { id: "nc-c22", type: "roadmap", title: "Finalizar o Design System", description: "Próxima fase", classification: "planned", requiresApproval: false },
    { id: "nc-c23", type: "roadmap", title: "Estruturar os componentes", description: "Próxima fase", classification: "planned", requiresApproval: false },
    { id: "nc-c24", type: "roadmap", title: "Desenvolver o NEX Core", description: "Próxima fase", classification: "planned", requiresApproval: false },
    { id: "nc-c25", type: "roadmap", title: "Construir os Dashboards", description: "Próxima fase", classification: "planned", requiresApproval: false },
    { id: "nc-c26", type: "roadmap", title: "Validar a experiência completa da Jornada", description: "Próxima fase", classification: "planned", requiresApproval: false },

    { id: "nc-c27", type: "cross_project_impact", title: "Impacto: NEW", description: "Relacionamento institucional", classification: "informational", target: { entityType: "project", entityId: "proj_new" }, requiresApproval: false },
    { id: "nc-c28", type: "cross_project_impact", title: "Impacto: FLOW", description: "Relacionamento institucional", classification: "informational", target: { entityType: "project", entityId: "proj_flow" }, requiresApproval: false },
    { id: "nc-c29", type: "cross_project_impact", title: "Impacto: ERP", description: "Relacionamento institucional", classification: "informational", target: { entityType: "project", entityId: "proj_erp" }, requiresApproval: false },
    { id: "nc-c30", type: "cross_project_impact", title: "Impacto: CRM", description: "Relacionamento institucional", classification: "informational", target: { entityType: "project", entityId: "proj_crm" }, requiresApproval: false },
    { id: "nc-c31", type: "cross_project_impact", title: "Impacto: NEW OS", description: "Relacionamento institucional", classification: "informational", target: { entityType: "project", entityId: "proj_new_os" }, requiresApproval: false },

    { id: "nc-c32", type: "progress", title: "Knowledge Candidate: NEX Core", description: "Candidato a documentação.", classification: "planned", requiresApproval: false },
    { id: "nc-c33", type: "progress", title: "Knowledge Candidate: Jornada de Evolução", description: "Candidato a documentação.", classification: "planned", requiresApproval: false },
    { id: "nc-c34", type: "progress", title: "Knowledge Candidate: Plataforma de Infraestrutura Digital", description: "Candidato a documentação.", classification: "planned", requiresApproval: false },
    { id: "nc-c35", type: "progress", title: "Knowledge Candidate: Modelo Comercial NEX", description: "Candidato a documentação.", classification: "planned", requiresApproval: false },
    { id: "nc-c36", type: "progress", title: "Knowledge Candidate: Arquitetura da Plataforma", description: "Candidato a documentação.", classification: "planned", requiresApproval: false },
    { id: "nc-c37", type: "progress", title: "Knowledge Candidate: Score Digital", description: "Candidato a documentação.", classification: "planned", requiresApproval: false },
    { id: "nc-c38", type: "progress", title: "Knowledge Candidate: Roadmap Evolutivo", description: "Candidato a documentação.", classification: "planned", requiresApproval: false },
  ]
};

export const mockFlowValidationIngestion: OperationalIngestion = {
  id: "ing-flow-val-001",
  kind: "operational",
  projectId: "proj_flow",
  title: "Validação Operacional Completa e Consolidação da Infraestrutura do Flow",
  referenceDate: "2026-07-26",
  sourceType: "conversation",
  sourceContent: `## Resumo Operacional: Validação Operacional Flow (2026-07-26)

**Fase Oficial:** Validação Operacional e Preparação para Piloto

**Status Institucional:**
Durante esta sessão o Flow deixou de concentrar esforços apenas na implementação de funcionalidades e passou a validar seu comportamento em cenários reais de operação. Foram realizadas validações contra PostgreSQL utilizando Testcontainers, correções críticas de concorrência, auditoria completa das migrations, integração da Central Operacional com dados persistidos e simulações completas de uso.
O foco do projeto passa oficialmente a ser estabilidade operacional, confiabilidade e preparação para implantação controlada.

**Decisões Institucionais:**
- DEC-FLOW-019: Todo fluxo operacional crítico deve ser validado em ambiente real antes da homologação para produção.
- DEC-FLOW-020: A operação deve impedir múltiplos atendimentos ativos para um mesmo profissional independentemente de conflitos de horário.
- DEC-FLOW-021: A Central Operacional torna-se a fonte oficial do estado operacional dos profissionais.
- DEC-FLOW-022: Walk-in deixa de iniciar atendimentos diretamente e passa a utilizar exatamente o mesmo fluxo operacional dos agendamentos convencionais.

**Lição Institucional:**
O desenvolvimento do Flow entra em uma nova etapa. A prioridade deixa de ser adicionar funcionalidades e passa a ser validar comportamento real, concorrência, persistência de dados e aderência ao ambiente de produção. A maturidade de um produto não é definida pela quantidade de funcionalidades implementadas, mas pela confiança de que elas funcionam corretamente em condições reais de operação.

**Resultado Final:**
O Flow passa oficialmente para uma fase de validação operacional avançada. Com a correção dos problemas de concorrência, auditoria estrutural do banco, integração da Central Operacional e validação contra PostgreSQL real, o sistema alcança um novo nível de maturidade, aproximando-se da implantação controlada junto às primeiras barbearias.
`,
  actor: mockHumanActor,
  status: "approved",
  createdAt: "2026-07-26T02:54:00Z",
  updatedAt: "2026-07-26T02:54:00Z",
  createdBy: mockHumanActor,
  relatedEntities: [],
  changes: [
    { id: "fval-c1", type: "decision", title: "DEC-FLOW-019: Validação Real", description: "Todo fluxo operacional crítico deve ser validado em ambiente real antes da homologação para produção.", classification: "completed", target: { entityType: "decision", entityId: "dec-flow-019" }, requiresApproval: false },
    { id: "fval-c2", type: "decision", title: "DEC-FLOW-020: Bloqueio de Atendimento Múltiplo", description: "A operação deve impedir múltiplos atendimentos ativos para um mesmo profissional independentemente de conflitos de horário.", classification: "completed", target: { entityType: "decision", entityId: "dec-flow-020" }, requiresApproval: false },
    { id: "fval-c3", type: "decision", title: "DEC-FLOW-021: Fonte Oficial do Estado Operacional", description: "A Central Operacional torna-se a fonte oficial do estado operacional dos profissionais.", classification: "completed", target: { entityType: "decision", entityId: "dec-flow-021" }, requiresApproval: false },
    { id: "fval-c4", type: "decision", title: "DEC-FLOW-022: Novo Fluxo de Walk-in", description: "Walk-in deixa de iniciar atendimentos diretamente e passa a utilizar exatamente o mesmo fluxo operacional dos agendamentos convencionais.", classification: "completed", target: { entityType: "decision", entityId: "dec-flow-022" }, requiresApproval: false },

    { id: "fval-c5", type: "progress", title: "Correção do Double Booking", description: "Correção definitiva do problema de Double Booking.", classification: "completed", requiresApproval: false },
    { id: "fval-c6", type: "progress", title: "Validação transacional", description: "Validação transacional utilizando PostgreSQL real.", classification: "completed", requiresApproval: false },
    { id: "fval-c7", type: "progress", title: "Correção de conflitos reais", description: "Reprodução de conflitos reais de serialização (SQLSTATE 40001).", classification: "completed", requiresApproval: false },
    { id: "fval-c8", type: "progress", title: "Auditoria estrutural das migrations", description: "Auditoria estrutural completa das migrations.", classification: "completed", requiresApproval: false },
    { id: "fval-c9", type: "progress", title: "Correção PostgreSQL", description: "Correção da compatibilidade PostgreSQL.", classification: "completed", requiresApproval: false },
    { id: "fval-c10", type: "progress", title: "Simulação operacional completa", description: "Simulação utilizando ambiente local.", classification: "completed", requiresApproval: false },
    { id: "fval-c11", type: "progress", title: "Redesenho do Walk-in", description: "Redesenho completo do fluxo de Walk-in.", classification: "completed", requiresApproval: false },
    { id: "fval-c12", type: "progress", title: "Persistência dos estados", description: "Persistência dos estados operacionais dos profissionais.", classification: "completed", requiresApproval: false },
    { id: "fval-c13", type: "progress", title: "Integração Central Operacional", description: "Integração da Central Operacional com dados reais.", classification: "completed", requiresApproval: false },
    { id: "fval-c14", type: "progress", title: "Estabilização da API", description: "Estabilização da API local.", classification: "completed", requiresApproval: false },

    { id: "fval-c15", type: "pattern", title: "PATTERN-FLOW-014", description: "Toda validação crítica deve ocorrer utilizando o banco de dados oficial do ambiente de produção.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-flow-014" }, requiresApproval: true },
    { id: "fval-c16", type: "pattern", title: "PATTERN-FLOW-015", description: "Fluxos especiais devem reutilizar a mesma operação principal sempre que possível, evitando regras paralelas.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-flow-015" }, requiresApproval: true },
    { id: "fval-c17", type: "pattern", title: "PATTERN-FLOW-016", description: "Estados operacionais devem ser persistidos e nunca depender apenas de memória da aplicação.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-flow-016" }, requiresApproval: true },

    { id: "fval-c18", type: "pattern", title: "PI-FLOW-007", description: "A confiabilidade operacional nasce da validação em cenários reais e não apenas da aprovação de testes unitários.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pi-flow-007" }, requiresApproval: true },
    { id: "fval-c19", type: "pattern", title: "PI-FLOW-008", description: "Uma operação consistente depende de um único fluxo de execução compartilhado entre todos os cenários possíveis.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pi-flow-008" }, requiresApproval: true },

    { id: "fval-c20", type: "roadmap", title: "Correção de concorrência", description: "Concluído", classification: "completed", requiresApproval: false },
    { id: "fval-c21", type: "roadmap", title: "Validação PostgreSQL", description: "Concluído", classification: "completed", requiresApproval: false },
    { id: "fval-c22", type: "roadmap", title: "Auditoria completa das migrations", description: "Concluído", classification: "completed", requiresApproval: false },
    { id: "fval-c23", type: "roadmap", title: "Correção estrutural do banco", description: "Concluído", classification: "completed", requiresApproval: false },
    { id: "fval-c24", type: "roadmap", title: "Simulação operacional completa", description: "Concluído", classification: "completed", requiresApproval: false },
    { id: "fval-c25", type: "roadmap", title: "Redesenho do Walk-in", description: "Concluído", classification: "completed", requiresApproval: false },
    { id: "fval-c26", type: "roadmap", title: "Persistência dos estados operacionais", description: "Concluído", classification: "completed", requiresApproval: false },
    { id: "fval-c27", type: "roadmap", title: "Integração da Central Operacional", description: "Concluído", classification: "completed", requiresApproval: false },
    { id: "fval-c28", type: "roadmap", title: "Estabilização da API", description: "Concluído", classification: "completed", requiresApproval: false },
    
    { id: "fval-c29", type: "roadmap", title: "Validar os últimos testes PostgreSQL", description: "Próxima fase", classification: "planned", requiresApproval: false },
    { id: "fval-c30", type: "roadmap", title: "Eliminar componentes simulados restantes", description: "Próxima fase", classification: "planned", requiresApproval: false },
    { id: "fval-c31", type: "roadmap", title: "Consolidar a Central Operacional", description: "Próxima fase", classification: "planned", requiresApproval: false },
    { id: "fval-c32", type: "roadmap", title: "Executar testes completos de piloto", description: "Próxima fase", classification: "planned", requiresApproval: false },
    { id: "fval-c33", type: "roadmap", title: "Implantar nas primeiras barbearias", description: "Próxima fase", classification: "planned", requiresApproval: false },

    { id: "fval-c34", type: "cross_project_impact", title: "Impacto: NEW", description: "Relacionamento institucional", classification: "informational", target: { entityType: "project", entityId: "proj_new" }, requiresApproval: false },
    { id: "fval-c35", type: "cross_project_impact", title: "Impacto: NEW OS", description: "Relacionamento institucional", classification: "informational", target: { entityType: "project", entityId: "proj_new_os" }, requiresApproval: false },
    { id: "fval-c36", type: "cross_project_impact", title: "Impacto: NEX", description: "Relacionamento institucional", classification: "informational", target: { entityType: "project", entityId: "proj_nex" }, requiresApproval: false },

    { id: "fval-c37", type: "progress", title: "Knowledge Candidate: Double Booking Prevention", description: "Candidato a documentação.", classification: "planned", requiresApproval: false },
    { id: "fval-c38", type: "progress", title: "Knowledge Candidate: PostgreSQL Validation", description: "Candidato a documentação.", classification: "planned", requiresApproval: false },
    { id: "fval-c39", type: "progress", title: "Knowledge Candidate: Transaction Isolation", description: "Candidato a documentação.", classification: "planned", requiresApproval: false },
    { id: "fval-c40", type: "progress", title: "Knowledge Candidate: Operational Status", description: "Candidato a documentação.", classification: "planned", requiresApproval: false },
    { id: "fval-c41", type: "progress", title: "Knowledge Candidate: Walk-in Flow", description: "Candidato a documentação.", classification: "planned", requiresApproval: false },
    { id: "fval-c42", type: "progress", title: "Knowledge Candidate: Operational Simulation", description: "Candidato a documentação.", classification: "planned", requiresApproval: false },
    { id: "fval-c43", type: "progress", title: "Knowledge Candidate: Migration Audit", description: "Candidato a documentação.", classification: "planned", requiresApproval: false },
    { id: "fval-c44", type: "progress", title: "Knowledge Candidate: Central Operacional", description: "Candidato a documentação.", classification: "planned", requiresApproval: false },
  ]
};

export const mockNewCoreStrategyIngestion: OperationalIngestion = {
  id: "ing-new-core-001",
  kind: "operational",
  projectId: "proj_new",
  title: "A Nova Definição da NEW: Fábrica de Sistemas Inteligentes",
  referenceDate: "2026-07-26",
  sourceType: "conversation",
  sourceContent: `## Resumo Operacional: Transição Estratégica (2026-07-26)

**Fase Oficial:** Transição para Knowledge Core e Fábrica de Sistemas Inteligentes.

**Status Institucional:**
Nesta sessão ocorreu um pivot fundamental na estrutura arquitetural da holding. A NEW deixa de ser um "guarda-chuva de projetos isolados" (como FLOW, CRM, ERP, NEX) e passa a ser reconhecida como um Ecossistema Fechado de Tecnologia, operando como uma **Fábrica de Sistemas Inteligentes**.

**O Knowledge Core:**
Os projetos não compartilham apenas código; eles compartilham Padrões de Conhecimento ("Patterns"). O documento fundador "NEW Experience Bible" evolui para o "NEW Knowledge System" ou "NEW Core". A empresa agora armazena seus ativos institucionais não como "textos", mas como padrões pragmáticos reutilizáveis de Arquitetura, Design, UX, Automação, IA, etc. A escalabilidade da holding baseia-se em reutilizar soluções do Laboratório para qualquer novo produto.

**Mudança de Abordagem Documental:**
Toda anotação e documentação fundacional deve ser pragmática, objetiva e baseada em impacto. Expressões emocionais ("É um movimento genial") dão lugar a justificativas de valor ("Esse posicionamento transforma um serviço recorrente em uma plataforma contínua, aumentando o valor percebido, a retenção e o potencial de escala").
`,
  actor: mockHumanActor,
  status: "approved",
  createdAt: "2026-07-26T03:00:00Z",
  updatedAt: "2026-07-26T03:00:00Z",
  createdBy: mockHumanActor,
  relatedEntities: [],
  changes: [
    { id: "new-core-c1", type: "decision", title: "Fábrica de Sistemas Inteligentes", description: "A NEW é agora definida como uma Fábrica de Sistemas Inteligentes (Knowledge Core), não um guarda-chuva de empresas soltas.", classification: "completed", requiresApproval: false },
    { id: "new-core-c2", type: "decision", title: "Criação do NEW Knowledge System", description: "O NEW Experience Bible evolui para o NEW Knowledge System (NEW Core).", classification: "completed", requiresApproval: false },
    { id: "new-core-c3", type: "decision", title: "Sistema Operacional de Construção de Empresas", description: "O objetivo principal da holding é acumular ativos em formato de Padrões (Patterns) para acelerar a criação de novas verticais (ex: NEW Health, NEW Finance).", classification: "completed", requiresApproval: false },
    { id: "new-core-c4", type: "decision", title: "Pragmatismo Documental", description: "Documentos fundacionais devem ser objetivos, focando no aumento de valor percebido, retenção e escala, eliminando adjetivos emocionais.", classification: "completed", requiresApproval: false },

    { id: "new-core-c5", type: "pattern", title: "PATTERN-NEW-002: Reutilização de Padrões", description: "Todo problema resolvido em um projeto deve ser extraído e documentado como um Padrão (Pattern) no Knowledge Core para reuso.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-new-002" }, requiresApproval: true },

    { id: "new-core-c6", type: "roadmap", title: "Reestruturação do NEW OS", description: "Refatorar o NEW OS para suportar a arquitetura de Patterns (Arquitetura, UX, IA, Automação, Banco de Dados, etc).", classification: "planned", requiresApproval: false },
    
    { id: "new-core-c7", type: "cross_project_impact", title: "Impacto Global", description: "Muda a arquitetura informacional de todos os produtos, que passam a consumir o NEW Core.", classification: "informational", target: { entityType: "project", entityId: "proj_new" }, requiresApproval: false },
  ]
};

export const mockNexDailyIngestion: OperationalIngestion = {
  id: "ing-nex-daily-001",
  kind: "operational",
  projectId: "proj_nex",
  title: "NEX DAILY: Arquitetura, Inteligência e Primeiro Cliente Real",
  referenceDate: "2026-07-28",
  sourceType: "conversation",
  sourceContent: `## NEX DAILY (Ontem e Hoje)

**Arquitetura do NEX Core:**
- PostgreSQL + Prisma como base de dados.
- Autenticação JWT com cookies httpOnly.
- Separação entre Lead, Company e Strategic Analysis.
- Pipeline comercial completo com timeline de atividades.
- Módulos START, GROWTH e SCALE. Primeiro módulo a ser desenvolvido: **Análise Estratégica (Diagnóstico Digital via IA)**.

**Evolução do Produto:**
- A NEX não vende site, vende **estrutura digital** e o site é a consequência.
- O Portal do Cliente será o epicentro da comunicação de valor (projetos, entregas, evolução, etc).
- **Inteligência NEX:** Sites criados enviarão telemetria ao Core, gerando monitoramento, saúde, recomendações automáticas e evolução orientada a dados.

**Primeiro Cliente Real:**
- Cliente prospectado de forma orgânica. Segmento: **Marca de Roupas**.
- Mudança de Paradigma na Prospecção: Não perguntar "Você quer um site?", mas sim "Como funciona o seu negócio?". A tecnologia é a solução diagnosticada, não a oferta inicial.
- A compreensão de modelo de vendas, público, operação e posicionamento precede a execução tecnológica.

**Material Comercial:**
- Foi iniciada a construção das apresentações (Nossa Filosofia, Metodologia, Portal NEX, etc), alavancando a imagem da NEX para "empresa de tecnologia e consultoria premium".
- Decisão: Adiar a execução do Instagram até a consolidação irrefutável da metodologia.

**Aprendizado Principal:**
- O maior diferencial da NEX não é a tecnologia em si, mas a forma de pensar. Estratégia antes da execução. A evolução contínua é o produto.
`,
  actor: mockHumanActor,
  status: "approved",
  createdAt: "2026-07-28T12:00:00Z",
  updatedAt: "2026-07-28T12:00:00Z",
  createdBy: mockHumanActor,
  relatedEntities: [],
  changes: [
    { id: "nex-d-c1", type: "decision", title: "Arquitetura Base NEX Core", description: "Definida stack de persistência e autenticação: PostgreSQL, Prisma, JWT via cookies httpOnly.", classification: "completed", requiresApproval: false },
    { id: "nex-d-c2", type: "decision", title: "Inteligência NEX (Telemetria)", description: "Todos os sites produzidos atuarão como nós sensores da rede (Inteligência NEX), devolvendo informações operacionais de volta ao NEX Core.", classification: "planned", requiresApproval: false },
    { id: "nex-d-c3", type: "decision", title: "Foco no Diagnóstico", description: "O fluxo de onboarding deve ignorar a oferta de tecnologia e concentrar na descoberta do modelo de negócio.", classification: "completed", requiresApproval: false },
    { id: "nex-d-c4", type: "progress", title: "Primeiro Cliente Piloto", description: "Prospectada a primeira marca (vestuário) para teste oficial da esteira comercial do NEX Core.", classification: "completed", requiresApproval: false },
    
    { id: "nex-d-c5", type: "pattern", title: "PATTERN-NEX-014: Produto = Estrutura Digital", description: "A NEX não vende sites, vende Estrutura Digital. O site é subproduto.", classification: "informational", target: { entityType: "institutional_pattern", entityId: "pat-nex-014" }, requiresApproval: false },
  ]
};

export const mockProposals: ImprovementProposal[] = [
  {
    id: "prop-001",
    title: "Implementar cache em requisições de clientes",
    description: "Sugestão para reduzir tempo de carregamento da página de clientes usando Redis.",
    status: "under_review",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: mockAIActor,
    relatedEntities: [],
  },
  {
    id: "prop-002",
    title: "Revisar estrutura de aprovações",
    description: "A atual estrutura exige muitos cliques. Simplificar workflow.",
    status: "draft",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: mockHumanActor,
    relatedEntities: [],
  },
];

export const mockAssessments: ImpactAssessment[] = [
  {
    id: "impact-001",
    relatedProposal: { entityType: "proposal", entityId: "prop-001", label: "Implementar cache" },
    expectedOutcome: "Reduzir tempo de load em 50%",
    expectedMetrics: [{ metricName: "Load Time", targetValue: "500ms" }],
    assessmentStatus: "not_started",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: mockHumanActor,
  }
];

export const mockIngestions: OperationalIngestion[] = [
  mockNexStrategyIngestion,
  mockFlowControlIngestion,
  mockFlowConsolidationIngestion,
  mockFlowMvpIngestion,
  mockNexLanguageIngestion,
  mockErpStrategyIngestion,
  mockNexCoreIngestion,
  mockFlowValidationIngestion,
  mockNewCoreStrategyIngestion,
  mockNexDailyIngestion,
  mockFlowIngestion,
];
