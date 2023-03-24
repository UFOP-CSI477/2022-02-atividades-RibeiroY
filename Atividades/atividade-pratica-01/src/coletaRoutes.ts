import { FastifyInstance } from "fastify"
import { date, z } from "zod"
import { prisma } from "./lib/prisma"


export async function coletaRoutes(fastify: FastifyInstance) {
    const createLocalColetaSchema = z.object({
        nome: z.string(),
        rua: z.string(),
        numero: z.string(),
        complemento: z.string().optional(),
        cidadeId: z.string(),
      });
      const updateLocalColetaSchema = z.object({
        nome: z.string().optional(),
        rua: z.string().optional(),
        numero: z.string().optional(),
        complemento: z.string().optional(),
        cidadeId: z.string().optional(),
      });
      const idParamSchema = z.object({
        id: z.string(),
      });
      const getLocalColetaByNomeSchema = z.object({
        nome: z.string(),
      });

    fastify.post('/locais-coleta', async (request, reply) => {
        const { nome, rua, numero, complemento, cidadeId } = createLocalColetaSchema.parse(
          request.body,
        );
      
        try {
          // Verificando se a cidade existe no banco de dados
          const cidadeExistente = await prisma.cidade.findUnique({ where: { id: cidadeId } });
          if (!cidadeExistente) {
            reply.status(400).send({ message: 'Cidade não encontrada' });
            return;
          }
      
          // Criando o local de coleta
          const novoLocalColeta = await prisma.locaisColeta.create({
            data: {
              nome,
              rua,
              numero,
              complemento,
              cidade: { connect: { id: cidadeId } },
            },
          });
      
          reply.status(201).send(novoLocalColeta);
        } catch (err) {
          console.error(err);
          reply.status(500).send({ message: 'Erro ao criar local de coleta' });
        }
    });
    fastify.get('/locais-coleta', async (request, reply) => {
        try {
          const locaisColeta = await prisma.locaisColeta.findMany({
            include: { cidade: { include: { estado: true } } },
          });
          reply.status(200).send(locaisColeta);
        } catch (err) {
          console.error(err);
          reply.status(500).send({ message: 'Erro ao buscar locais de coleta' });
        }
    });
    fastify.get('/locais-coleta/:id', async (request, reply) => {
        const { id } = idParamSchema.parse(request.params);
    
        try {
          const localColeta = await prisma.locaisColeta.findUnique({
            where: { id },
            include: { cidade: true },
          });
    
          if (!localColeta) {
            reply.status(404).send({ message: 'Local de coleta não encontrado' });
            return;
          }
    
          reply.send(localColeta);
        } catch (err) {
          console.error(err);
          reply.status(500).send({ message: 'Erro ao buscar local de coleta' });
        }
    });
    fastify.get('/locais-coleta/nome/:nome', async (request, reply) => {
        const { nome } = getLocalColetaByNomeSchema.parse(request.params);
    
        try {
            const locaisColeta = await prisma.locaisColeta.findMany({
                where: {
                  nome: {
                    contains: nome,
                  },
                },
                include: { cidade: true },
              });
    
          reply.send(locaisColeta);
        } catch (err) {
          console.error(err);
          reply.status(500).send({ message: 'Erro ao buscar locais de coleta' });
        }
    });
    fastify.put('/locais-coleta/:id', async (request, reply) => {
        const { id } = idParamSchema.parse(request.params);
    
        try {
          const localColetaExistente = await prisma.locaisColeta.findUnique({ where: { id } });
    
          if (!localColetaExistente) {
            reply.status(404).send({ message: 'Local de coleta não encontrado' });
            return;
          }
    
          const { nome, rua, numero, complemento, cidadeId } = updateLocalColetaSchema.parse(
            request.body
          );
    
          const dadosAtualizados = {
            nome: nome || localColetaExistente.nome,
            rua: rua || localColetaExistente.rua,
            numero: numero || localColetaExistente.numero,
            complemento: complemento || localColetaExistente.complemento,
            cidade: cidadeId
              ? { connect: { id: cidadeId } }
              : { connect: { id: localColetaExistente.cidade_id } },
          };
    
          const localColetaAtualizado = await prisma.locaisColeta.update({
            where: { id },
            data: dadosAtualizados,
          });
    
          reply.send(localColetaAtualizado);
        } catch (err) {
          console.error(err);
          reply.status(500).send({ message: 'Erro ao atualizar local de coleta' });
        }
    });
    fastify.delete('/locais-coleta/:id', async (request, reply) => {

        const { id } = idParamSchema.parse(request.params);
    
        try {
          const localColeta = await prisma.locaisColeta.delete({
            where: { id },
          });
    
          if (!localColeta) {
            reply.status(404).send({ message: 'Local de coleta não encontrado' });
            return;
          }
    
          reply.status(204).send();
        } catch (err) {
          console.error(err);
          reply.status(500).send({ message: 'Erro ao deletar local de coleta' });
        }
    });

    
    
}



  
  
  


