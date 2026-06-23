# Especificação de Funcionalidade: Scanner LGPD Educacional

**Branch**: `001-scanner-lgpd-educacional`

**Criado**: 2026-06-22

**Status**: Rascunho

**Entrada**: Protótipo educacional de scanner LGPD para sites de pequenas empresas, capaz de analisar elementos públicos de um site (política de privacidade, banner de cookies e formulários) e gerar um relatório didático com nível de risco, pontos de atenção e recomendações de melhoria.

---

## 1. Apresentação do Projeto

### 1.1 Nome do Sistema

**Scanner LGPD Educacional**

### 1.2 Descrição Geral

O Scanner LGPD Educacional é um protótipo de ferramenta web que realiza a análise automatizada de elementos públicos de sites relacionados à Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018). O sistema examina aspectos como política de privacidade, banner de cookies, formulários e indicadores básicos de segurança, gerando um relatório didático com pontuação, nível de risco e recomendações educativas de melhoria.

### 1.3 Problema que o Sistema Busca Resolver

Pequenas empresas, estudantes e desenvolvedores frequentemente publicam sites sem conhecer ou aplicar os princípios da LGPD. Isso resulta em:

- Ausência de política de privacidade ou textos genéricos e insuficientes.
- Cookies carregados sem consentimento prévio.
- Formulários que coletam dados desnecessários ou sensíveis sem justificativa.
- Falta de identificação do controlador e canal de contato para titulares.
- Desconhecimento sobre os direitos do titular previstos na LGPD.

Não existe atualmente uma ferramenta gratuita, simples e educativa voltada ao público brasileiro que permita diagnosticar rapidamente esses problemas em sites de pequenas empresas.

### 1.4 Público-Alvo

| Público                | Descrição                                                                                     |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| Pequenas empresas      | Proprietários e gestores de pequenos negócios que possuem sites e precisam entender a LGPD.   |
| Estudantes             | Alunos de cursos de tecnologia, direito e áreas correlatas que estudam proteção de dados.     |
| Desenvolvedores        | Profissionais que desenvolvem sites e desejam verificar boas práticas de privacidade.         |
| Professores            | Educadores que buscam material didático para ensino de LGPD em contextos práticos.            |

### 1.5 Objetivo Geral

Desenvolver uma ferramenta educacional que analise automaticamente aspectos visíveis de um site relacionados à LGPD e gere um relatório simples, explicativo e prático sobre possíveis riscos e melhorias.

### 1.6 Objetivos Específicos

- Identificar a presença ou ausência de política de privacidade em sites.
- Avaliar a qualidade e completude da política de privacidade com base em critérios da LGPD e da ANPD.
- Detectar banners de cookies e verificar a existência de mecanismos de consentimento.
- Classificar cookies encontrados por tipo (necessários, analíticos, funcionais, marketing, próprios, terceiros, sessão, persistentes).
- Analisar formulários públicos para identificar coleta de dados pessoais e dados sensíveis.
- Avaliar a minimização de dados coletados em formulários.
- Verificar indicadores básicos de segurança (HTTPS, formulários em páginas seguras, scripts externos).
- Gerar pontuação educativa e classificação de risco.
- Produzir relatório didático com recomendações de melhoria vinculadas a princípios da LGPD.
- Disponibilizar glossário com termos relevantes da LGPD.

### 1.7 Justificativa Educacional

A LGPD é uma legislação relativamente recente no Brasil e sua compreensão prática ainda é limitada, especialmente entre pequenas empresas. Ferramentas automatizadas de diagnóstico educacional podem contribuir significativamente para:

- Conscientização sobre a importância da proteção de dados pessoais.
- Disseminação de conhecimento sobre os princípios da LGPD de forma acessível.
- Estímulo à adoção de boas práticas de privacidade desde a fase de desenvolvimento de sites.
- Redução da assimetria de informação entre grandes organizações (que possuem equipes jurídicas) e pequenas empresas.

O uso de uma ferramenta prática e visual facilita o aprendizado por meio da análise de casos reais, promovendo educação em proteção de dados de forma contextualizada.

---

## 2. Escopo do Sistema

### 2.1 O que o Protótipo Faz

- Recebe uma URL como entrada e realiza análise automatizada de elementos públicos do site.
- Localiza e analisa a política de privacidade do site.
- Detecta e analisa banners de cookies e mecanismos de consentimento.
- Identifica e classifica cookies presentes no site.
- Analisa formulários públicos para identificar campos de dados pessoais e sensíveis.
- Verifica indicadores básicos de segurança (HTTPS, scripts externos).
- Avalia a política de privacidade quanto à menção de bases legais, direitos do titular, identificação do controlador e canal de contato.
- Avalia a clareza da linguagem utilizada na política de privacidade.
- Gera pontuação educativa (0 a 100) e classificação de risco (alto, médio, baixo, boas práticas).
- Produz relatório didático com findings, explicações educativas e recomendações de melhoria.
- Disponibiliza glossário com termos da LGPD.
- Armazena histórico de análises realizadas.

### 2.2 O que o Protótipo NÃO Faz

- Não declara conformidade legal definitiva com a LGPD.
- Não funciona como parecer jurídico ou consultoria legal.
- Não substitui a avaliação de um profissional especializado em proteção de dados.
- Não acessa áreas restritas, painéis administrativos ou conteúdo protegido por autenticação.
- Não armazena dados pessoais encontrados nos sites analisados.
- Não realiza testes de penetração ou análise de vulnerabilidades de segurança.
- Não executa JavaScript complexo em todos os cenários (limitações de rendering).
- Não garante detecção de 100% dos cookies ou elementos dinâmicos.
- Não realiza análise de aplicativos móveis ou softwares desktop.

### 2.3 Limitações Assumidas

- A análise é baseada exclusivamente em informações publicamente acessíveis na URL informada.
- Sites que bloqueiam acesso automatizado (scraping) podem ter análise parcial ou indisponível.
- Conteúdo carregado exclusivamente via JavaScript assíncrono pode não ser completamente detectado.
- A classificação de cookies é baseada em heurísticas e pode conter imprecisões.
- A análise de linguagem clara utiliza critérios simplificados e não substitui avaliação humana.
- A pontuação e classificação de risco são meramente educativas e não possuem valor jurídico.

### 2.4 Aviso Legal

> **IMPORTANTE**: Esta ferramenta é um protótipo educacional. O relatório gerado tem caráter exclusivamente didático e informativo. Ele não constitui parecer jurídico, não certifica conformidade com a LGPD e não substitui a consultoria de um profissional especializado em proteção de dados. Para avaliação definitiva de conformidade, consulte um advogado ou encarregado de dados (DPO) qualificado.

---

## 3. Atores do Sistema

| Ator                   | Descrição                                                                                                                   |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Usuário Comum          | Qualquer pessoa que acessa a ferramenta para analisar um site. Não necessita de cadastro para uso básico.                   |
| Pequena Empresa        | Proprietário ou gestor de pequena empresa que deseja verificar o nível de adequação do site de seu negócio à LGPD.           |
| Estudante              | Aluno de cursos de tecnologia, direito ou áreas correlatas que utiliza a ferramenta como material de estudo e aprendizado.  |
| Desenvolvedor          | Profissional que desenvolve sites e utiliza a ferramenta para verificar boas práticas de privacidade e proteção de dados.    |
| Administrador do Sistema | Responsável pela gestão da plataforma, configuração de critérios de análise e manutenção do glossário.                    |

---

## 4. Requisitos Funcionais

