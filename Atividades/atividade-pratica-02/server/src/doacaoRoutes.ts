import { FastifyInstance } from "fastify"
import { date, z } from "zod"
import { prisma } from "./lib/prisma"

export async function doacaoRoutes(fastify: FastifyInstance) {
    const idParamSchema = z.object({
        id: z.string(),
    });

    const postDoacaoSchema = z.object({
        pessoaId: z.string().nonempty(),
        localId: z.string().nonempty(),
        data: z.date(),
    });
    fastify.post('/doacoes', async (request, reply) => {
        const { pessoaId, localId, data } = postDoacaoSchema.parse(request.body);
      
        try {
          const doacao = await prisma.doacao.create({
            data: {
              pessoa: { connect: { id: pessoaId } },
              local: { connect: { id: localId } },
              data,
            },
          });
      
          reply.code(201).send(doacao);
        } catch (error) {
          reply.code(500).send(error);
        }
    });
    fastify.get('/doacoes', async (request, reply) => {
        try {
          const doacoes = await prisma.doacao.findMany(
            {include: { pessoa: true, local:true }}
            
          );
          return doacoes;
          
        } catch (error) {
          console.error(error);
          reply.status(500).send('Erro ao buscar doações.');
        }
    });
    fastify.get('/doacoes/:id', async (request, reply) => {
        const { id } = idParamSchema.parse(request.params);  // Captura o parâmetro de ID da URL
        try {
          // Consulta o banco de dados pelo ID da doação
          const doacao = await prisma.doacao.findUnique({
            where: {
              id: id,
            },
            include: {
              pessoa: true,
              local: true,
            },
          })
          // Retorna a doação encontrada como resposta
          if (doacao) {
            reply.send(doacao)
          } else {
            reply.code(404).send('Doação não encontrada')
          }
        } catch (error) {
          // Retorna um erro caso ocorra algum problema na consulta
          reply.code(500).send('Erro ao buscar doação')
        }
    })
    fastify.put('/doacoes/:id', async (request, reply) => {
        const formatoData = /^(\d{4})-(\d{2})-(\d{2})$/;

        const dateValidator = (val: string) => formatoData.test(val);

        const updateDoacaoSchema = z.object({
        pessoa_id: z.string().optional(),
        local_id: z.string().optional(),
        data: z.string().refine(dateValidator, {
            message: 'Invalid date format. Expected format is YYYY-MM-DD',
        }).optional(),
        }).nonstrict();
      
        try {
          const { pessoa_id, local_id, data } = updateDoacaoSchema.parse(request.body);
          const { id } = z.object({ id: z.string().uuid() }).parse(request.params);
      
          const doacao = await prisma.doacao.update({
            where: { id },
            data: { pessoa_id, local_id, data },
            include: { pessoa: true, local: true },
          });
      
          reply.code(200).send(doacao);
        } catch (error) {
          reply.code(500).send(error);
        }
    });
    fastify.delete('/doacoes/:id', async (request, reply) => {
        try {
          const { id } = z.object({ id: z.string().uuid() }).parse(request.params);
          const deletedDoacao = await prisma.doacao.delete({
            where: { id },
            include: { pessoa: true, local: true },
          });
          reply.code(200).send(deletedDoacao);
        } catch (error) {
          reply.code(500).send(error);
        }
    });
      
     
      
      
      

}