-- CreateEnum
CREATE TYPE "public"."RequestStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."ContractType" AS ENUM ('PURCHASE_AGREEMENT', 'SERVICE_CONTRACT', 'MASTER_SERVICE_AGREEMENT', 'NON_DISCLOSURE_AGREEMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."ProcurementTaskType" AS ENUM ('BUYING_GOODS', 'CREATING_CONTRACT', 'SOURCING_EVENT', 'GENERAL_INQUIRY');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Department" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProcurementRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "taskType" "public"."ProcurementTaskType" NOT NULL,
    "username " TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "businessJustification" TEXT NOT NULL,
    "requiredByDate" TIMESTAMP(3) NOT NULL,
    "estimatedBudget" DECIMAL(14,2) NOT NULL,
    "currency" TEXT,
    "status" "public"."RequestStatus" NOT NULL DEFAULT 'DRAFT',
    "submittedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProcurementRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ContractDetails" (
    "id" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "contractType" "public"."ContractType" NOT NULL DEFAULT 'PURCHASE_AGREEMENT',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "keyTerms" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContractDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BuyingGoodsDetails" (
    "id" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "itemDescription" TEXT,
    "quantity" TEXT,
    "preferredSuppliers" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BuyingGoodsDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SourcingEventDetails" (
    "id" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "projectPurpose" TEXT,
    "background" TEXT,
    "stakeholders" TEXT,
    "scopeOfWork" TEXT,
    "keyRequirements" TEXT,
    "desiredRequirements" TEXT,
    "technicalSpecifications" TEXT,
    "projectStartDate" TIMESTAMP(3),
    "projectEndDate" TIMESTAMP(3),
    "implementationPlan" TEXT,
    "successMetrics" TEXT,
    "evaluationCriteria" TEXT,
    "fundingSource" TEXT,
    "costStructure" TEXT,
    "paymentTerms" TEXT,
    "existingVendors" TEXT,
    "currentSolutions" TEXT,
    "knownSuppliers" TEXT,
    "supplierDiversity" TEXT,
    "marketResearch" TEXT,
    "contractualHistory" TEXT,
    "legalRequirements" TEXT,
    "dataSecurityRequirements" TEXT,
    "supplierCertifications" TEXT,
    "anticipatedRisks" TEXT,
    "uniqueCircumstances" TEXT,
    "attachments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SourcingEventDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GeneralInquiryDetails" (
    "id" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GeneralInquiryDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_slug_key" ON "public"."User"("slug");

-- CreateIndex
CREATE INDEX "Department_userId_name_idx" ON "public"."Department"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Department_userId_code_key" ON "public"."Department"("userId", "code");

-- CreateIndex
CREATE INDEX "ProcurementRequest_userId_taskType_status_idx" ON "public"."ProcurementRequest"("userId", "taskType", "status");

-- CreateIndex
CREATE INDEX "ProcurementRequest_userId_departmentId_idx" ON "public"."ProcurementRequest"("userId", "departmentId");

-- CreateIndex
CREATE INDEX "ProcurementRequest_userId_requiredByDate_idx" ON "public"."ProcurementRequest"("userId", "requiredByDate");

-- CreateIndex
CREATE UNIQUE INDEX "ContractDetails_requestId_key" ON "public"."ContractDetails"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "BuyingGoodsDetails_requestId_key" ON "public"."BuyingGoodsDetails"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "SourcingEventDetails_requestId_key" ON "public"."SourcingEventDetails"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "GeneralInquiryDetails_requestId_key" ON "public"."GeneralInquiryDetails"("requestId");

-- AddForeignKey
ALTER TABLE "public"."Department" ADD CONSTRAINT "Department_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProcurementRequest" ADD CONSTRAINT "ProcurementRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProcurementRequest" ADD CONSTRAINT "ProcurementRequest_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "public"."Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ContractDetails" ADD CONSTRAINT "ContractDetails_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "public"."ProcurementRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BuyingGoodsDetails" ADD CONSTRAINT "BuyingGoodsDetails_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "public"."ProcurementRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SourcingEventDetails" ADD CONSTRAINT "SourcingEventDetails_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "public"."ProcurementRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GeneralInquiryDetails" ADD CONSTRAINT "GeneralInquiryDetails_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "public"."ProcurementRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