| ID    | Nome                                 | Descrição                                                                                                                                       | Prioridade | Funcionalidade Relacionada           | Critério de Aceitação                                                                                                       |
| ----- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| RF01  | Inserir URL para análise             | O sistema deve permitir que o usuário informe uma URL válida para iniciar a análise.                                                            | Alta       | Scanner de URL                       | O sistema aceita URLs válidas e rejeita URLs inválidas com mensagem clara de erro.                                          |
| RF02  | Executar scanner automatizado        | O sistema deve realizar análise automatizada dos elementos públicos do site informado.                                                          | Alta       | URL Scanner                          | A análise é iniciada automaticamente após a inserção da URL e processa política de privacidade, cookies e formulários.       |
| RF03  | Diagnosticar política de privacidade | O sistema deve verificar se o site possui política de privacidade e avaliar sua completude.                                                     | Alta       | Privacy Policy Analyzer              | O sistema identifica a presença/ausência da política e verifica menção a dados coletados, finalidade, armazenamento, direitos do titular e contato. |
| RF04  | Avaliar linguagem clara              | O sistema deve avaliar se a política de privacidade utiliza linguagem acessível e evita termos excessivamente genéricos.                          | Média      | Privacy Policy Analyzer              | O sistema identifica trechos vagos como "usamos dados para melhorar sua experiência" e sinaliza a necessidade de detalhamento. |
| RF05  | Detectar banner de cookies           | O sistema deve identificar a presença de banner de cookies e verificar mecanismos de consentimento.                                               | Alta       | Cookie Analyzer                      | O sistema detecta banner e verifica existência de botões de aceitar, recusar, gerenciar preferências e link para política.    |
| RF06  | Classificar cookies                  | O sistema deve classificar cookies encontrados por tipo (necessários, analíticos, funcionais, marketing, próprios, terceiros, sessão, persistentes). | Alta    | Cookie Analyzer                      | O sistema lista cookies encontrados com suas classificações e indica cookies não necessários carregados antes de consentimento. |
| RF07  | Alertar cookies não necessários      | O sistema deve sinalizar cookies de marketing, rastreamento ou terceiros carregados antes de consentimento.                                      | Alta       | Cookie Analyzer                      | O relatório exibe alerta claro para cada cookie não necessário detectado sem mecanismo de consentimento adequado.             |
| RF08  | Simular gerenciador de preferências  | O relatório deve apresentar simulação didática de tela de preferências de cookies.                                                               | Baixa      | Cookie Analyzer                      | O relatório inclui exemplo visual de como deveria ser uma tela adequada de gerenciamento de cookies.                         |
| RF09  | Analisar formulários                 | O sistema deve identificar formulários públicos e classificar campos de dados pessoais.                                                          | Alta       | Form Analyzer                        | O sistema lista formulários encontrados e identifica campos como nome, e-mail, telefone, CPF, endereço, entre outros.        |
| RF10  | Analisar minimização de dados        | O sistema deve apontar campos possivelmente desnecessários para a finalidade do formulário.                                                       | Alta       | Form Analyzer                        | O relatório indica campos que parecem excessivos para a finalidade declarada ou inferida do formulário.                      |
| RF11  | Detectar dados sensíveis             | O sistema deve sinalizar campos ou textos relacionados a dados sensíveis conforme LGPD (saúde, biometria, religião, opinião política, raça/etnia). | Alta       | Form Analyzer                        | O relatório exibe alerta para cada campo de dado sensível identificado, com explicação sobre o risco.                        |
| RF12  | Verificar base legal declarada       | O sistema deve analisar se a política menciona bases legais como consentimento, execução de contrato, obrigação legal e legítimo interesse.        | Alta       | Privacy Policy Analyzer              | O relatório indica quais bases legais são mencionadas na política e quais estão ausentes.                                    |
| RF13  | Checar direitos do titular           | O sistema deve verificar se a política explica como o titular pode exercer seus direitos (acesso, correção, exclusão, portabilidade, revogação).   | Alta       | Privacy Policy Analyzer              | O relatório lista direitos do titular mencionados e ausentes na política.                                                    |
| RF14  | Identificar controlador e contato    | O sistema deve procurar nome da empresa, CNPJ, e-mail de privacidade e indicação de encarregado/DPO.                                              | Alta       | Privacy Policy Analyzer              | O relatório indica quais informações de identificação do controlador e canal de contato foram encontradas.                   |
| RF15  | Gerar relatório didático             | O sistema deve gerar relatório com pontuação, nível de risco, findings, explicações educativas e recomendações de melhoria.                        | Alta       | Report Generator                     | O relatório exibe todas as seções com linguagem acessível e vínculos claros com princípios da LGPD.                          |
| RF16  | Verificar segurança básica           | O sistema deve verificar uso de HTTPS, formulários em páginas seguras, ausência de dados sensíveis expostos e scripts externos relevantes.        | Alta       | URL Scanner                          | O relatório indica status de HTTPS, presença de formulários sem HTTPS e lista scripts externos detectados.                   |
| RF17  | Disponibilizar glossário LGPD        | O sistema deve apresentar glossário com termos relevantes da LGPD e suas explicações.                                                            | Média      | Glossary Module                      | O glossário contém ao menos 10 termos com definições claras e acessíveis.                                                    |
| RF18  | Exibir recomendações educativas      | Para cada problema encontrado, o relatório deve apresentar o que foi encontrado, por que importa, relação com a LGPD e como melhorar.               | Alta       | Report Generator                     | Cada finding do relatório contém as quatro seções educativas obrigatórias.                                                    |
| RF19  | Armazenar histórico de análises      | O sistema deve persistir registros das análises realizadas para consulta posterior.                                                              | Baixa      | Persistência                         | O usuário pode consultar análises anteriores por data ou URL.                                                                |
| RF20  | Exportar relatório                   | O sistema deve permitir exportação do relatório em formato legível.                                                                              | Baixa      | Report Generator                     | O usuário pode baixar o relatório em formato PDF ou texto estruturado.                                                       |

---

## 5. Requisitos Não Funcionais

| ID    | Nome                    | Descrição                                                                                                                                              | Categoria          |
| ----- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| RNF01 | Usabilidade             | A interface deve ser intuitiva, permitindo que usuários sem conhecimento técnico realizem uma análise em até 3 cliques.                                | Usabilidade        |
| RNF02 | Desempenho              | A análise de um site deve ser concluída em no máximo 60 segundos em condições normais de conectividade.                                                 | Desempenho         |
| RNF03 | Segurança               | O sistema não deve armazenar dados pessoais encontrados nos sites analisados.                                                                           | Segurança          |
| RNF04 | Privacidade             | O sistema deve analisar apenas informações publicamente acessíveis, sem realizar autenticação ou acesso a áreas restritas.                              | Privacidade        |
| RNF05 | Acessibilidade          | A interface deve seguir as diretrizes WCAG 2.1 nível AA, garantindo acessibilidade para pessoas com deficiência.                                       | Acessibilidade     |
| RNF06 | Manutenibilidade        | O código deve ser organizado em módulos independentes, facilitando a manutenção e evolução dos analisadores.                                            | Manutenibilidade   |
| RNF07 | Testabilidade           | Os módulos de análise devem ser testáveis de forma isolada, com cobertura mínima de 80% para lógica de análise e pontuação.                             | Testabilidade      |
| RNF08 | Clareza educacional     | Todos os textos do relatório devem ser escritos em linguagem acessível, evitando jargão jurídico sem explicação.                                        | Clareza            |
| RNF09 | Responsividade          | A interface deve funcionar adequadamente em dispositivos desktop e móveis.                                                                             | Usabilidade        |
| RNF10 | Confiabilidade          | O sistema deve tratar gracefully falhas de conexão, sites indisponíveis e URLs inválidas, exibindo mensagens claras ao usuário.                         | Confiabilidade     |
| RNF11 | Escalabilidade          | A arquitetura deve permitir a adição de novos critérios de análise sem alteração significativa da estrutura existente.                                   | Arquitetura        |
| RNF12 | Transparência           | O sistema deve informar claramente suas limitações e o caráter educativo da análise em todos os pontos de contato com o usuário.                        | Transparência      |

---

## 6. Regras de Negócio

| ID   | Regra de Negócio                                                                                                                                                          |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RN01 | A ferramenta deve analisar apenas informações publicamente acessíveis na URL informada, sem realizar autenticação ou acesso a áreas restritas.                            |
| RN02 | A ferramenta não deve armazenar dados pessoais encontrados nos sites analisados. Apenas metadados da análise (URL, data, pontuação, findings) são persistidos.            |
| RN03 | O relatório gerado deve ter caráter exclusivamente educativo, utilizando linguagem acessível e didática.                                                                   |
| RN04 | O sistema deve informar suas limitações de forma clara e visível na interface, especialmente na tela de relatório.                                                         |
| RN05 | A pontuação gerada não representa certificação jurídica, conformidade legal definitiva ou parecer técnico especializado.                                                   |
| RN06 | Cada finding do relatório deve estar vinculado a pelo menos um princípio, direito ou tema da LGPD.                                                                         |
| RN07 | O sistema deve exibir aviso legal permanente informando que a ferramenta não substitui análise jurídica profissional.                                                      |
| RN08 | A análise de cookies deve considerar apenas cookies visíveis na resposta HTTP e no DOM da página, sem tentar acessar cookies de HttpOnly indevidamente.                    |
| RN09 | A classificação de cookies por tipo deve ser baseada em heurísticas (nome, domínio, finalidade conhecida) e claramente rotulada como aproximação educativa.                |
| RN10 | O sistema deve limitar a frequência de análises por usuário para evitar sobrecarga e uso indevido (rate limiting).                                                         |
| RN11 | URLs inválidas, sites indisponíveis ou que bloqueiem acesso automatizado devem gerar mensagem de erro clara, sem expor detalhes técnicos sensíveis.                       |
| RN12 | O glossário deve ser mantido pelo administrador do sistema e estar disponível para todos os usuários sem necessidade de cadastro.                                         |

---

## 7. Critérios de Análise LGPD/ANPD

### 7.1 Política de Privacidade

