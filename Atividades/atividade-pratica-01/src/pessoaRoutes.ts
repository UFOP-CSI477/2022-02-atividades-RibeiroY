import { FastifyInstance } from "fastify"
import { date, z } from "zod"
import { prisma } from "./lib/prisma"

export async function pessoaRoutes(fastify: FastifyInstance) {
    const idParamSchema = z.object({
        id: z.string(),
    });
    const postPessoaSchema = z.object({
        nome: z.string().nonempty(),
        rua: z.string().nonempty(),
        numero: z.string().nonempty(),
        complemento: z.string().optional(),
        documento: z.string().nonempty().min(11),
        cidade_id: z.string().nonempty(),
        tipo_id: z.string().optional(),
    });
    const updatePessoaSchema = z.object({
        
          nome: z.string().optional(),
          rua: z.string().optional(),
          numero: z.string().optional(),
          complemento: z.string().optional(),
          cidade_id: z.string().uuid().optional(),
          tipo_id: z.string().uuid().optional(),
    }).strict()
    
    const getPessoaByDocumentoSchema = z.object({
        documento: z.string().min(11),
    });

    fastify.post('/pessoas', async (request, reply) => {
        try {
          // Valida o body da requisição
          const pessoa = postPessoaSchema.parse(request.body);
      
          const novaPessoa = await prisma.pessoa.create({ data: pessoa });
          reply.code(201).send(novaPessoa);
        } catch (error) {
          reply.code(500).send(error);
        }
    });
    fastify.get('/pessoas', async (request, reply) => {
        try {
          const pessoas = await prisma.pessoa.findMany({
            include: { cidade: true, tipo_sangue: true, doacoes: true },
          });
          reply.code(200).send(pessoas);
        } catch (error) {
          reply.code(500).send(error);
        }
    });
    fastify.get('/pessoas/documento/:documento', async (request, reply) => {
        try {
            // Valida os parâmetros da rota
            const { documento } = getPessoaByDocumentoSchema.parse(request.params);
        
            const pessoa = await prisma.pessoa.findUnique({
            where: { documento },
            include: { cidade: true, tipo_sangue: true },
            });
        
            if (!pessoa) {
            return reply.code(404).send({ message: 'Pessoa não encontrada.' });
            }
        
            reply.code(200).send(pessoa);
        } catch (error) {
            reply.code(500).send(error);
        }
    });
    fastify.put('/pessoas/:id', async (request, reply) => {
        const { id } = idParamSchema.parse(request.params);
        const { nome, rua, numero, complemento, cidade_id, tipo_id } =
          updatePessoaSchema.parse(request);
      
        try {
          const pessoa = await prisma.pessoa.update({
            where: { id },
            data: { nome, rua, numero, complemento, cidade_id, tipo_id },
            include: { cidade: true, tipo_sangue: true, doacoes: true },
          });
          reply.code(200).send(pessoa);
        } catch (error) {
          reply.code(500).send(error);
        }
    });
    fastify.delete('/pessoas/:id', async (request, reply) => {
        try {
          // Valida os parâmetros da rota
          const { id } = idParamSchema.parse(request.params);
      
          // Remove a pessoa do banco de dados
          await prisma.pessoa.delete({
            where: { id },
          });
      
          // Retorna uma mensagem de sucesso
          reply.code(200).send({ message: 'Pessoa removida com sucesso.' });
        } catch (error) {
          // Retorna uma mensagem de erro em caso de falha na validação ou na remoção
          reply.code(500).send(error);
        }
    });
            
      
      
      



}
