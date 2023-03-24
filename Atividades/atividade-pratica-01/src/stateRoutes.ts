import { FastifyInstance } from "fastify"
import { date, z } from "zod"
import { prisma } from "./lib/prisma"

export async function stateRoutes(fastify: FastifyInstance){
    // Rota para criar um novo Estado
    fastify.post('/estados', async (request, reply) => {
        try {   
          const createRequestBody = z.object({
            nome:z.string(),
            sigla:z.string(),
            
          })
          const { nome, sigla } = createRequestBody.parse(request.body)
      
          
          
      
          // Verifica se já existe um estado com o mesmo nome e sigla
          const estadoExistente = await prisma.estado.findUnique({
            where: { nome_sigla: { nome, sigla } }
          })
          if (estadoExistente) {
            return reply.code(400).send({ message: 'Já existe um estado com esse nome e sigla.' })
          }
      
          const estado = await prisma.estado.create({
            data: {
              nome,
              sigla
            }
          })
          reply.code(201).send(estado)
          console.log("Estado criado:", estado)
        } catch (error) {
          reply.code(500).send(error)
        }
    })
      // Rota para listar todos os Estados
    fastify.get('/estados', async (request, reply) => {
    try {
        const estados = await prisma.estado.findMany()
        console.log(estados)
        reply.code(200).send(estados)
    } catch (error) {
        reply.code(500).send(error)
    }
    })
    // Rota para buscar um Estado pela sigla
    fastify.get('/estados/:sigla', async (request, reply) => {
      try {
        const schema = z.object({
          sigla: z.string()
        });
        const { sigla } = schema.parse(request.params);
        
        const estado = await prisma.estado.findFirst({
          where: { 
            sigla 
          },
        });
        
        if (!estado) {
          return reply.code(404).send({ message: 'Estado não encontrado.' });
        }
        
        reply.code(200).send(estado);
        console.log(estado);
      } catch (error) {
        reply.code(500).send(error);
      }
    });

    
    // Rota para atualizar um Estado existente
    fastify.put('/estados/:id', async (request, reply) => {
    try {

        const createRequestParams = z.object({
        id:z.string(),
        })
        const createRequestBody = z.object({
            nome:z.string(),
            sigla:z.string(),
        })
        const { id } = createRequestParams.parse(request.params)
        const { nome, sigla } = createRequestBody.parse(request.body)
        const estado = await prisma.estado.update({
        where: { id },
        data: {
            nome,
            sigla
        }
        })
        reply.code(200).send(estado)
    } catch (error) {
        reply.code(500).send(error)
    }
    })
    // Rota para deletar um Estado existente
    fastify.delete('/estados/:id', async (request, reply) => {
    try {
        const createRequestParams = z.object({
        id:z.string(),
        })
        const { id } = createRequestParams.parse(request.params)
        const estado = await prisma.estado.delete({
        where: { id }
        })
        reply.code(200).send(estado)
    } catch (error) {
        reply.code(500).send(error)
    }
    })


}