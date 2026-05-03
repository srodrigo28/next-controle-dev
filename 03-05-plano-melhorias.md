## Data e Hora

03-05-2026 12:01:43

## Titulo

Plano de Melhorias do Projeto `next-controle-dev`

## Varredura Geral

Projeto Next.js com autenticacao via NextAuth, persistencia com Prisma e PostgreSQL na Neon. A estrutura base esta funcional, incluindo conexao com o banco e migrations aplicadas, mas a aplicacao ainda apresenta pontos importantes de seguranca, organizacao, padronizacao e maturidade de produto antes de evoluir com tranquilidade.

## Prioridades

### 1. Prioridade Critica - Seguranca de credenciais

- Remover imediatamente segredos expostos em arquivos versionados, incluindo chaves de banco e Google OAuth.
- Revisar [`.env`](C:\dev\continue\next-controle-dev\.env) e [`env-md.md`](C:\dev\continue\next-controle-dev\env-md.md) para evitar manter credenciais em documentacao.
- Girar as credenciais expostas do banco e do Google para invalidar acessos antigos.
- Garantir que exemplos de configuracao usem placeholders em vez de valores reais.

### 2. Prioridade Alta - Validacao da autenticacao

- Revisar a implementacao em [`src/lib/auth.ts`](C:\dev\continue\next-controle-dev\src\lib\auth.ts) para garantir fluxo consistente de `session`, `signIn` e relacionamento entre `User` e `Account`.
- Confirmar se o callback `session` esta usando o objeto correto para preencher `session.user.id`.
- Verificar se o `signIn` cobre usuarios novos e usuarios existentes sem duplicar contas.
- Adicionar testes de login, sessao e protecao de rotas.

### 3. Prioridade Alta - Padronizacao do Prisma Client

- Consolidar os arquivos [`src/lib/prisma.ts`](C:\dev\continue\next-controle-dev\src\lib\prisma.ts) e [`src/lib/prismaBD.ts`](C:\dev\continue\next-controle-dev\src\lib\prismaBD.ts), que hoje estao duplicados.
- Definir um unico ponto oficial de acesso ao banco.
- Revisar nomes, comentarios e consistencia do codigo para evitar manutencao duplicada.

### 4. Prioridade Alta - Qualidade do modelo de dados

- Revisar o schema em [`prisma/schema.prisma`](C:\dev\continue\next-controle-dev\prisma\schema.prisma) para limpar comentarios antigos e trechos obsoletos.
- Validar nomes de modelos e campos para manter coerencia entre dominio, banco e interface.
- Confirmar se todas as relacoes e indices realmente cobrem os casos de uso de `Customer`, `Ticket`, `Session` e `Account`.
- Criar uma definicao mais clara para status de ticket, evitando strings soltas.

### 5. Prioridade Media - Estrutura real das paginas

- Evoluir paginas ainda muito iniciais como [`src/app/dashboard/page.tsx`](C:\dev\continue\next-controle-dev\src\app\dashboard\page.tsx) e [`src/app/cadastro/page.tsx`](C:\dev\continue\next-controle-dev\src\app\cadastro\page.tsx).
- Substituir conteudo de exemplo por fluxos reais do produto.
- Garantir responsividade, consistencia visual e ligacao com dados reais.

### 6. Prioridade Media - Formularios e validacao

- Fortalecer o formulario de cadastro com validacao schema-based usando `zod` junto com `react-hook-form`.
- Tratar erros de envio, estados de loading e mensagens de sucesso.
- Padronizar componentes de input para reaproveitamento.

### 7. Prioridade Media - Organizacao de codigo e componentes

- Revisar a estrutura de `src/app/components` para separar melhor componentes de layout, dominio e UI.
- Padronizar imports, nomenclatura e formatacao entre arquivos.
- Eliminar exemplos temporarios e trechos copiados da fase de estudo.

### 8. Prioridade Media - Scripts de desenvolvimento

- Adicionar scripts no [`package.json`](C:\dev\continue\next-controle-dev\package.json) para tarefas frequentes como `prisma generate`, lint, testes e health check do banco.
- Criar um script simples para validar conexao com o banco sempre que necessario.
- Incluir comandos de setup rapido para facilitar onboarding.

### 9. Prioridade Baixa - Documentacao do projeto

- Reescrever o [`README.md`](C:\dev\continue\next-controle-dev\README.md) para refletir o estado atual do projeto, sem misturar anotacoes de curso com documentacao operacional.
- Separar documentacao tecnica, setup local e decisoes de arquitetura.
- Incluir fluxo de login, dependencias principais e passos para rodar o projeto.

### 10. Prioridade Baixa - Atualizacao e manutencao de dependencias

- Avaliar atualizacao de `prisma` e `@prisma/client` com cuidado por ser major update.
- Revisar versoes do NextAuth e adaptadores para evitar redundancia de pacotes.
- Executar uma rodada de compatibilidade antes de qualquer upgrade maior.

## Resumo de Direcao

Primeiro blindar seguranca e autenticacao. Depois consolidar banco, formularios e estrutura de paginas. Em seguida melhorar documentacao, scripts e manutencao para deixar o projeto mais estavel para continuar crescendo.
