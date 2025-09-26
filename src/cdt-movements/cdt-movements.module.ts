import { Module } from '@nestjs/common';
import { CdtMovementsController } from './cdt-movements.controller';
import { CdtMovementsService } from './cdt-movements.service';

@Module({
  controllers: [CdtMovementsController],
  providers: [CdtMovementsService],
  exports: [CdtMovementsService],
})
export class CdtMovementsModule {}
