# Feature Specification: Frontend Mock Demo — Scanner LGPD Educacional

**Feature Branch**: `002-frontend-mock-demo`

**Created**: 2026-06-23

**Status**: Draft

**Input**: User description: "altere a especificacao para adicionar dados mocados no frontend. os objetivos se dividem entre um prototipo que simule o comportamento real do sistema e uma interface moderna e bonita feita com componentes shadcn. aplique alteracao de tema claro/escuro, adicione animacoes. o foco é o front simulando o uso"

## User Scenarios & Testing

### User Story 1 — Navegação completa simulada com dados mockados (Priority: P1)

O usuário acessa a aplicação e interage com todas as telas do fluxo principal (Home → Scan em andamento → Relatório → Glossário → Histórico) como se o sistema real estivesse funcionando, mas utilizando dados pré-definidos (mockados) no frontend, sem dependência do backend.

**Why this priority**: É o core do protótipo — demonstra o fluxo completo do produto em funcionamento, permitindo validação de UX, apresentação para stakeholders e testes de usabilidade sem necessidade de infraestrutura de backend.

**Independent Test**: Abrir a aplicação no navegador, inserir uma URL simulada, acompanhar a barra de progresso, visualizar o relatório completo com pontuação, gráficos, findings e recomendações — tudo sem chamadas reais à API.

**Acceptance Scenarios**:

1. **Given** que o usuário está na tela inicial, **When** insere uma URL simulada e clica em "Analisar", **Then** o sistema exibe uma tela de progresso animada que evolui automaticamente até 100% em ~4 segundos e redireciona para o relatório completo.
2. **Given** que o relatório está visível, **When** o usuário rola a página, **Then** todas as seções (score gauge, categorias, findings, cookies, formulários, disclaimer) exibem dados consistentes e completos provenientes dos mocks.
3. **Given** que o usuário acessa o glossário, **When** digita um termo de busca, **Then** os resultados filtrados aparecem após um pequeno delay simulado (200-400ms) com animação de fade-in.
4. **Given** que o usuário acessa o histórico, **When** a página carrega, **Then** uma lista paginada de análises anteriores simuladas é exibida com dados variados (diferentes scores, níveis de risco, datas).

---

### User Story 2 — Tema claro/escuro com toggle (Priority: P1)

O usuário pode alternar entre tema claro e escuro em qualquer tela da aplicação, com transição suave e preferência persistida entre sessões.

**Why this priority**: Afeta toda a experiência visual; é uma funcionalidade moderna esperada que valoriza a apresentação do protótipo e melhora acessibilidade e conforto visual.

**Independent Test**: Clicar no toggle de tema no header e verificar que todas as cores da interface transitam suavemente entre os temas; recarregar a página e confirmar que a preferência foi mantida.

**Acceptance Scenarios**:

1. **Given** que o usuário está no tema claro (padrão), **When** clica no botão de alternar tema, **Then** toda a interface transita para o tema escuro com animação de transição de cores em ~300ms.
2. **Given** que o usuário alternou para tema escuro e recarrega a página, **When** a página carrega novamente, **Then** o tema escuro é restaurado automaticamente (persistido em localStorage).
3. **Given** que o usuário está em qualquer tela, **When** alterna o tema, **Then** todos os componentes (gráficos, tabelas, cards, badges) refletem o novo tema corretamente.

---

### User Story 3 — Interface moderna com componentes shadcn-vue (Priority: P2)

Todos os componentes visuais da aplicação são reconstruídos utilizando shadcn-vue, garantindo consistência visual, acessibilidade (WCAG 2.1 AA) e aparência profissional moderna.

**Why this priority**: Define a qualidade estética e a experiência do protótipo; shadcn-vue fornece componentes acessíveis e customizáveis que elevam o nível da apresentação.

**Independent Test**: Inspecionar visualmente cada componente (botões, inputs, cards, badges, tabelas, gráficos) e verificar que seguem o design system do shadcn com variantes consistentes.

**Acceptance Scenarios**:

1. **Given** que o usuário visualiza qualquer tela, **When** inspeciona os componentes, **Then** todos seguem o padrão shadcn (radix-vue + Tailwind CSS) com variantes de cor, tamanho e estado consistentes.
2. **Given** que o usuário navega pelo teclado, **When** pressiona Tab, **Then** todos os elementos interativos recebem focus visível e a ordem de tabulação é lógica.
3. **Given** que o usuário utiliza leitor de tela, **When** navega pela aplicação, **Then** todos os elementos possuem labels aria adequados e regiões de live region para conteúdo dinâmico.

---

### User Story 4 — Animações e micro-interações (Priority: P2)

A interface utiliza animações e transições para melhorar a percepção de fluidez e feedback visual durante a navegação e carregamento de dados simulados.

**Why this priority**: Animações elevam a percepção de qualidade do protótipo e tornam a simulação mais convincente e agradável.

**Independent Test**: Navegar pelo fluxo completo e verificar que transições entre telas, aparição de cards, progresso do scan e hover states possuem animações suaves.