| ID    | O que será verificado                                         | Evidência esperada no site                                                               | Risco caso ausente       | Explicação educativa                                                                                                                                      | Sugestão de melhoria                                                                                     |
| ----- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| C01   | Existência de política de privacidade                         | Link ou página acessível contendo política ou aviso de privacidade                       | Alto                     | A LGPD exige transparência no tratamento de dados. A ausência de política impede que o titular saiba como seus dados são usados.                          | Criar e publicar uma política de privacidade acessível a partir de qualquer página do site.              |
| C02   | Menção aos dados coletados                                    | Lista ou descrição dos tipos de dados pessoais coletados                                 | Alto                     | O princípio da transparência (Art. 6º, VI, LGPD) exige que o titular saiba quais dados são coletados.                                                     | Listar claramente todos os dados pessoais coletados (nome, e-mail, CPF, etc.).                          |
| C03   | Menção à finalidade                                           | Explicação clara do motivo da coleta de cada dado ou categoria                           | Alto                     | O princípio da finalidade (Art. 6º, I, LGPD) determina que os dados sejam coletados para propósitos legítimos e específicos.                               | Descrever a finalidade de cada dado coletado de forma específica e compreensível.                       |
| C04   | Menção ao tempo de armazenamento                              | Informação sobre por quanto tempo os dados serão mantidos                                | Médio                    | O princípio da necessidade (Art. 6º, III, LGPD) implica que dados não devem ser mantidos além do necessário.                                              | Informar o prazo de retenção ou os critérios usados para defini-lo.                                     |
| C05   | Menção ao compartilhamento de dados                           | Informação sobre terceiros com quem os dados são compartilhados                          | Alto                     | O titular tem direito de saber com quem seus dados são compartilhados (Art. 9º, LGPD).                                                                    | Listar categorias de terceiros e finalidades do compartilhamento.                                       |
| C06   | Menção a bases legais                                         | Referências a consentimento, execução de contrato, obrigação legal, legítimo interesse    | Médio                    | Toda operação de tratamento deve ter uma base legal válida (Art. 7º, LGPD).                                                                               | Indicar quais bases legais fundamentam cada operação de tratamento.                                     |
| C07   | Identificação do controlador                                  | Nome da empresa, razão social, CNPJ ou identificação equivalente                         | Alto                     | O titular precisa saber quem é o responsável pelo tratamento de seus dados (Art. 6º, VII, LGPD).                                                          | Incluir identificação completa do controlador na política.                                              |
| C08   | Canal de contato / Encarregado (DPO)                          | E-mail, formulário ou outro canal para contato sobre privacidade                         | Alto                     | A LGPD garante ao titular o direito de obter informações sobre o tratamento mediante solicitação (Art. 9º, LGPD).                                         | Disponibilizar canal de contato claro, preferencialmente com indicação de encarregado/DPO.              |

### 7.2 Cookies

| ID    | O que será verificado                                         | Evidência esperada no site                                                               | Risco caso ausente       | Explicação educativa                                                                                                                                      | Sugestão de melhoria                                                                                     |
| ----- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| C09   | Existência de banner de cookies                               | Elemento visual (banner, modal ou overlay) informando sobre uso de cookies               | Alto                     | Cookies que não são estritamente necessários exigem consentimento prévio do titular (Art. 7º, LGPD).                                                      | Implementar banner de cookies visível na primeira visita.                                                |
| C10   | Botão de aceitar cookies                                      | Botão ou mecanismo que permite ao titular consentir com o uso de cookies                 | Alto                     | O consentimento deve ser livre, informado e inequívoco (Art. 8º, LGPD).                                                                                   | Incluir botão claro de "Aceitar" no banner.                                                              |
| C11   | Botão de recusar cookies                                      | Botão ou mecanismo que permite ao titular rejeitar cookies não essenciais                | Alto                     | A LGPD garante ao titular o direito de revogar o consentimento a qualquer momento (Art. 8º, §5º, LGPD). Recusar deve ser tão fácil quanto aceitar.        | Incluir botão claro de "Recusar" ou "Recusar não essenciais" no banner.                                 |
| C12   | Opção de gerenciar preferências                               | Mecanismo que permite escolher categorias de cookies individualmente                     | Médio                    | O consentimento deve ser informado e específico. O titular deve poder escolher quais categorias aceita.                                                   | Oferecer painel de preferências com categorias de cookies separadas.                                     |
| C13   | Link para política de cookies/privacidade                     | Link acessível no banner que direciona à política completa                               | Médio                    | O titular deve ter acesso fácil a informações completas sobre o uso de cookies e dados.                                                                   | Incluir link visível para a política de privacidade ou cookies no banner.                                |
| C14   | Cookies não necessários antes de consentimento                | Ausência de cookies de marketing/rastreamento antes do consentimento                     | Alto                     | Carregar cookies não essenciais antes do consentimento viola o princípio do consentimento prévio (Art. 7º, LGPD).                                         | Garantir que cookies não essenciais só sejam carregados após consentimento explícito.                    |

### 7.3 Formulários

| ID    | O que será verificado                                         | Evidência esperada no site                                                               | Risco caso ausente       | Explicação educativa                                                                                                                                      | Sugestão de melhoria                                                                                     |
| ----- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| C15   | Identificação de campos de dados pessoais                     | Formulários com campos como nome, e-mail, telefone, CPF, endereço                        | Informativo            | O sistema identifica quais dados pessoais estão sendo coletados para awareness do proprietário do site.                                                   | Revisar se todos os campos são realmente necessários para a finalidade do formulário.                    |
| C16   | Minimização de dados                                          | Ausência de campos desnecessários para a finalidade declarada                            | Médio                    | O princípio da necessidade/minimização (Art. 6º, III, LGPD) limita a coleta ao mínimo necessário para a finalidade.                                       | Remover campos que não são estritamente necessários para a finalidade do formulário.                     |
| C17   | Detecção de dados sensíveis                                   | Ausência de campos relacionados a saúde, biometria, religião, opinião política, raça     | Alto                     | Dados sensíveis merecem proteção especial (Art. 5º, II e Art. 11, LGPD) e só podem ser coletados em situações específicas.                                | Evitar coletar dados sensíveis a menos que haja base legal específica e justificativa clara.             |
| C18   | Aviso de privacidade no formulário                            | Texto próximo ao formulário explicando uso dos dados coletados                           | Médio                    | O titular deve ser informado sobre o tratamento de seus dados no momento da coleta (Art. 9º, LGPD).                                                       | Adicionar texto breve próximo ao formulário explicando finalidade e base legal da coleta.                |

### 7.4 Direitos do Titular

| ID    | O que será verificado                                         | Evidência esperada no site                                                               | Risco caso ausente       | Explicação educativa                                                                                                                                      | Sugestão de melhoria                                                                                     |
| ----- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| C19   | Direito de acesso                                             | Menção ao direito de solicitar confirmação e acesso aos dados                            | Médio                    | O titular pode solicitar a qualquer momento a confirmação da existência de tratamento e acesso aos seus dados (Art. 18, I e II, LGPD).                    | Incluir na política descrição clara do direito de acesso e como exercê-lo.                               |
| C20   | Direito de correção                                           | Menção ao direito de solicitar correção de dados incompletos ou incorretos               | Médio                    | O titular pode pedir a correção de dados inexatos (Art. 18, III, LGPD).                                                                                   | Descrever na política como o titular pode solicitar correção.                                            |
| C21   | Direito de exclusão                                           | Menção ao direito de solicitar exclusão de dados                                         | Alto                     | O titular pode pedir a eliminação de dados tratados com consentimento (Art. 18, V, LGPD).                                                                 | Incluir na política informação sobre como solicitar exclusão de dados.                                   |
| C22   | Direito de portabilidade                                      | Menção ao direito de solicitar portabilidade dos dados                                   | Médio                    | O titular pode pedir a portabilidade a outro fornecedor (Art. 18, V, LGPD).                                                                               | Descrever na política o direito de portabilidade e como solicitá-lo.                                     |
| C23   | Direito de revogação do consentimento                         | Menção ao direito de revogar o consentimento a qualquer momento                          | Alto                     | O consentimento pode ser revogado a qualquer momento (Art. 8º, §5º, LGPD).                                                                                | Incluir na política informação clara sobre como revogar o consentimento.                                 |
| C24   | Direito de informação sobre compartilhamento                  | Menção ao direito de saber com quem os dados são compartilhados                          | Médio                    | O titular pode solicitar informações sobre compartilhamento com terceiros (Art. 18, VII, LGPD).                                                           | Descrever na política as informações sobre compartilhamento e como obtê-las.                             |

### 7.5 Controlador e Contato

| ID    | O que será verificado                                         | Evidência esperada no site                                                               | Risco caso ausente       | Explicação educativa                                                                                                                                      | Sugestão de melhoria                                                                                     |
| ----- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| C25   | Identificação do controlador                                  | Nome/razão social, CNPJ ou identificação equivalente                                     | Alto                     | O controlador é a pessoa responsável pelo tratamento de dados. O titular precisa saber quem é (Art. 5º, VI, LGPD).                                        | Incluir identificação completa do controlador na política.                                               |
| C26   | Canal de contato para privacidade                             | E-mail, formulário ou outro canal dedicado a questões de privacidade                     | Alto                     | É essencial que o titular tenha um canal claro para exercer seus direitos e tirar dúvidas (Art. 9º, LGPD).                                                | Disponibilizar e-mail ou formulário de contato dedicado a privacidade.                                   |
| C27   | Indicação de encarregado (DPO)                                | Nome ou contato do encarregado pelo tratamento de dados                                  | Médio                    | A ANPD pode determinar a nomeação de um encarregado. Mesmo sem obrigatoriedade universal, a indicação é boa prática.                                      | Indicar o encarregado/DPO com canal de contato direto.                                                    |

### 7.6 Segurança Básica

