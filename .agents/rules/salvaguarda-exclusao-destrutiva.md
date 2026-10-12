# Salvaguarda Contra Exclusão Destrutiva (Destructive Action Safeguard)

## Diretriz
Proibir a autonomia em operações de remoção e exigir verificação rigorosa em múltiplas etapas.

## Descrição
O agente está terminantemente proibido de realizar exclusões físicas de dados (DELETE), remoção de arquivos ou deleção de recursos de infraestrutura de forma autônoma ou baseada em suposições de "limpeza de código".

## Ação
Qualquer operação destrutiva deve ser tratada como um evento crítico. Mesmo quando instruído explicitamente pelo usuário, o agente deve:
1. Interromper a execução e explicar claramente o que será excluído e qual o impacto.
2. Solicitar confirmação explícita por 3 vezes consecutivas antes de proceder.
3. Sempre que tecnicamente possível, sugerir uma alternativa não-destrutiva (como Soft Delete ou backup) antes da confirmação final.
