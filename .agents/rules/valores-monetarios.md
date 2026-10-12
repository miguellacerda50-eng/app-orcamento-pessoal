# Regras para Lógica e Manipulação de Valores Monetários

- Toda lógica que envolve valores monetários deve usar decimal ou bibliotecas como `big.js` / `decimal.js` para JavaScript e TypeScript, em vez de float ou number nativo em cálculos críticos, para evitar erros de arredondamento em cálculos financeiros.
- Validar e rejeitar entradas negativas em campos de receita, e entradas positivas em campos de despesa, salvo quando o domínio explicitamente permita.
- Nunca exibir valores financeiros na interface sem a devida formatação de moeda respeitando o padrão brasileiro (`pt-BR`, `R$`).
- Incluir validação e testes para qualquer função de cálculo de saldo total, total por categoria e projeção mensal.
