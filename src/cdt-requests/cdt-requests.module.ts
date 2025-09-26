import { Module } from '@nestjs/common';
import { CdtRequestsController } from './cdt-requests.controller';
import { CdtRequestsService } from './cdt-requests.service';

@Module({
  controllers: [CdtRequestsController],
  providers: [CdtRequestsService],
  exports: [CdtRequestsService],
})
export class CdtRequestsModule {}
