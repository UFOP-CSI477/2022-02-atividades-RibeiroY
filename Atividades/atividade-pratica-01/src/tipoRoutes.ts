import { FastifyInstance } from "fastify"
import { date, z } from "zod"
import { prisma } from "./lib/prisma"

export async function tipoRoutes(fastify: FastifyInstance) {
    const postTipoSanguineoSchema = z.object({
        tipo: z.string().min(1).max(2),
        fator: z.string().min(1).max(8)
    });
    const idParamSchema = z.object({
        id: z.string(),
    });
    fastify.post('/tipos-sanguineos', async (request, reply) => {
        const { tipo, fator } = postTipoSanguineoSchema.parse(request.body);
      
        try {
          const tipoSanguineo = await prisma.tipoSanguineo.create({
            data: {
              tipo,
              fator,
            },
          });
          const tipoSanguineoExistente = await prisma.tipoSanguineo.findFirst({
            where: {
              AND: [
                { tipo: tipo },
                { fator: fator },
              ],
            },
          });
      
          // Se já existe, retorna erro
          if (tipoSanguineoExistente) {
            reply.code(400).send({ message: 'Tipo sanguíneo já cadastrado.' });
            return;
          }
          reply.code(201).send(tipoSanguineo);
        } catch (error) {
          reply.code(500).send(error);
        }
    });
    fastify.get('/tipos-sanguineos', async (request, reply) => {
        try {
          const tiposSanguineos = await prisma.tipoSanguineo.findMany({
            orderBy: { tipo: 'asc' },
            include: { pessoas: true },
          });
          reply.code(200).send(tiposSanguineos);
        } catch (error) {
          reply.code(500).send(error);
        }
    });
    fastify.get('/tipos-sanguineos/:id', async (request, reply) => {
        const { id } = idParamSchema.parse(request.params);
      
        try {
          const tipoSanguineo = await prisma.tipoSanguineo.findUnique({
            where: { id },
            include: { pessoas: true },
          });
          if (!tipoSanguineo) {
            return reply.code(404).send({ message: 'Tipo sanguíneo não encontrado.' });
          }
          reply.code(200).send(tipoSanguineo);
        } catch (error) {
          reply.code(500).send(error);
        }
    });
    fastify.delete('/tipos-sanguineos/:id', async (request, reply) => {
        const { id } = idParamSchema.parse(request.params);
      
        try {
          const tipoSanguineo = await prisma.tipoSanguineo.delete({
            where: { id },
          });
          if (!tipoSanguineo) {
            return reply.code(404).send({ message: 'Tipo sanguíneo não encontrado.' });
          }
          reply.code(200).send({ message: 'Tipo sanguíneo excluído com sucesso.' });
        } catch (error) {
          reply.code(500).send(error);
        }
    });

}