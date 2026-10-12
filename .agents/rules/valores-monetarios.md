# Regras para Lógica e Manipulação de Valores Monetários

- Toda lógica que envolve valores monetários deve usar decimal ou bibliotecas como `big.js` / `decimal.js` para JavaScript e TypeScript, em vez de float ou number nativo em cálculos críticos, para evitar erros de arredondamento em cálculos financeiros.
- O usuário deve informar valores absolutos (positivos) tanto para receitas quanto para despesas na interface; o sistema é responsável pela conversão e tratamento do sinal internamente através do campo `type` ('income' | 'expense'). Rejeitar valores menores ou iguais a zero.
- Nunca exibir valores financeiros na interface sem a devida formatação de moeda respeitando o padrão brasileiro (`pt-BR`, `R$`).
- Incluir validação e testes para qualquer função de cálculo de saldo total, total por categoria e projeção mensal.
