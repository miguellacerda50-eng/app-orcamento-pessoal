---
description: Verifica tipagem, estética, qualidade e build do código antes de comitar alterações
---

# Pre-Commit Workflow

## Passos:
1. **Verificação de Sintaxe & Tipagem:**
   - Execute `npm run build` ou `npx tsc --noEmit`. Não ignore erros de tipagem.
2. **Linting & Estilo:**
   - Execute o Linter (`npm run lint`) no projeto para garantir a qualidade do código.
   - Verifique formatação para garantir a consistência do código.
3. **Resumo de Alterações:**
   - Identifique se houve adição [I], remoção [R] ou alteração [A] significativa na lógica de negócio.

## Critérios de Aceite:
- Zero erros de ESLint.
- Tipagem TypeScript 100% válida.
- Build do Next.js concluída sem avisos críticos.
