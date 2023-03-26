
import Fastify from "fastify"
import cors from '@fastify/cors'
import { stateRoutes } from "./stateRoutes"
import { cityRoutes } from "./cityRoutes"
import { coletaRoutes } from "./coletaRoutes"
import { tipoRoutes } from "./tipoRoutes"
import { pessoaRoutes } from "./pessoaRoutes"
import { doacaoRoutes } from "./doacaoRoutes"

async function bootstrap(){
    const fastify = Fastify({ logger: true })
    await fastify.register(cors,{
      origin: true
    })
    await fastify.register(stateRoutes)
    await fastify.register(cityRoutes)
    await fastify.register(coletaRoutes)
    await fastify.register(tipoRoutes)
    await fastify.register(pessoaRoutes)
    await fastify.register(doacaoRoutes)
    await fastify.listen({port: 3000})
    
    

}

bootstrap()

/*

*/ 
