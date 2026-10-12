# Validação de Contexto e Versionamento (Context-Aware Versioning)

## Diretriz
Priorizar a conformidade técnica com o ambiente real sobre o conhecimento generalista.

## Descrição
Antes de implementar qualquer padrão arquitetural ou funcionalidade, verifique obrigatoriamente as versões específicas das dependências principais e o ambiente de execução do projeto (através de arquivos de configuração, manifestos de pacotes ou documentação interna).

## Ação
O agente deve ignorar convenções genéricas ou de versões anteriores caso a versão instalada no projeto exija novos padrões. O objetivo é garantir que o código seja tecnicamente preciso e otimizado para o ecossistema atual, evitando dívida técnica por obsolescência desde o primeiro dia.
