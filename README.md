### Controle de Chamados

#### Ref.:  Conta usada Google: rodrigoexer2@gmail.com
```
https://www.udemy.com/course/nextjs-zero-ao-avancado/learn/lecture/40979896#overview
```

#### Config next Auth aula 10

##### 1. [x] Next Install
```
npm install next-auth
```

##### 2. [x]
```
npm install prisma --save-dev
```

##### 3. [x]
```
npm install @prisma/client
```

##### 4. [x] Iniciando o prisma  gera o .env e a pasta prisma
```
npx prisma init
```

##### 5. [x] Adapter
```
npm install @auth/prisma-adapter 
```

##### 6. [x] aula 109 Criando prisma.ts src/lib/prisma.ts
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

##### 7. [x] aula 109 Criando auth.ts src/lib/auth.ts
```
import { PrismaAdapter } from '@auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import { AuthOptions } from 'next-auth'
import PrismaClient  from './prisma'

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(PrismaClient),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    callbacks: {
        async session({ session, token, user}) {
            session.user = { ...session.user, id: user.id } as {
                id: string,
                name: string;
                email: string;
            }

            return session;
        }
    }
}
```

#### 7. atualizado
```
import { PrismaAdapter } from '@auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import { AuthOptions } from 'next-auth'
import PrismaClient from './prisma'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(PrismaClient),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user = { ...session.user, id: user.id } as {
        id: string
        name: string
        email: string
      }

      return session
    },

    async signIn({ user, account, profile }) {
      // Verifica se já existe um user com o mesmo e-mail
      const existingUser = await PrismaClient.user.findUnique({
        where: { email: user.email ?? undefined },
      })

      if (existingUser && account?.provider && account?.providerAccountId) {
        // Faz o upsert da conta OAuth
        await PrismaClient.account.upsert({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
          update: {},
          create: {
            userId: existingUser.id,
            type: account.type,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
            expiresAt: account.expires_at,
            tokenType: account.token_type,
            scope: account.scope,
            idToken: account.id_token,
          },
        })
      }

      return true
    },
  },
}
```

##### 8. [x] aula 109 Criando [...nextauth].js src/app/api/auth/[...nextauth]/route.ts
```
import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

##### 9. [x] aula 109 Criando ( auth.tsx ) src/providers/auth.tsx
```
"use client"

import { SessionProvider, SessionProviderProps } from 'next-auth/react'

export const AuthProvider = ({ children } : SessionProviderProps) => {
    return(
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
```

##### 10. [x] aula 109 Configurando o ( layout ) src/app/layout.tsx
```
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./components/header";
import { AuthProvider } from '@/providers/auth'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev Controle",
  description: "Treina Dev Treinamentos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

```

##### 11. [x] aula 110 > Types src/@types/next-auth.d.ts
```
import { DefaultSession } from 'next-auth'

declare module "next-auth" {
    interface Session{
        user: {
            id: string;
        } & DefaultSession["user"];
    }
}
```

##### 12. [x] Aula 111 > Criando cliente GOOGLE.
* Create OAuth client ID
* link dashboard google
```
https://console.cloud.google.com/home/dashboard
```

http://localhost:3000/api/auth
http://localhost:3000/api/auth
http://localhost:3000/api/auth/callback/google
http://localhost:3000/api/auth/callback/google

https://next-auth.js.org/configuration/initialization#route-handlers-app

[...nextauth]
[...nextauth]

npm install @auth/prisma-adapter@latest next-auth@latest prisma@latest @prisma/client@latest

npx prisma migrate dev --name add-type-to-account


* link google credial
```
https://console.cloud.google.com/auth/clients/create?project=next-dev-controle
```
* Credentials | Clientes
* Authorized redirect URIs
http://localhost:3000/api/auth/callback/google

* para produção
http://meusite.com.br/api/auth/callback/google

* Customer ID
```
1032904481033-kkechiopga2cjvdu37sg93fj1mqi9a4p.apps.googleusercontent.com
```

* Client Secret Key
```
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
```

##### 13. [] Criando Schema prisma

* next auth adapter
* link.:
```
https://next-auth.js.org/v3/adapters/prisma
```

* prisma.schema
```
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// schema padrão do adapter Account, Session, User, VerificationRequest

model Account {
  id                 String   @id @default(cuid())
  userId             String
  type               String
  provider           String
  providerAccountId  String
  accessToken        String?
  refreshToken       String?
  expiresAt          Int?
  tokenType          String?
  scope              String?
  idToken            String?
  user               User     @relation(fields: [userId], references: [id])
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  userId       String
  expires      DateTime
  sessionToken String   @unique
  accessToken  String?  @unique  // ✅ agora é opcional
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  user         User     @relation(fields: [userId], references: [id])
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  accounts      Account[]
  sessions      Session[]
  tickets       Ticket[]
  customers     Customer[]
}

model Customer {
  id        String   @id @default(cuid())
  name      String
  phone     String
  email     String
  address   String // <- Corrigido
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  tickets   Ticket[]
  userId    String?
  user      User?    @relation(fields: [userId], references: [id])

  @@index([email])
  @@index([userId])
}

model Ticket {
  id          String   @id @default(cuid())
  name        String
  description String
  status      String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  customerId  String?
  customer    Customer? @relation(fields: [customerId], references: [id])
  userId      String?
  user        User?     @relation(fields: [userId], references: [id])

  @@index([status])
  @@index([userId])
  @@index([customerId])
}

// Substitua isto:
model VerificationRequest {
  id         String   @id @default(cuid())
  identifier String
  token      String   @unique
  expires    DateTime
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@unique([identifier, token])
}

// Por isto (recomendado no NextAuth v4+):
model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

```

##### link doc
```
```

##### Gerando tabelas do prisma.schema
```
npx prisma migrate
```

```
npx prisma generete
```

```
npx prisma studio
```

