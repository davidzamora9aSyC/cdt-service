import { Module } from '@nestjs/common';
import { CdtRenewalsController } from './cdt-renewals.controller';
import { CdtRenewalsService } from './cdt-renewals.service';

@Module({
  controllers: [CdtRenewalsController],
  providers: [CdtRenewalsService],
  exports: [CdtRenewalsService],
})
export class CdtRenewalsModule {}