| ID    | O que será verificado                                         | Evidência esperada no site                                                               | Risco caso ausente       | Explicação educativa                                                                                                                                      | Sugestão de melhoria                                                                                     |
| ----- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| C28   | Uso de HTTPS                                                  | Certificado SSL/TLS válido e ativo                                                       | Alto                     | O princípio da segurança (Art. 46, LGPD) exige medidas para proteger dados de acessos não autorizados. HTTPS é o mínimo esperado.                         | Instalar certificado SSL/TLS e garantir que todas as páginas usem HTTPS.                                 |
| C29   | Formulários em páginas seguras                                | Formulários presentes apenas em páginas servidas via HTTPS                               | Alto                     | Formulários que coletam dados pessoais devem estar em páginas seguras para evitar interceptação.                                                           | Migrar todas as páginas com formulários para HTTPS.                                                        |
| C30   | Ausência de dados sensíveis expostos                          | Nenhum dado sensível visível no código-fonte ou conteúdo público                         | Alto                     | Dados sensíveis expostos publicamente representam risco significativo de violação e incidente de segurança.                                                | Nunca expor dados sensíveis no HTML, JavaScript ou conteúdo público.                                     |
| C31   | Scripts externos relevantes                                   | Lista de scripts de terceiros carregados pela página                                     | Informativo            | Scripts de terceiros podem coletar dados dos visitantes. É importante conhecer quais estão presentes no site.                                              | Revisar periodicamente os scripts de terceiros e remover os desnecessários.                              |

### 7.7 Linguagem Clara

| ID    | O que será verificado                                         | Evidência esperada no site                                                               | Risco caso ausente       | Explicação educativa                                                                                                                                      | Sugestão de melhoria                                                                                     |
| ----- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| C32   | Ausência de termos excessivamente genéricos                   | Política com descrições específicas em vez de frases vagas                               | Médio                    | Frases como "usamos dados para melhorar sua experiência" sem detalhamento violam o princípio de transparência e dificultam o entendimento do titular.      | Substituir termos genéricos por descrições específicas de dados, finalidades e procedimentos.             |
| C33   | Clareza e acessibilidade do texto                             | Política escrita em linguagem compreensível para o público geral                         | Médio                    | A LGPD exige que informações ao titular sejam claras e acessíveis (Art. 9º, §1º, LGPD). Política excessivamente técnica dificulta o exercício de direitos. | Revisar a política para usar linguagem simples, direta e acessível ao público geral.                      |

---

## 8. Modelo de Pontuação e Classificação de Risco

### 8.1 Sistema de Pontuação

A pontuação total do site é calculada com base em critérios agrupados por categoria, com pesos diferenciados conforme a relevância de cada categoria para a proteção de dados.

**Distribuição de pesos por categoria:**

| Categoria                | Peso  | Quantidade de Critérios | Pontuação Máxima da Categoria |
| ------------------------ | ----- | ----------------------- | ------------------------------- |
| Política de Privacidade  | 30%   | 8 (C01 a C08)           | 30 pontos                       |
| Cookies                  | 25%   | 6 (C09 a C14)           | 25 pontos                       |
| Formulários              | 15%   | 4 (C15 a C18)           | 15 pontos                       |
| Direitos do Titular      | 15%   | 6 (C19 a C24)           | 15 pontos                       |
| Controlador e Contato    | 10%   | 3 (C25 a C27)           | 10 pontos                       |
| Segurança Básica         | 5%    | 4 (C28 a C31)           | 5 pontos                        |
| **Total**                | 100%  | 33                      | **100 pontos**                  |

### 8.2 Cálculo por Critério

Dentro de cada categoria, os critérios são distribuídos uniformemente. Por exemplo, na categoria Política de Privacidade (30 pontos, 8 critérios), cada critério vale aproximadamente 3,75 pontos.

Cada critério pode receber:
- **Pontuação total**: Evidência completa encontrada.
- **Pontuação parcial**: Evidência parcial ou incompleta.
- **Zero pontos**: Evidência ausente ou insuficiente.

### 8.3 Classificação de Risco

| Faixa de Pontuação | Classificação              | Cor Indicativa | Significado                                                                                          |
| ------------------ | -------------------------- | -------------- | ---------------------------------------------------------------------------------------------------- |
| 0 a 39             | Risco Alto                 | Vermelho       | O site apresenta graves lacunas em relação a práticas básicas de proteção de dados.                  |
| 40 a 69            | Risco Médio                | Amarelo        | O site possui alguns elementos de proteção, mas há gaps significativos que precisam de atenção.       |
| 70 a 89            | Risco Baixo                | Verde claro    | O site demonstra boas práticas em grande parte dos critérios, com melhorias pontuais recomendadas.    |
| 90 a 100           | Boas Práticas Aparentes    | Verde          | O site atende à maioria dos critérios educacionais avaliados, embora revisão profissional seja recomendada. |

### 8.4 Aviso sobre a Pontuação

> **IMPORTANTE**: A pontuação e a classificação de risco são meramente educativas e baseadas em critérios automatizados de análise de elementos públicos. Elas **não** representam conformidade legal definitiva, certificação, auditoria ou parecer jurídico. Um site com pontuação alta pode ainda apresentar problemas não detectados pela análise automatizada. Para avaliação completa de conformidade, consulte um profissional especializado.

---

## 9. Casos de Uso

### CU01 — Inserir URL para Análise

| Campo                | Descrição                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| **Ator principal**   | Usuário comum, pequena empresa, estudante, desenvolvedor                                               |
| **Pré-condições**    | O usuário acessou a aplicação e está na tela inicial.                                                  |
| **Fluxo principal**  | 1. O usuário acessa a tela inicial. 2. O sistema exibe o campo de inserção de URL. 3. O usuário digita ou cola a URL do site desejado. 4. O usuário clica em "Analisar". 5. O sistema valida a URL. 6. O sistema inicia o processo de análise. |
| **Fluxos alternativos** | 5a. URL inválida: o sistema exibe mensagem de erro e solicita correção. 5b. URL vazia: o sistema exibe mensagem indicando que o campo é obrigatório. |
| **Pós-condições**    | A análise é iniciada e o usuário é redirecionado para a tela de carregamento.                          |

### CU02 — Executar Scanner Automatizado

| Campo                | Descrição                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| **Ator principal**   | Sistema (desencadeado pelo usuário)                                                                    |
| **Pré-condições**    | URL válida foi informada e validada.                                                                   |
| **Fluxo principal**  | 1. O sistema acessa a URL informada. 2. O sistema coleta o conteúdo HTML da página principal. 3. O sistema busca links para política de privacidade. 4. O sistema analisa cookies presentes. 5. O sistema identifica e analisa formulários. 6. O sistema verifica indicadores de segurança. 7. O sistema calcula a pontuação. 8. O sistema gera o relatório. |
| **Fluxos alternativos** | 1a. Site indisponível: o sistema exibe mensagem de erro. 1b. Site bloqueia acesso automatizado: o sistema informa a limitação. 3a. Política de privacidade não encontrada: o sistema registra ausência e segue para demais análises. |
| **Pós-condições**    | O relatório completo está disponível para visualização.                                                |

### CU03 — Visualizar Relatório

| Campo                | Descrição                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| **Ator principal**   | Usuário comum, pequena empresa, estudante, desenvolvedor                                               |
| **Pré-condições**    | A análise foi concluída com sucesso.                                                                   |
| **Fluxo principal**  | 1. O sistema exibe a tela de relatório. 2. O usuário visualiza a pontuação geral e o nível de risco. 3. O usuário visualiza as categorias de análise. 4. O usuário visualiza findings, explicações e recomendações. 5. O usuário pode navegar para detalhes de cada categoria. |
| **Fluxos alternativos** | 5a. O usuário clica em uma categoria para ver detalhes. 5b. O usuário consulta o glossário para entender termos. |
| **Pós-condições**    | O usuário compreendeu o diagnóstico educativo do site analisado.                                       |

### CU04 — Consultar Glossário LGPD

| Campo                | Descrição                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| **Ator principal**   | Usuário comum, estudante, desenvolvedor                                                                |
| **Pré-condições**    | O usuário acessou a aplicação.                                                                         |
| **Fluxo principal**  | 1. O usuário navega até a tela de glossário. 2. O sistema exibe a lista de termos da LGPD. 3. O usuário pode buscar um termo específico. 4. O sistema exibe a definição do termo selecionado. |
| **Fluxos alternativos** | 3a. Nenhum termo encontrado: o sistema informa que não há resultados para a busca.                   |
| **Pós-condições**    | O usuário compreendeu o significado do termo consultado.                                               |

### CU05 — Visualizar Recomendações Educativas

| Campo                | Descrição                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| **Ator principal**   | Pequena empresa, desenvolvedor                                                                         |
| **Pré-condições**    | O relatório foi gerado e contém findings com recomendações.                                            |
| **Fluxo principal**  | 1. O usuário acessa a seção de recomendações no relatório. 2. O sistema exibe lista de recomendações ordenadas por prioridade. 3. Para cada recomendação, o sistema apresenta: o que foi encontrado, por que importa, relação com a LGPD e como melhorar. 4. O usuário pode expandir cada recomendação para mais detalhes. |
| **Fluxos alternativos** | 2a. Sem findings: o sistema informa que nenhuma melhoria crítica foi identificada.                   |
| **Pós-condições**    | O usuário compreendeu as melhorias recomendadas e como implementá-las.                                 |