**Acceptance Scenarios**:

1. **Given** que o scan está em andamento, **When** a barra de progresso avança, **Then** a transição é animada com easing suave e steps visuais com checkmarks animados.
2. **Given** que o relatório carrega, **When** os cards de finding aparecem, **Then** cada card anima com fade-in + slide-up sequencial (staggered) ao entrar no viewport.
3. **Given** que o usuário passa o mouse sobre cards e linhas de tabela, **When** ocorre hover, **Then** há transição suave de background/border.
4. **Given** que o usuário alterna entre telas via Vue Router, **When** a navegação ocorre, **Then** há transição de fade/opacidade entre as views.

---

### Edge Cases

- O que acontece quando o localStorage está cheio ou indisponível (modo privado)? O tema padrão (claro) é usado como fallback.
- O que acontece se o mock de scan demorar mais que o esperado? A barra de progresso para em 95% e exibe mensagem genérica, mas eventualmente completa.
- Como o sistema lida com resize da janela? Layout responsivo com breakpoints mobile/tablet/desktop; componentes shadcn adaptam-se naturalmente.
- O que ocorre ao alternar tema durante uma animação em andamento? A transição de cores acompanha o easing definido.

## Requirements

### Functional Requirements

- **FR-001**: O frontend DEVE operar completamente offline utilizando dados mockados, sem dependência de backend.
- **FR-002**: O sistema DEVE prover um toggle de tema claro/escuro acessível em todas as telas via header.
- **FR-003**: O sistema DEVE persistir a preferência de tema em localStorage e restaurá-la ao carregar.
- **FR-004**: Todos os componentes visuais DEVEM ser implementados com shadcn-vue (baseados em radix-vue + Tailwind CSS).
- **FR-005**: O fluxo de scan DEVE simular progresso automaticamente em ~4 segundos com animação de barra de progresso.
- **FR-006**: O sistema DEVE incluir transições de página (fade) e animações de entrada (fade-in + slide-up) para cards e seções.
- **FR-007**: A tela de relatório DEVE exibir dados simulados completos: score gauge, risk badge, 7 categorias, findings com recomendações, lista de cookies e formulários.
- **FR-008**: O glossário DEVE simular busca com delay artificial de 200-400ms e animação de fade-in nos resultados.
- **FR-009**: O histórico DEVE exibir lista paginada com múltiplas análises simuladas, com scores, riscos e datas variadas.
- **FR-010**: O sistema DEVE manter acessibilidade WCAG 2.1 AA em ambos os temas (contraste adequado, focus visível, roles aria).

### Key Entities (dados mockados)

- **Mock Scan**: Simula uma análise com URL, status, score (0-100), riskLevel, timestamps de início e fim. Pelo menos 10 registros variados no histórico.
- **Mock Report**: Dados completos de relatório com 7 categorias, 33 findings (um por critério C01-C33), recomendações variadas por prioridade, 5-8 cookies simulados de diferentes tipos, 1-2 formulários mockados com campos de dados pessoais.
- **Mock Glossary**: 15+ termos com definições, artigos LGPD e termos relacionados.
- **Theme Preference**: Chave `theme` no localStorage com valor `"light"` ou `"dark"`.

## Success Criteria

### Measurable Outcomes

- **SC-001**: O usuário consegue completar o fluxo completo (Home → Scan → Relatório) em menos de 15 segundos sem qualquer erro de console.
- **SC-002**: A alternância de tema ocorre em menos de 300ms com transição visual perceptível e sem flicker.
- **SC-003**: A interface atinge score mínimo de 90 no Lighthouse Accessibility audit em ambos os temas.
- **SC-004**: Todos os 10+ scans do histórico e 33 findings do relatório são exibidos corretamente sem dados vazios ou placeholders visíveis.
- **SC-005**: A barra de progresso do scan simulado completa em 4±1 segundos de forma consistente.
- **SC-006**: O protótipo funciona corretamente em navegadores Chrome, Firefox e Safari (últimas 2 versões).
- **SC-007**: O layout é totalmente funcional em viewports de 375px (mobile) a 1920px (desktop).

## Assumptions

- Os dados mockados são hardcoded no frontend (arquivos TypeScript de mock data), sem necessidade de servidor local.
- O Tailwind CSS será utilizado como framework de estilização base do shadcn-vue.
- A persistência de tema usa localStorage; não há necessidade de cookies ou preferências de servidor.
- Os componentes shadcn-vue serão instalados via CLI (`npx shadcn-vue@latest add`) e customizados conforme necessidade.
- As animações utilizarão CSS transitions e Vue `<Transition>` / `<TransitionGroup>`, sem bibliotecas externas de animação.
- O protótipo mantém a arquitetura Vue 3 + Pinia + Vue Router existente no projeto.
- A simulação de delay em busca e carregamento usa `setTimeout` simples nos stores/composables mockados.
- O tema escuro usará a estratégia de classe CSS (`class="dark"` no `<html>`) com variáveis Tailwind.
