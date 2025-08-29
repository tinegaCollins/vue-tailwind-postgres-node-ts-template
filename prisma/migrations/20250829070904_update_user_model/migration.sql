/*
  Warnings:

  - You are about to drop the column `slug` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `BuyingGoodsDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContractDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GeneralInquiryDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProcurementRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SourcingEventDetails` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."BuyingGoodsDetails" DROP CONSTRAINT "BuyingGoodsDetails_requestId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ContractDetails" DROP CONSTRAINT "ContractDetails_requestId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Department" DROP CONSTRAINT "Department_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."GeneralInquiryDetails" DROP CONSTRAINT "GeneralInquiryDetails_requestId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProcurementRequest" DROP CONSTRAINT "ProcurementRequest_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProcurementRequest" DROP CONSTRAINT "ProcurementRequest_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SourcingEventDetails" DROP CONSTRAINT "SourcingEventDetails_requestId_fkey";

-- DropIndex
DROP INDEX "public"."User_slug_key";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "slug",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "public"."BuyingGoodsDetails";

-- DropTable
DROP TABLE "public"."ContractDetails";

-- DropTable
DROP TABLE "public"."Department";

-- DropTable
DROP TABLE "public"."GeneralInquiryDetails";

-- DropTable
DROP TABLE "public"."ProcurementRequest";

-- DropTable
DROP TABLE "public"."SourcingEventDetails";

-- DropEnum
DROP TYPE "public"."ContractType";

-- DropEnum
DROP TYPE "public"."ProcurementTaskType";

-- DropEnum
DROP TYPE "public"."RequestStatus";

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");