### CU06 — Exportar Relatório

| Campo                | Descrição                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| **Ator principal**   | Pequena empresa, estudante, desenvolvedor                                                              |
| **Pré-condições**    | O relatório foi gerado com sucesso.                                                                    |
| **Fluxo principal**  | 1. O usuário clica em "Exportar relatório". 2. O sistema gera o arquivo para download. 3. O download é iniciado automaticamente. |
| **Fluxos alternativos** | 2a. Erro na geração: o sistema exibe mensagem de erro e sugere tentar novamente.                     |
| **Pós-condições**    | O usuário possui uma cópia local do relatório.                                                         |

### CU07 — Consultar Histórico de Análises

| Campo                | Descrição                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| **Ator principal**   | Usuário comum                                                                                          |
| **Pré-condições**    | O usuário realizou ao menos uma análise anteriormente.                                                 |
| **Fluxo principal**  | 1. O usuário acessa a tela de histórico. 2. O sistema exibe lista de análises anteriores com URL, data e pontuação. 3. O usuário pode clicar em uma análise para visualizar o relatório completo. |
| **Fluxos alternativos** | 1a. Sem análises anteriores: o sistema informa que não há histórico e sugere realizar uma análise.   |
| **Pós-condições**    | O usuário visualizou análises anteriores ou iniciou nova análise.                                      |

---

## 10. Histórias de Usuário

### HU01 — Análise Básica de Site

**Como** proprietário de pequena empresa, **quero** informar a URL do meu site e receber um relatório com pontuação e nível de risco, **para** entender rapidamente quais aspectos relacionados à LGPD precisam de atenção.

**Critérios de Aceitação**:
- O sistema aceita uma URL válida e inicia a análise em até 5 segundos.
- O relatório exibe pontuação numérica (0-100) e classificação de risco (alto, médio, baixo, boas práticas).
- O relatório é gerado em no máximo 60 segundos.

### HU02 — Diagnóstico de Política de Privacidade

**Como** desenvolvedor, **quero** receber um diagnóstico detalhado da política de privacidade do site analisado, **para** saber quais elementos estão presentes e quais estão faltando.

**Critérios de Aceitação**:
- O relatório lista cada critério avaliado na política (dados coletados, finalidade, armazenamento, compartilhamento, bases legais, direitos do titular, controlador, contato).
- Cada critério é classificado como encontrado, parcial ou ausente.
- Para critérios ausentes ou parciais, o relatório apresenta recomendação educativa.

### HU03 — Análise de Cookies

**Como** estudante de tecnologia, **quero** visualizar os cookies detectados no site com suas classificações, **para** aprender sobre os diferentes tipos de cookies e seus riscos.

**Critérios de Aceitação**:
- O relatório lista cookies encontrados com nome, domínio, tipo e classificação.
- Cookies não necessários carregados antes de consentimento são destacados com alerta.
- O relatório inclui simulação didática de gerenciador de preferências.

### HU04 — Análise de Formulários

**Como** desenvolvedor, **quero** saber quais dados pessoais e sensíveis os formulários do site coletam, **para** avaliar se a coleta está alinhada com o princípio da minimização.

**Critérios de Aceitação**:
- O relatório lista formulários encontrados e seus campos.
- Campos de dados sensíveis são destacados com alerta.
- Campos possivelmente desnecessários são sinalizados com explicação educativa.

### HU05 — Consulta ao Glossário

**Como** estudante, **quero** acessar um glossário com termos da LGPD, **para** entender os conceitos utilizados no relatório.

**Critérios de Aceitação**:
- O glossário contém ao menos 10 termos com definições claras.
- O usuário pode buscar termos por nome.
- As definições são escritas em linguagem acessível.

### HU06 — Acompanhamento de Melhorias

**Como** proprietário de pequena empresa, **quero** visualizar as recomendações de melhoria priorizadas, **para** saber por onde começar a adequação do meu site.

**Critérios de Aceitação**:
- As recomendações são ordenadas por prioridade (risco alto primeiro).
- Cada recomendação contém: o que foi encontrado, por que importa, relação com a LGPD e como melhorar.
- O usuário pode exportar o relatório para consulta offline.

### HU07 — Histórico de Análises

**Como** desenvolvedor, **quero** consultar o histórico de análises realizadas, **para** acompanhar a evolução da adequação do site ao longo do tempo.

**Critérios de Aceitação**:
- O histórico exibe URL, data e pontuação de cada análise.
- O usuário pode acessar o relatório completo de análises anteriores.

---

## 11. Telas do Sistema

### 11.1 Tela Inicial

| Aspecto          | Descrição                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------ |
| **Objetivo**     | Apresentar a ferramenta e permitir que o usuário inicie uma análise.                                   |
| **Elementos**    | Logo/nome da ferramenta, descrição breve, campo de inserção de URL, botão "Analisar", aviso legal, link para glossário, link para histórico. |
| **Ações**        | Inserir URL, iniciar análise, navegar para glossário, navegar para histórico.                          |
| **Feedback**     | Mensagem de erro para URL inválida ou vazia.                                                           |
| **Usabilidade**  | Layout limpo e objetivo. Campo de URL em destaque. Aviso legal visível mas não intrusivo.              |
| **Acessibilidade** | Labels adequados, contraste WCAG AA, navegação por teclado.                                          |

### 11.2 Tela de Inserção da URL

| Aspecto          | Descrição                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------ |
| **Objetivo**     | Capturar a URL do site a ser analisado com validação imediata.                                         |
| **Elementos**    | Campo de texto para URL, botão "Analisar", validação visual (borda verde/vermelha), texto de ajuda com formato esperado. |
| **Ações**        | Digitar/colar URL, submeter para análise.                                                              |
| **Feedback**     | Validação em tempo real do formato da URL. Mensagem de erro clara para URL inválida.                   |
| **Usabilidade**  | Auto-focus no campo de URL. Suporte a colar com Ctrl+V. Placeholder com exemplo de URL.               |
| **Acessibilidade** | Campo com label descritiva, mensagem de erro associada via aria-describedby.                         |

### 11.3 Tela de Carregamento/Análise

| Aspecto          | Descrição                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------ |
| **Objetivo**     | Informar ao usuário que a análise está em andamento e exibir progresso.                                |
| **Elementos**    | Barra de progresso ou indicador de loading, texto descritivo da etapa atual (ex: "Analisando política de privacidade...", "Detectando cookies...", "Verificando formulários..."), URL sendo analisada. |
| **Ações**        | Aguardar conclusão.                                                                                    |
| **Feedback**     | Progresso visual atualizado em tempo real. Mensagem de erro se a análise falhar.                       |
| **Usabilidade**  | Indicação clara de que o processo pode levar até 60 segundos. Opção de cancelar (se aplicável).       |
| **Acessibilidade** | Loading com aria-live para leitores de tela.                                                        |

### 11.4 Tela de Relatório

| Aspecto          | Descrição                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------ |
| **Objetivo**     | Apresentar o diagnóstico completo do site analisado de forma didática e visual.                        |
| **Elementos**    | Pontuação geral (0-100) com indicador visual (gauge ou barra), classificação de risco com cor, resumo por categoria (ícones verde/amarelo/vermelho), lista de findings com status (encontrado/ausente), botão "Exportar", aviso legal, link para detalhes por categoria. |
| **Ações**        | Visualizar resumo, navegar para detalhes de categoria, exportar relatório, voltar para tela inicial.   |
| **Feedback**     | Mensagem de sucesso ao gerar relatório.                                                                |
| **Usabilidade**  | Layout em seções claras. Pontuação em destaque. Cores indicativas de risco. Aviso legal no rodapé.    |
| **Acessibilidade** | Cores não são o único indicador de status (ícones e texto também). Contraste WCAG AA.               |

### 11.5 Tela de Detalhes por Categoria

| Aspecto          | Descrição                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------ |
| **Objetivo**     | Exibir informações detalhadas sobre uma categoria específica de análise.                               |
| **Elementos**    | Nome da categoria, pontuação da categoria, lista de critérios avaliados com status, explicações educativas para cada critério, recomendações de melhoria específicas, links para termos do glossário relacionados. |
| **Ações**        | Visualizar detalhes, consultar glossário, voltar para relatório.                                       |
| **Feedback**     | Navegação clara entre categorias.                                                                      |
| **Usabilidade**  | Cada critério expansível para mais detalhes. Hierarquia visual clara.                                 |
| **Acessibilidade** | Conteúdo expansível com aria-expanded. Navegação por teclado.                                       |

### 11.6 Tela de Glossário

| Aspecto          | Descrição                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------ |
| **Objetivo**     | Disponibilizar definições de termos relevantes da LGPD de forma acessível.                             |
| **Elementos**    | Campo de busca, lista alfabética de termos, definição de cada termo, links cruzados entre termos relacionados. |
| **Ações**        | Buscar termo, selecionar termo para ver definição, navegar entre termos.                               |
| **Feedback**     | Mensagem quando nenhum termo é encontrado na busca.                                                    |
| **Usabilidade**  | Lista organizada alfabeticamente. Definições em linguagem simples.                                    |
| **Acessibilidade** | Busca com aria-label. Resultados atualizados com aria-live.                                         |

