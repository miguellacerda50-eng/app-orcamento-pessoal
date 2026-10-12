---
description: Analisa a estrutura do diretório, arquivos de configuração e lógica de negócio para gerar documentação técnica profissional com diagramas Mermaid
---

# Gerador de Documentação Técnica e Arquitetura

## Passos:
1. **Mapeamento de Stack:**
   - Identifique as principais tecnologias (ex: Next.js, React, Tailwind, Supabase, Recharts) lendo o `package.json` e arquivos de configuração.
2. **Análise de Fluxo:**
   - Analise as pastas `src/app`, `src/actions` e `src/lib` para entender a hierarquia de rotas e integração com o banco de dados.
3. **Geração de Diagramas Mermaid:**
   - Crie um gráfico de Entidade-Relacionamento (ERD) a partir dos schemas de banco de dados (`supabase-schema.sql`).
   - Crie um gráfico de Arquitetura de Componentes ou Fluxo de Dados para as rotas e Server Actions principais.
4. **Redação Técnica:**
   - Estruture a documentação com Visão Geral, Arquitetura, Guia de Execução e Variáveis de Ambiente.
   - Atualize o arquivo `README.md`.

## Critérios de Aceite:
- A documentação deve refletir 100% da estrutura real de pastas do projeto.
- Os diagramas Mermaid devem ser sintaticamente corretos e renderizáveis.
- Linguagem técnica clara e acessível para stakeholders.
