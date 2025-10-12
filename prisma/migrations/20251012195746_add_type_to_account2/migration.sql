/*
  Warnings:

  - You are about to drop the column `accessTokenExpires` on the `Account` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Account_provider_providerAccountId_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "accessTokenExpires",
ADD COLUMN     "expiresAt" INTEGER,
ADD COLUMN     "sessionState" TEXT;