### 11.7 Tela de Histórico de Análises

| Aspecto          | Descrição                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------ |
| **Objetivo**     | Exibir registro de análises realizadas anteriormente.                                                  |
| **Elementos**    | Lista de análises com URL, data/hora, pontuação e classificação de risco, botão para acessar relatório completo, opção de ordenação por data ou pontuação. |
| **Ações**        | Visualizar análise anterior, ordenar lista, voltar para tela inicial.                                  |
| **Feedback**     | Mensagem quando não há análises no histórico.                                                          |
| **Usabilidade**  | Lista com paginação ou scroll infinito. Indicadores visuais de pontuação.                              |
| **Acessibilidade** | Tabela com headers adequados. Navegação por teclado.                                                |

---

## 12. Arquitetura Proposta

### 12.1 Visão Geral

A arquitetura do protótipo segue um modelo cliente-servidor com separação clara entre frontend, backend, banco de dados e módulos de análise.

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Vue.js)                        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │  Views   │ │Components│ │  Stores  │ │ Services │          │
│  │  (Pages) │ │ (shadcn) │ │ (Pinia)  │ │ (Axios)  │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
└───────────────────────────┬─────────────────────────────────────┘
                            │ HTTP/REST (JSON)
┌───────────────────────────┴─────────────────────────────────────┐
│                     BACKEND (Node.js/Express)                    │
│  ┌────────────┐  ┌──────────────────────────────────────┐      │
│  │ Controllers│  │        Módulos de Análise             │      │
│  │  (Routes)  │  │  ┌───────────────────────────────┐   │      │
│  ├────────────┤  │  │     URL Scanner               │   │      │
│  │  Services  │──│  │     Privacy Policy Analyzer    │   │      │
│  ├────────────┤  │  │     Cookie Analyzer            │   │      │
│  │ Validators │  │  │     Form Analyzer              │   │      │
│  │   (Zod)    │  │  │     Risk Scoring Engine        │   │      │
│  ├────────────┤  │  │     Report Generator           │   │      │
│  │Repositories│  │  │     Glossary Module             │   │      │
│  │  (Prisma)  │  │  └───────────────────────────────┘   │      │
│  └────────────┘  └──────────────────────────────────────┘      │
└───────────────────────────┬─────────────────────────────────────┘
                            │ Prisma ORM
┌───────────────────────────┴─────────────────────────────────────┐
│                    BANCO DE DADOS (PostgreSQL)                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │  Scans   │  │ Findings │ │Criteria  │  │Glossary  │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

### 12.2 Módulos de Análise

| Módulo                    | Responsabilidade                                                                                          |
| ------------------------- | --------------------------------------------------------------------------------------------------------- |
| **URL Scanner**           | Acessa a URL informada, coleta HTML, identifica links internos e pontos de entrada para demais análises.  |
| **Privacy Policy Analyzer** | Localiza e analisa a política de privacidade, verificando presença de elementos obrigatórios e qualidade da linguagem. |
| **Cookie Analyzer**       | Detecta cookies, classifica por tipo, verifica banner de consentimento e mecanismos de gerenciamento.     |
| **Form Analyzer**         | Identifica formulários, classifica campos de dados pessoais e sensíveis, avalia minimização.              |
| **Risk Scoring Engine**   | Calcula pontuação por critério, categoria e total. Classifica o nível de risco.                           |
| **Report Generator**      | Compila resultados de todos os analisadores em relatório estruturado com recomendações educativas.        |
| **Glossary Module**       | Fornece definições de termos da LGPD para contextualização no relatório.                                  |

### 12.3 Fluxo de Dados

1. O frontend envia a URL via API REST para o backend.
2. O backend valida a entrada (Zod) e cria um registro de análise.
3. O URL Scanner acessa a página e coleta o HTML.
4. Os módulos de análise (Privacy Policy, Cookie, Form) processam o conteúdo em paralelo.
5. O Risk Scoring Engine consolida os resultados e calcula a pontuação.
6. O Report Generator produz o relatório estruturado.
7. Os resultados são persistidos no banco de dados via Prisma.
8. O frontend recebe o relatório via API e o exibe ao usuário.

---

## 13. Estrutura Sugerida do Backend

```
server/
├── src/
│   ├── controllers/
│   │   ├── scan.controller.ts
│   │   ├── report.controller.ts
│   │   ├── glossary.controller.ts
│   │   └── criterion.controller.ts
│   ├── services/
│   │   ├── scan.service.ts
│   │   ├── report.service.ts
│   │   └── glossary.service.ts
│   ├── scanners/
│   │   ├── url-scanner.ts
│   │   ├── privacy-policy-analyzer.ts
│   │   ├── cookie-analyzer.ts
│   │   ├── form-analyzer.ts
│   │   ├── risk-scoring-engine.ts
│   │   └── report-generator.ts
│   ├── repositories/
│   │   ├── scan.repository.ts
│   │   ├── finding.repository.ts
│   │   └── glossary.repository.ts
│   ├── dto/
│   │   ├── scan.dto.ts
│   │   ├── report.dto.ts
│   │   └── finding.dto.ts
│   ├── validators/
│   │   ├── scan.validator.ts
│   │   └── url.validator.ts
│   ├── routes/
│   │   ├── scan.routes.ts
│   │   ├── report.routes.ts
│   │   ├── glossary.routes.ts
│   │   └── criterion.routes.ts
│   ├── config/
│   │   ├── database.ts
│   │   └── app.ts
│   ├── utils/
│   │   ├── http-client.ts
│   │   ├── html-parser.ts
│   │   └── text-analyzer.ts
│   └── app.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── tests/
│   ├── unit/
│   │   ├── scanners/
│   │   ├── services/
│   │   └── validators/
│   └── integration/
│       ├── scan.integration.test.ts
│       └── report.integration.test.ts
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

---

## 14. Estrutura Sugerida do Frontend

```
web/
├── src/
│   ├── views/
│   │   ├── HomeView.vue
│   │   ├── ScanView.vue
│   │   ├── ReportView.vue
│   │   ├── CategoryDetailView.vue
│   │   ├── GlossaryView.vue
│   │   └── HistoryView.vue
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppHeader.vue
│   │   │   ├── AppFooter.vue
│   │   │   └── LegalDisclaimer.vue
│   │   ├── scan/
│   │   │   ├── UrlInput.vue
│   │   │   └── ScanProgress.vue
│   │   ├── report/
│   │   │   ├── ScoreGauge.vue
│   │   │   ├── RiskBadge.vue
│   │   │   ├── CategorySummary.vue
│   │   │   ├── FindingCard.vue
│   │   │   ├── RecommendationList.vue
│   │   │   └── CookiePreferenceSimulation.vue
│   │   └── glossary/
│   │       ├── GlossarySearch.vue
│   │       └── GlossaryTerm.vue
│   ├── stores/
│   │   ├── scan.store.ts
│   │   ├── report.store.ts
│   │   └── glossary.store.ts
│   ├── services/
│   │   ├── api.ts
│   │   ├── scan.service.ts
│   │   ├── report.service.ts
│   │   └── glossary.service.ts
│   ├── composables/
│   │   ├── useScan.ts
│   │   └── useReport.ts
│   ├── router/
│   │   └── index.ts
│   ├── types/
│   │   ├── scan.types.ts
│   │   ├── report.types.ts
│   │   └── glossary.types.ts
│   ├── App.vue
│   └── main.ts
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 15. Modelo de Dados Inicial

### 15.1 Entidades e Relacionamentos

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│    Scan     │──1:N──│ ScanResult  │──1:N──│   Finding   │
└─────────────┘       └─────────────┘       └─────────────┘
                            │                       │
                            │                       │ 1:N
                            │                       ▼
                            │               ┌───────────────┐
                            │               │ Recommendation│
                            │               └───────────────┘
                            │
                            ▼
                     ┌─────────────┐
                     │  Criterion  │
                     └─────────────┘

