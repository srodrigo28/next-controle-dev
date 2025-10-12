import { PrismaClient } from '../generated/prisma/client'
// import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient;

if(process.env.NODE_ENV === "production") {
    prisma = new PrismaClient
}else{
    let globalWithPrima = global as typeof globalThis & {
        prisma: PrismaClient;
    }

    if(!globalWithPrima.prisma) {
        globalWithPrima.prisma = new PrismaClient();
    }

    prisma = globalWithPrima.prisma;
    
}

export default prisma;