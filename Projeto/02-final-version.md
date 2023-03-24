# **CSI606-2021-02 - Remoto - Trabalho Final - Resultados**

## *Aluna(o): Yuri da Silva Ribeiro*

--------------

<!-- Este documento tem como objetivo apresentar o projeto desenvolvido, considerando o que foi definido na proposta e o produto final. -->

### Resumo

  O trabalho consiste num sistema de palpites para corridas de Fórmula 1. A pessoa que acessar pode criar seu bolão e dentro desse bolão criar seus próprios palpites para as corridas disponíveis.

### 1. Funcionalidades implementadas
As funcionalidades implementadas consistem no seguinte: 
  Login através de Google (a tabela "User" no projeto ganha mais uma linha assim que um novo login no Google é feito.
  Criação do próprio bolão.
  Busca de bolão por via de código.
  Palpites no próprio bolão e em de terceiros nas corridas disponíveis
  Os palpites consistem em: vencedor da corrida, pole position e volta mais rápida.
  
### 2. Funcionalidades previstas e não implementadas
Tudo o que foi prometido foi implementado, mas deixei implícito na versão inicial do documento que era um sistema de bolões.

### 3. Outras funcionalidades implementadas
<!-- Descrever as funcionalidades implementas além daquelas que foram previstas, caso se aplique.  -->

### 4. Principais desafios e dificuldades
Foi muito dificultosa a implementação da autenticação social com o Google. 
Após o contorno dessa dificuldade, veio outra onde eu fui obrigado a alterar toda a tecnologia do front-end, transferindo de next.js para react-native-web, mas tudo deu certo.

### 5. Instruções para instalação e execução
Pré-requisitos: node.js (versão 16 ou superior) e npm como gerenciador de pacotes.
Crie o projeto em sua máquina, instale as dependências através do npm i tanto na pasta server quanto na pasta do front-end.
Na pasta server, após tudo ter sido instalado, rode o mesmo com o comando npm run dev. 
Caso seja necessário algum ajuste para melhor observação, dê um split terminal e rode o npx prisma studio, onde estará de forma dinâmica (assim como será demonstrado no vídeo) todos os dados.
No front, é usado o expo (uma das dependencias a serem instaladas). Após instalado, para abrir o projeto, utilize o comando npx expo start --web.
OBS: NÃO SE ESQUEÇA DE DEIXAR O SERVIDOR RODANDO ANTES DO FRONT SER STARTADO.



### 6. Referências
<!-- Referências podem ser incluídas, caso necessário. Utilize o padrão ABNT. -->