┌───────────────┐
│ GlossaryTerm  │
└───────────────┘
```

### 15.2 Descrição das Entidades

#### Scan (Análise)

| Campo          | Tipo      | Descrição                                        |
| -------------- | --------- | ----------------------------------------------- |
| id             | UUID      | Identificador único da análise                  |
| url            | String    | URL do site analisado                           |
| status         | Enum      | Status: pending, running, completed, failed     |
| score          | Float     | Pontuação geral (0-100)                         |
| riskLevel      | Enum      | Nivel de risco: high, medium, low, good         |
| startedAt      | DateTime  | Data/hora de início da análise                  |
| completedAt    | DateTime? | Data/hora de conclusão                          |
| errorMessage   | String?   | Mensagem de erro (se falhou)                    |
| createdAt      | DateTime  | Data/hora de criação                            |

#### ScanResult (Resultado da Análise)

| Campo          | Tipo      | Descrição                                        |
| -------------- | --------- | ----------------------------------------------- |
| id             | UUID      | Identificador único do resultado                |
| scanId         | UUID      | Referência à análise (Scan)                     |
| category       | Enum      | Categoria: privacy_policy, cookies, forms, rights, controller, security, language |
| score          | Float     | Pontuação da categoria                          |
| maxScore       | Float     | Pontuação máxima da categoria                   |
| summary        | String    | Resumo do resultado da categoria                |
| createdAt      | DateTime  | Data/hora de criação                            |

#### Finding (Achado)

| Campo          | Tipo      | Descrição                                        |
| -------------- | --------- | ----------------------------------------------- |
| id             | UUID      | Identificador único do finding                  |
| scanResultId   | UUID      | Referência ao resultado (ScanResult)            |
| criterionId    | UUID      | Referência ao critério (Criterion)              |
| status         | Enum      | Status: found, partial, absent                  |
| score          | Float     | Pontuação obtida no critério                    |
| evidence       | String?   | Evidência encontrada (texto ou descrição)       |
| explanation    | String    | Explicação educativa                            |
| lgpdReference  | String    | Referência ao princípio/artigo da LGPD          |
| createdAt      | DateTime  | Data/hora de criação                            |

#### Recommendation (Recomendação)

| Campo          | Tipo      | Descrição                                        |
| -------------- | --------- | ----------------------------------------------- |
| id             | UUID      | Identificador único                             |
| findingId      | UUID      | Referência ao finding                           |
| title          | String    | Título da recomendação                          |
| description    | String    | Descrição detalhada                             |
| priority       | Enum      | Prioridade: high, medium, low                   |
| howToImprove   | String    | Instrução de como melhorar                      |
| createdAt      | DateTime  | Data/hora de criação                            |

#### Criterion (Critério de Análise)

| Campo          | Tipo      | Descrição                                        |
| -------------- | --------- | ----------------------------------------------- |
| id             | UUID      | Identificador único                             |
| code           | String    | Código do critério (ex: C01, C02)               |
| category       | Enum      | Categoria do critério                           |
| name           | String    | Nome do critério                                |
| description    | String    | Descrição do que será verificado                |
| expectedEvidence | String  | Evidência esperada no site                      |
| riskIfAbsent   | Enum      | Risco caso ausente: high, medium, low, info     |
| educationalExplanation | String | Explicação educativa                       |
| improvementSuggestion  | String | Sugestão de melhoria                       |
| weight         | Float     | Peso do critério na pontuação                   |

#### GlossaryTerm (Termo do Glossário)

| Campo          | Tipo      | Descrição                                        |
| -------------- | --------- | ----------------------------------------------- |
| id             | UUID      | Identificador único                             |
| term           | String    | Termo da LGPD                                   |
| definition     | String    | Definição clara e acessível                     |
| lgpdArticle    | String?   | Artigo da LGPD relacionado                      |
| relatedTerms   | String[]  | Termos relacionados                             |
| createdAt      | DateTime  | Data/hora de criação                            |
| updatedAt      | DateTime  | Data/hora de atualização                        |

---

## 16. Endpoints da API

### 16.1 POST /scans

| Aspecto       | Descrição                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------ |
| **Método**    | POST                                                                                                   |
| **URL**       | `/api/scans`                                                                                           |
| **Descrição** | Inicia uma nova análise do site informado.                                                             |
| **Entrada**   | `{ "url": "https://exemplo.com.br" }`                                                                 |
| **Resposta**  | `202 Accepted` — `{ "id": "uuid", "url": "...", "status": "pending", "createdAt": "..." }`            |
| **Erros**     | `400` — URL inválida ou ausente. `429` — Rate limit excedido. `500` — Erro interno.                   |

### 16.2 GET /scans/:id

| Aspecto       | Descrição                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------ |
| **Método**    | GET                                                                                                    |
| **URL**       | `/api/scans/:id`                                                                                       |
| **Descrição** | Retorna o status e dados básicos de uma análise específica.                                            |
| **Entrada**   | Nenhuma (parâmetro de URL).                                                                            |
| **Resposta**  | `200 OK` — `{ "id": "...", "url": "...", "status": "completed", "score": 65, "riskLevel": "medium", ... }` |
| **Erros**     | `404` — Análise não encontrada. `500` — Erro interno.                                                 |

### 16.3 GET /scans/:id/report

| Aspecto       | Descrição                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------ |
| **Método**    | GET                                                                                                    |
| **URL**       | `/api/scans/:id/report`                                                                                |
| **Descrição** | Retorna o relatório completo da análise com findings, recomendações e pontuação por categoria.         |
| **Entrada**   | Nenhuma (parâmetro de URL).                                                                            |
| **Resposta**  | `200 OK` — Relatório completo com score, riskLevel, categories[], findings[], recommendations[].       |
| **Erros**     | `404` — Análise não encontrada. `409` — Análise ainda em andamento. `500` — Erro interno.             |

### 16.4 GET /scans

| Aspecto       | Descrição                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------ |
| **Método**    | GET                                                                                                    |
| **URL**       | `/api/scans?page=1&limit=20&sort=createdAt&order=desc`                                                 |
| **Descrição** | Lista análises realizadas com paginação.                                                               |
| **Entrada**   | Query params: page, limit, sort, order.                                                                |
| **Resposta**  | `200 OK` — `{ "data": [...], "total": 42, "page": 1, "limit": 20 }`                                  |
| **Erros**     | `500` — Erro interno.                                                                                  |

### 16.5 GET /criteria

| Aspecto       | Descrição                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------ |
| **Método**    | GET                                                                                                    |
| **URL**       | `/api/criteria?category=privacy_policy`                                                                |
| **Descrição** | Lista critérios de análise, opcionalmente filtrados por categoria.                                     |
| **Entrada**   | Query params: category (opcional).                                                                     |
| **Resposta**  | `200 OK` — Array de critérios com code, name, category, description, weight.                           |
| **Erros**     | `500` — Erro interno.                                                                                  |

### 16.6 GET /glossary

| Aspecto       | Descrição                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------ |
| **Método**    | GET                                                                                                    |
| **URL**       | `/api/glossary?search=consentimento`                                                                   |
| **Descrição** | Lista termos do glossário LGPD, opcionalmente filtrados por busca.                                     |
| **Entrada**   | Query params: search (opcional).                                                                       |
| **Resposta**  | `200 OK` — Array de termos com term, definition, lgpdArticle, relatedTerms.                            |
| **Erros**     | `500` — Erro interno.                                                                                  |

### 16.7 GET /scans/:id/export

| Aspecto       | Descrição                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------ |
| **Método**    | GET                                                                                                    |
| **URL**       | `/api/scans/:id/export?format=pdf`                                                                     |
| **Descrição** | Exporta o relatório da análise no formato solicitado.                                                  |
| **Entrada**   | Query params: format (pdf, json).                                                                      |
| **Resposta**  | `200 OK` — Arquivo para download com Content-Disposition.                                              |
| **Erros**     | `404` — Análise não encontrada. `409` — Análise ainda em andamento. `500` — Erro interno.             |

---

## 17. Estratégia de Testes

### 17.1 Abordagem Geral

Os testes utilizarão Vitest como framework principal, cobrindo testes unitários e de integração.

### 17.2 Testes Unitários

| Módulo                    | O que testar                                                                                         |
| ------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Validação de URL**      | URLs válidas são aceitas; URLs inválidas (sem protocolo, formato incorreto, vazias) são rejeitadas.  |
| **Privacy Policy Analyzer** | Detecção de presença/ausência de política; identificação de seções (dados, finalidade, direitos, contato); detecção de linguagem genérica. |
| **Cookie Analyzer**       | Detecção de cookies no HTML/headers; classificação por tipo; detecção de banner; verificação de botões. |
| **Form Analyzer**         | Identificação de campos de formulário; classificação de dados pessoais; detecção de dados sensíveis; avaliação de minimização. |
| **Risk Scoring Engine**   | Cálculo correto de pontuação por critério, categoria e total; classificação de risco conforme faixas definidas. |
| **Report Generator**      | Geração de relatório estruturado; presença de todas as seções obrigatórias; vínculo de findings com princípios da LGPD. |

### 17.3 Testes de Integração

| Cenário                           | Descrição                                                                                         |
| --------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Fluxo completo de análise**     | Submeter URL → processar → gerar relatório → persistir → recuperar via API.                       |
| **Site indisponível**             | URL válida mas site fora do ar → erro tratado gracefulmente com mensagem clara.                   |
| **Site bloqueia scraping**        | URL retorna 403/429 → erro tratado com mensagem informativa.                                      |
| **Política não encontrada**       | Site sem política de privacidade → análise continua e registra ausência.                          |
| **Exportação de relatório**       | Gerar relatório → exportar em PDF/JSON → validar conteúdo do arquivo exportado.                   |

### 17.4 Critérios de Qualidade

- Cobertura mínima de 80% para módulos de análise e cálculo de pontuação.
- Todos os cenários de erro devem ter testes dedicados.
- Testes de pontuação devem cobrir todas as faixas de classificação de risco.
- Testes de validação devem cobrir todos os schemas Zod definidos.

---

## 18. Riscos e Limitações

### 18.1 Riscos Técnicos

| Risco                                              | Impacto | Mitigação                                                                                      |
| -------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------- |
| Sites bloqueiam acesso automatizado (scraping)     | Alto    | Implementar headers de usuário adequados; informar limitação ao usuário; permitir análise parcial. |
| Conteúdo carregado por JavaScript não é detectado  | Alto    | Utilizar rendering headless quando possível; documentar limitação claramente.                |
| Falsos positivos na detecção de cookies            | Médio   | Utilizar heurísticas conservadoras; rotular classificações como aproximações.                 |
| Falsos negativos (elementos não detectados)        | Médio   | Implementar múltiplas estratégias de detecção; informar que a análise não é exaustiva.        |
| Tempo de análise elevado para sites complexos      | Médio   | Definir timeout máximo; processar módulos em paralelo; informar progresso ao usuário.         |
| Dependência de bibliotecas de parsing HTML         | Baixo   | Manter dependências atualizadas; ter fallback para parsing básico.                            |

### 18.2 Riscos Jurídicos

| Risco                                                    | Impacto | Mitigação                                                                                      |
| -------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------- |
| Usuário interpreta relatório como conformidade legal     | Alto    | Avisos legais visíveis e permanentes; linguagem educativa (não certificadora).                 |
| Usuário toma decisões jurídicas baseadas no relatório    | Alto    | Disclaimer claro; recomendação de consulta a profissional; linguagem que enfatiza caráter educativo. |
| Análise de sites de terceiros gera questões legais       | Médio   | Analisar apenas informações públicas; não armazenar dados pessoais; respeitar robots.txt.      |

### 18.3 Riscos Educacionais

| Risco                                                    | Impacto | Mitigação                                                                                      |
| -------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------- |
| Relatório muito técnico para o público-alvo              | Alto    | Testar linguagem com usuários não técnicos; usar glossário e explicações simples.              |
| Usuário não compreende a pontuação                       | Médio   | Explicar claramente o significado de cada faixa; usar analogias e exemplos visuais.            |
| Recomendações muito genéricas                            | Médio   | Vincular recomendações a critérios específicos; fornecer exemplos práticos de implementação.   |
| Falsa sensação de segurança com pontuação alta           | Médio   | Enfatizar que a análise é parcial e educativa; recomendar avaliação profissional.            |

---

## 19. MVP — Produto Mínimo Viável

### 19.1 Essenciais para o MVP

| Funcionalidade                           | Requisito(s)                                  | Justificativa                                                            |
| ---------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------ |
| Inserção de URL para análise             | RF01                                          | Ponto de entrada do sistema; sem isso não há análise.                    |
| Scanner de política de privacidade       | RF03, RF12, RF13, RF14                        | Categoria de maior peso (30%); fundamental para o diagnóstico.           |
| Scanner de cookies                       | RF05, RF06, RF07                              | Categoria com segundo maior peso (25%); alto impacto educativo.          |
| Scanner de formulários                   | RF09, RF10, RF11                              | Permite avaliar minimização e dados sensíveis.                           |
| Verificação de segurança básica          | RF16                                          | HTTPS é requisito mínimo; verificação simples e de alto valor.           |
| Pontuação educativa e classificação      | RF15                                          | Elemento central do relatório; motiva o usuário a melhorar.              |
| Relatório final com recomendações        | RF15, RF18                                    | Entregável principal da ferramenta.                                      |
| Glossário básico                         | RF17                                          | Suporte educacional para compreensão do relatório.                       |
| Aviso legal permanente                   | RN07                                          | Proteção jurídica da ferramenta; obrigatório.                            |

### 19.2 Desejáveis (Pós-MVP)

| Funcionalidade                           | Requisito(s)                                  | Justificativa                                                            |
| ---------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------ |
| Avaliação de linguagem clara             | RF04                                          | Melhora qualidade da análise da política.                                |
| Simulação de gerenciador de preferências | RF08                                          | Valor educativo adicional; não essencial para o diagnóstico.             |
| Histórico de análises                    | RF19                                          | Útil para acompanhamento; pode ser adicionado posteriormente.            |
| Exportação de relatório                  | RF20                                          | Conveniência; não essencial para o diagnóstico inicial.                  |

### 19.3 Futuras (Roadmap)

| Funcionalidade                                       | Justificativa                                                            |
| ---------------------------------------------------- | ------------------------------------------------------------------------ |
| Exportação em PDF formatado                          | Melhora apresentação para compartilhamento.                              |
| Comparação entre análises (evolução temporal)        | Permite visualizar progresso de adequação.                               |
| Simulador de melhoria (antes/depois)                 | Alto valor educativo; mostra impacto de melhorias.                       |
| Mapa visual do fluxo de dados                        | Facilita compreensão de como dados circulam no site.                     |
| Análise avançada de scripts terceiros                | Detecta trackers, pixels e ferramentas de analytics.                     |
| Painel administrativo para configurar critérios      | Permite ajuste fino dos critérios sem alteração de código.               |
| Autenticação de usuário                              | Habilita funcionalidades personalizadas e histórico por usuário.         |
| Análise de aplicativos móveis                        | Expande escopo para além de sites.                                       |
| Integração com APIs de cookies conhecidas            | Melhora precisão da classificação de cookies.                            |
| Relatórios comparativos entre concorrentes           | Benchmarking educativo entre sites do mesmo segmento.                    |

---

## 20. Roadmap de Evolução

### Fase 1 — MVP (4-6 semanas)

- Inserção de URL e validação.
- Scanner de política de privacidade (presença, seções básicas).
- Scanner de cookies (detecção, classificação básica, banner).
- Scanner de formulários (identificação de campos, dados sensíveis).
- Verificação de HTTPS.
- Cálculo de pontuação e classificação de risco.
- Geração de relatório didático com recomendações.
- Glossário básico (10+ termos).
- Aviso legal permanente.

### Fase 2 — Aprimoramento (3-4 semanas)

- Avaliação de linguagem clara na política.
- Classificação detalhada de cookies (8 categorias).
- Análise de minimização de dados em formulários.
- Simulação didática de gerenciador de preferências.
- Histórico de análises.
- Exportação de relatório (PDF/JSON).

### Fase 3 — Expansão (4-6 semanas)

- Comparação entre análises (evolução temporal).
- Simulador de melhoria (antes/depois).
- Análise avançada de scripts terceiros (trackers, pixels).
- Mapa visual do fluxo de dados.
- Painel administrativo para configuração de critérios.
- Melhorias de acessibilidade e responsividade.

### Fase 4 — Maturação (contínuo)

- Autenticação de usuário e perfis.
- Relatórios comparativos entre sites.
- Expansão para análise de aplicativos móveis.
- Integração com bases de dados de cookies conhecidos.
- Internacionalização (espanhol, inglês).
- API pública para integração com outras ferramentas.
- Gamificação (badges, progresso de adequação).

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O usuário consegue inserir uma URL e receber o relatório completo em no máximo 60 segundos.
- **SC-002**: O relatório exibe pontuação numérica (0-100) e classificação de risco para 100% das análises concluídas com sucesso.
- **SC-003**: O sistema detecta corretamente a presença ou ausência de política de privacidade em pelo menos 90% dos sites analisados.
- **SC-004**: O sistema identifica pelo menos 80% dos cookies visíveis no DOM e headers HTTP do site analisado.
- **SC-005**: Cada finding do relatório contém as quatro seções educativas (o que foi encontrado, por que importa, relação com LGPD, como melhorar).
- **SC-006**: O glossário contém no mínimo 10 termos com definições claras e acessíveis.
- **SC-007**: 90% dos usuários não técnicos conseguem compreender o relatório sem assistência externa (validado por teste de usabilidade).
- **SC-008**: O aviso legal sobre o caráter educativo da ferramenta é visível em todas as telas de relatório.
- **SC-009**: O sistema trata gracefulmente sites indisponíveis, URLs inválidas e bloqueios de scraping, exibindo mensagens claras em 100% dos casos.
- **SC-010**: A cobertura de testes dos módulos de análise e cálculo de pontuação é de pelo menos 80%.

---

## Assumptions

- Os sites analisados são acessíveis publicamente e não requerem autenticação.
- O usuário possui conectividade básica à internet para acessar a ferramenta e informar URLs.
- A política de privacidade, quando existente, está acessível via link a partir da página principal ou rodapé do site.
- Os cookies podem ser identificados via análise do HTML e headers HTTP da resposta inicial (limitações de cookies definidos por JavaScript assíncrono são aceitas).
- O banco de dados PostgreSQL estará disponível para persistência via Prisma.
- O ambiente de execução suporta Node.js com capacidade de realizar requisições HTTP externas.
- Não há necessidade de autenticação de usuário para o MVP; o histórico é baseado em sessão ou identificação anônima.
- Os critérios de análise e pesos de pontuação definidos nesta especificação são adequados para o protótipo e podem ser ajustados em iterações futuras.
- A ferramenta será utilizada principalmente em idioma português brasileiro.
- O volume de análises simultâneas no MVP é baixo (protótipo educacional), sem necessidade de escalabilidade horizontal imediata.
