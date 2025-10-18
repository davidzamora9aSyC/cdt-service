-- CreateEnum
CREATE TYPE "cdt"."TipoEntidadFinanciera" AS ENUM ('BANCO', 'COOPERATIVA', 'CORPORACION', 'SIMULADA');

-- CreateEnum
CREATE TYPE "cdt"."CdtModalidadPago" AS ENUM ('VENCIMIENTO', 'PERIODICA', 'ANTICIPADA');

-- CreateEnum
CREATE TYPE "cdt"."CdtSolicitudEstado" AS ENUM ('BORRADOR', 'PENDIENTE_DOCS', 'EN_VALIDACION', 'ENVIADA', 'APROBADA', 'RECHAZADA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "cdt"."CdtContratoEstado" AS ENUM ('PENDIENTE_DESEMBOLSO', 'ACTIVO', 'VENCIDO', 'CANCELADO', 'RENOVADO');

-- CreateEnum
CREATE TYPE "cdt"."CdtMovimientoTipo" AS ENUM ('DESEMBOLSO', 'CAPITALIZACION', 'INTERES', 'RETENCION', 'CANCELACION');

-- CreateEnum
CREATE TYPE "cdt"."IntegracionEstado" AS ENUM ('PENDIENTE', 'ENVIADO', 'ERROR');

-- CreateTable
CREATE TABLE "cdt"."entidad_financiera" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo_entidad" "cdt"."TipoEntidadFinanciera" NOT NULL,
    "codigo_super" TEXT,
    "pais" TEXT NOT NULL,
    "canal_integracion" TEXT,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "entidad_financiera_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cdt"."cdt_oferta" (
    "id" TEXT NOT NULL,
    "entidad_id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "plazo_dias" INTEGER NOT NULL,
    "modalidad_pago" "cdt"."CdtModalidadPago" NOT NULL,
    "tasa_nominal" DECIMAL(65,30) NOT NULL,
    "tasa_efectiva" DECIMAL(65,30) NOT NULL,
    "monto_minimo" DECIMAL(65,30) NOT NULL,
    "monto_maximo" DECIMAL(65,30),
    "moneda" TEXT NOT NULL DEFAULT 'COP',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cdt_oferta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cdt"."cdt_solicitud" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "oferta_id" TEXT NOT NULL,
    "monto" DECIMAL(65,30) NOT NULL,
    "plazo_solicitado" INTEGER NOT NULL,
    "estado" "cdt"."CdtSolicitudEstado" NOT NULL,
    "fecha_solicitud" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "snapshot_usuario_id" TEXT,
    "consentimiento_id" TEXT,
    "documento_formulario_id" TEXT,
    "nota_interna" TEXT,
    "fecha_decision" TIMESTAMP(3),
    "razon_rechazo" TEXT,

    CONSTRAINT "cdt_solicitud_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cdt"."cdt_solicitud_documento" (
    "id" TEXT NOT NULL,
    "solicitud_id" TEXT NOT NULL,
    "documento_soporte_id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "validado" BOOLEAN NOT NULL DEFAULT false,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cdt_solicitud_documento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cdt"."cdt_contrato" (
    "id" TEXT NOT NULL,
    "solicitud_id" TEXT NOT NULL,
    "numero_certificado" TEXT NOT NULL,
    "fecha_apertura" TIMESTAMP(3) NOT NULL,
    "fecha_vencimiento" TIMESTAMP(3) NOT NULL,
    "tasa_negociada" DECIMAL(65,30) NOT NULL,
    "capital" DECIMAL(65,30) NOT NULL,
    "soporte_deposito_id" TEXT,
    "estado" "cdt"."CdtContratoEstado" NOT NULL,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cdt_contrato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cdt"."cdt_movimiento" (
    "id" TEXT NOT NULL,
    "contrato_id" TEXT NOT NULL,
    "tipo" "cdt"."CdtMovimientoTipo" NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "fecha_valor" TIMESTAMP(3) NOT NULL,
    "referencia" TEXT,
    "documento_soporte_id" TEXT,
    "saldo_posterior" DECIMAL(65,30) NOT NULL,
    "descripcion" TEXT,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cdt_movimiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cdt"."cdt_renovacion" (
    "id" TEXT NOT NULL,
    "contrato_id" TEXT NOT NULL,
    "fecha_propuesta" TIMESTAMP(3) NOT NULL,
    "nuevo_plazo" INTEGER NOT NULL,
    "nueva_tasa" DECIMAL(65,30) NOT NULL,
    "estado" TEXT NOT NULL,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cdt_renovacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cdt"."integracion_evento" (
    "id" TEXT NOT NULL,
    "objeto_id" TEXT NOT NULL,
    "objeto_tipo" TEXT NOT NULL,
    "tipo_evento" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "estado_envio" "cdt"."IntegracionEstado" NOT NULL,
    "enviado_en" TIMESTAMP(3),
    "reintentos" INTEGER NOT NULL DEFAULT 0,
    "ultimo_error" TEXT,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "integracion_evento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "entidad_financiera_nombre_pais_key" ON "cdt"."entidad_financiera"("nombre", "pais");

-- CreateIndex
CREATE UNIQUE INDEX "cdt_oferta_entidad_id_codigo_key" ON "cdt"."cdt_oferta"("entidad_id", "codigo");

-- CreateIndex
CREATE INDEX "cdt_solicitud_usuario_id_idx" ON "cdt"."cdt_solicitud"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "cdt_solicitud_documento_unique" ON "cdt"."cdt_solicitud_documento"("solicitud_id", "documento_soporte_id");

-- CreateIndex
CREATE UNIQUE INDEX "cdt_contrato_solicitud_id_key" ON "cdt"."cdt_contrato"("solicitud_id");

-- CreateIndex
CREATE INDEX "cdt_movimiento_contrato_id_idx" ON "cdt"."cdt_movimiento"("contrato_id");

-- CreateIndex
CREATE INDEX "cdt_renovacion_contrato_id_idx" ON "cdt"."cdt_renovacion"("contrato_id");

-- CreateIndex
CREATE INDEX "integracion_evento_estado_envio_idx" ON "cdt"."integracion_evento"("estado_envio");

-- AddForeignKey
ALTER TABLE "cdt"."cdt_oferta" ADD CONSTRAINT "cdt_oferta_entidad_id_fkey" FOREIGN KEY ("entidad_id") REFERENCES "cdt"."entidad_financiera"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cdt"."cdt_solicitud" ADD CONSTRAINT "cdt_solicitud_oferta_id_fkey" FOREIGN KEY ("oferta_id") REFERENCES "cdt"."cdt_oferta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cdt"."cdt_solicitud_documento" ADD CONSTRAINT "cdt_solicitud_documento_solicitud_id_fkey" FOREIGN KEY ("solicitud_id") REFERENCES "cdt"."cdt_solicitud"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cdt"."cdt_contrato" ADD CONSTRAINT "cdt_contrato_solicitud_id_fkey" FOREIGN KEY ("solicitud_id") REFERENCES "cdt"."cdt_solicitud"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cdt"."cdt_movimiento" ADD CONSTRAINT "cdt_movimiento_contrato_id_fkey" FOREIGN KEY ("contrato_id") REFERENCES "cdt"."cdt_contrato"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cdt"."cdt_renovacion" ADD CONSTRAINT "cdt_renovacion_contrato_id_fkey" FOREIGN KEY ("contrato_id") REFERENCES "cdt"."cdt_contrato"("id") ON DELETE CASCADE ON UPDATE CASCADE;
