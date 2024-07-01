Gerador de Senhas - Projeto em Node.js
Este é um projeto simples de um gerador de senhas utilizando Node.js, Express, HTML, CSS e JavaScript. Ele permite gerar senhas aleatórias com diferentes combinações de caracteres (números, letras e caracteres especiais), conforme escolhido pelo usuário através de uma interface web.

Funcionalidades
Gerar Senha: Permite gerar senhas aleatórias com base nas opções selecionadas (números, letras, caracteres especiais).
Copiar Senha: Permite copiar a senha gerada para a área de transferência.
Histórico de Senhas: Mantém um registro das senhas geradas, acessível através do botão "Ver Log".
Estrutura do Projeto
O projeto está estruturado da seguinte forma:

index.html: Contém a estrutura básica da interface web onde o usuário interage para gerar senhas.
styles.css: Folha de estilo que define o layout e design da interface.
script.js: Arquivo JavaScript que manipula eventos na interface e faz requisições para o servidor Node.js.
server.js: Servidor Node.js que utiliza o framework Express para roteamento e geração de senhas.
-----------------------------------------
Notas Adicionais
Node_modules ausente: A pasta node_modules não está incluída no repositório devido ao seu tamanho. É necessário instalá-la localmente com npm install para executar o projeto corretamente.
