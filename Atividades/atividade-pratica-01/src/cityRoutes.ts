import { FastifyInstance } from "fastify"
import { date, z } from "zod"
import { prisma } from "./lib/prisma"

export async function cityRoutes(fastify: FastifyInstance){
  // Definindo o schema de validação dos dados recebidos para criar uma cidade
  const createCidadeSchema = z.object({
    nome: z.string(),
    estadoId: z.string(),
  });
  
  // Rota para criar uma cidade
  fastify.post('/cidades', async (request, reply) => {
    const { nome, estadoId } = createCidadeSchema.parse(request.body);
  
    try {
      // Verificando se o estado existe no banco de dados
      const estadoExistente = await prisma.estado.findUnique({ where: { id: estadoId } });
      console.log("estado",estadoExistente)
      if (!estadoExistente) {
        reply.status(400).send({ message: 'Estado não encontrado' });
        return;
      }
  
      // Criando a cidade
      const novaCidade = await prisma.cidade.create({
        data: {
          nome,
          estado: { connect: { id: estadoId } },
        },
      });
  
      reply.status(201).send(novaCidade);
    } catch (err) {
      console.error(err);
      reply.status(500).send({ message: 'Erro ao criar cidade' });
    }
  });

  fastify.get('/cidades', async (request, reply) => {
    try {
      const cidades = await prisma.cidade.findMany();
      reply.code(200).send(cidades);
    } catch (error) {
      reply.code(500).send(error);
    }
  });
    
  fastify.get('/cidades/:id', async (request, reply) => {
    const getCidadeSchema = z.object({
      id: z.string(),
    });

    try {
      // Valida os parâmetros da rota
      const { id } = getCidadeSchema.parse(request.params);
  
      const cidade = await prisma.cidade.findUnique({
        where: { id },
        include: { estado: true, locais_coleta: true, pessoas: true },
      });
      if (!cidade) {
        return reply.code(404).send({ message: 'Cidade não encontrada.' });
      }
      reply.code(200).send(cidade);
    } catch (error) {
      reply.code(500).send(error);
    }
  });
  
      
      
  fastify.put('/cidades/:id', async (request, reply) => {
    const updateCidadeSchema = z.object({
      nome: z.string().optional(),
      estado_id: z.string().optional(),
    }).nonstrict();
    try {
      const { nome, estado_id } = updateCidadeSchema.parse(request.body);
      const { id } = z.object({ id: z.string().uuid() }).parse(request.params);
      const cidade = await prisma.cidade.update({
        where: { id },
        data: { nome, estado_id },
        include: { estado: true, locais_coleta: true, pessoas: true },
      });
      reply.code(200).send(cidade);
    } catch (error) {
      reply.code(500).send(error);
    }
  });
    
    // Rota para deletar uma cidade
  fastify.delete('/estados/:estadoId/cidades/:cidadeId', async (request, reply) => {
      try {
          const getCidadeSchema = z.object({
              estadoId: z.string(),
              cidadeId: z.string(),
          });
          const { estadoId, cidadeId } = getCidadeSchema.parse(request.params);
    
        // Validate request params using Zod
        const paramsSchema = z.object({
          estadoId: z.string().uuid(),
          cidadeId: z.string().uuid(),
        });
        paramsSchema.parse(request.params);
    
        // Check if the estado exists
        const estado = await prisma.estado.findUnique({
          where: { id: estadoId },
          include: { cidades: true },
        });
        if (!estado) {
          return reply
            .code(404)
            .send({ message: 'Estado não encontrado.' });
        }
    
        // Check if the cidade exists in the estado
        const cidade = estado.cidades.find((c: any) => c.id === cidadeId);
        if (!cidade) {
          return reply
            .code(404)
            .send({ message: 'Cidade não encontrada neste estado.' });
        }
    
        // Delete the cidade
        await prisma.cidade.delete({
          where: { id: cidadeId },
        });
    
        reply.code(204).send();
      } catch (error) {
        reply.code(500).send(error);
      }
  });
      
      
      
      

}