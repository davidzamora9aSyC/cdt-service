import { Module } from '@nestjs/common';
import { CdtOffersController } from './cdt-offers.controller';
import { CdtOffersService } from './cdt-offers.service';

@Module({
  controllers: [CdtOffersController],
  providers: [CdtOffersService],
  exports: [CdtOffersService],
})
export class CdtOffersModule {}
