# Segurança e Privacidade dos Dados do Usuário

Por se tratar de uma aplicação que lida com dados financeiros pessoais sensíveis:
- Nunca logar, imprimir ou expor valores de transações, saldos ou dados de usuário em `console.log`, `print` ou arquivos de log em ambiente de produção.
- Dados financeiros não devem ser armazenados em `localStorage` ou `sessionStorage` sem criptografia.
- Toda comunicação com APIs externas e serviços deve usar HTTPS e incluir tratamento explícito de erros de autenticação.
- Ao gerar seeds, mocks ou dados de teste, usar apenas valores fictícios, nunca reutilizar dados reais de usuários no código.
