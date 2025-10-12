### Controle de Chamados

#### Ref.: 
```
https://www.udemy.com/course/nextjs-zero-ao-avancado/learn/lecture/40979896#overview
```

#### Config next Auth
* link doc
```
```

* 1. [x] Next Install
```
npm install next-auth
```

#### Prisma

* 2. [x]
```
npm install prisma --save-dev
```

* 3. [x]
```
npm install @prisma/client
```

* 4. [x] gera o .env e a pasta prisma
```
npx prisma init
```

#### Adapter
* 5. [x] video 110
```
npm install @auth/prisma-adapter 
```

* 6. [x] Criando prisma.ts src/lib/prisma.ts
```
import { PrismaClient } from '@prisma/client'

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
```

* 7. [x] Criando auth.ts src/lib/auth.ts
```

```

```
npx prisma migrate
```

```
npx prisma generete
```

```
npx prisma studio
```

