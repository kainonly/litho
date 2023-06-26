-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "create_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_time" TIMESTAMP(3) NOT NULL,
    "metadata" JSONB NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "roles" TEXT[],
    "name" VARCHAR,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
