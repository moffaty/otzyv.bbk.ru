-- CreateTable
CREATE TABLE "ConsentLog" (
    "id"              SERIAL NOT NULL,
    "createdAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress"       TEXT NOT NULL,
    "consentPersonal" BOOLEAN NOT NULL,
    "consentContest"  BOOLEAN NOT NULL,
    "consentDelivery" BOOLEAN NOT NULL,
    "policyVersion"   TEXT NOT NULL,
    "formUrl"         TEXT NOT NULL,
    "formCode"        TEXT,

    CONSTRAINT "ConsentLog_pkey" PRIMARY KEY ("id")
);
