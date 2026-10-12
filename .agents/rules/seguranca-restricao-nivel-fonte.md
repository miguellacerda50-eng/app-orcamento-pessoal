# Segurança e Restrição no Nível da Fonte (Source-Level Security)

## Diretriz
Enraizar a integridade dos dados na camada de persistência ou infraestrutura.

## Descrição
Implemente políticas de segurança e restrições de acesso a dados na camada mais baixa e profunda possível do sistema (Banco de Dados, camada de Serviço ou Infraestrutura).

## Ação
A camada de interface ou aplicação deve ser tratada apenas como um consumidor que respeita fronteiras pré-estabelecidas. Nunca confie exclusivamente em lógica de filtragem ou validação no lado do cliente para garantir a privacidade ou integridade. Se a tecnologia de persistência oferecer recursos de segurança nativos (como políticas de acesso Row Level Security / RLS ou schemas rígidos), eles devem ser a primeira linha de defesa.
