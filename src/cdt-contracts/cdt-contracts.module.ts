import { Module } from '@nestjs/common';
import { CdtContractsController } from './cdt-contracts.controller';
import { CdtContractsService } from './cdt-contracts.service';

@Module({
  controllers: [CdtContractsController],
  providers: [CdtContractsService],
  exports: [CdtContractsService],
})
export class CdtContractsModule {}
