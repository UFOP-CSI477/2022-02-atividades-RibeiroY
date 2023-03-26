Como demonstrar que o back funciona:

Pré-requisitos: node.js (versão 16 ou superior) e npm como gerenciador de pacotes. 
  Crie o projeto em sua máquina, 
instale as dependências através do npm i , após tudo ter sido instalado, rode o mesmo com o comando npm run dev. 
  Caso seja necessário algum ajuste para melhor observação, dê um split terminal e rode o npx prisma studio, 
onde estará de forma dinâmica (assim como será demonstrado no vídeo) todos os dados. 
  Com o server rodando, para registrar o estado:
POST ESTADOS JSON: 
http://localhost:3000/estados
{
  "nome": "Espírito Santo",
  "sigla": "ES"
}
DELETE:http://localhost:3000/estados/:id
{
  "id": "id-do-estado"
}
GET: http://localhost:3000/estados
PUT: http://localhost:3000/estados/:id
{
  "nome": "Espírito Santo",
  "sigla": "ES"
}

POST CIDADES JSON http://localhost:3000/cidades
{
  "nome": "São Paulo",
  "estadoId": "id-do-estado"
}
GET: http://localhost:3000/cidades
PUT: http://localhost:3000/cidades/:id
{
  "nome": "Rio de Janeiro",
  "estado_id": "id-do-estado"
}
DELETE:http://localhost:3000/cidades/:id
{
  "id": "id-da-cidade"
}

POST TIPOS SANGUINEOS JSON http://localhost:3000/tipos-sanguineos
{
  "tipo": "A",
  "fator": "Negativo"
}
TODAS AS FUNCIONALIDADES FUNCIONAM DA MESMA FORMA PARA TODAS AS ENTIDADES.


